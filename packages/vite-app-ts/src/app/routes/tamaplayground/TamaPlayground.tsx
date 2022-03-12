import { useState, FC, useContext, useEffect, useRef } from 'react';

import { BigNumber, ethers } from 'ethers';
import { GameMenu, IShapeObject, shapes } from './components/Menu';

import { transactor, TTransactor } from 'eth-components/functions';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { useEthersContext } from 'eth-hooks/context';
import { useBalance, useContractLoader, useContractReader, useGasPrice } from 'eth-hooks';
import { create } from 'ipfs-http-client';
import { useAppContracts } from '~~/app/routes/main/hooks/useAppContracts';
import { EthComponentsSettingsContext } from 'eth-components/models';
import './styles.less';
import { TamaController } from '~~/generated/contract-types';
import { targetNetworkInfo } from '~~/config/providersConfig';
import { TamaConsole } from './components/TamaConsole';
import { consoleConfigs } from './utils';
import { sampleWallet } from './utils';

import {TRAVEL, FOOD} from './utils'

const basicColorSetup = {
  backColor: '3ca9de',
  middleColor: '90c6d6',
  frontColor: 'e1efef',
  buttonColor: '2273b5',
  lineColor: '2273b5',
};

var initialShapesArray: Array<IShapeObject> = [
  {
    name: 'Oval',
    id: shapes.SHAPE1,
  },
  {
    name: 'Whatever',
    id: shapes.SHAPE2,
  },
];

export interface ITamaPlaygroundProps {
  mainnetProvider: StaticJsonRpcProvider;
  yourCurrentBalance: any;
  price: number;
}

export const TamaPlayground: FC<ITamaPlaygroundProps> = (props) => {
  const ethersContext = useEthersContext();
  const appContractConfig = useAppContracts();
  const readContracts = useContractLoader(appContractConfig);
  const writeContracts = useContractLoader(appContractConfig, ethersContext?.signer, targetNetworkInfo.chainId);

  const [backColor, setBackColor] = useState(basicColorSetup.backColor);
  const [middleColor, setMiddleColor] = useState(basicColorSetup.middleColor);
  const [frontColor, setFrontColor] = useState(basicColorSetup.frontColor);
  const [buttonColor, setButtonColor] = useState(basicColorSetup.buttonColor);
  const [lineColor, setLineColor] = useState(basicColorSetup.lineColor);
  const [shapeList, setShapeList] = useState(initialShapesArray);
  const [consoleList, setConsoleList] = useState<any>([]);
  const TamaControllerRead = readContracts['TamaController'] as TamaController;
  const TamaControllerWrite = writeContracts['TamaController'] as TamaController;
  const [wallet, updateWallet] = useState(sampleWallet);
  const [currentConsole, setCurrentConsole] = useState<any>(undefined);
  const [listenItemUsed, setItemUsed] = useState(undefined);
  const [consoleBackground, setConsoleBackground] = useState(undefined);


  const [walletChooseType , onWalletChooseType] = useState('none');

  const toMint = useRef<any>();
  toMint.current = currentConsole;

  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const gasPrice = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

  const [connected, connect] = useState(false);

  const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  });

  const getFromIPFS = async (cid: string) => {
    const decoder = new TextDecoder();
    let content = '';
    for await (const chunk of ipfs.cat(cid)) {
      content += decoder.decode(chunk);
    }
    return content;
  };
  const balance = useContractReader<BigNumber[]>(TamaControllerRead, {
    contractName: 'TamaController',
    functionName: 'balanceOf',
    functionArgs: [ethersContext.account],
  });

  useEffect(() => {
    if (ethersContext.account) connect(true);
    else connect(false);
  }, [ethersContext.account]);

  const useItemFromWallet = (item) => {
      //PERFORM TRANSACTION TO USE ITEM IN CONTRACT
      //if transaction sucessful, update state in UI, state will be updated automatically from contract or using UI ( tbd )
      //if all good, a pop up image will appear in the UI of the item being consumed ( if its food ), or the new background will appear, if its travel;

      //udpate wallet, wallet should update by itself from blockchain
      let otherItems = wallet.filter(ind => !(ind.value == item.value &&ind.name == item.name && ind.type == item.type && ind.id == item.id));
      updateWallet(otherItems);
      if(item.type == FOOD){
        setItemUsed(item);
      }
      if(item.type == TRAVEL){
          setConsoleBackground(item.uri);
      }

  }

  useEffect(()=>{
    console.log('setting new console background', consoleBackground);
  },[consoleBackground])

  useEffect(() => {
    const updateTamaControllers = async () => {
      const collectibleUpdate = [];
      if (!balance) return;
      const yourBalance = balance[0]?.toNumber() ?? 0;
      for (let tokenIndex = 0; tokenIndex < yourBalance; tokenIndex++) {
        try {
          console.log('Getting token index', tokenIndex);
          const tokenId = await TamaControllerRead.tokenOfOwnerByIndex(ethersContext.account ?? '', tokenIndex);
          console.log('tokenId', tokenId);
          const tokenURI = await TamaControllerRead.tokenURI(tokenId);
          console.log('tokenURI', tokenURI);
          const tamaCharacter = await TamaControllerRead.faketokenURI(ethersContext.account);
          const ipfsHash = tokenURI.replace('ipfs://', '');
          const characterHash = tamaCharacter.replace('https://ipfs.io/ipfs/', '');
          console.log('ipfsHash', ipfsHash);
          const content = await getFromIPFS(ipfsHash);
          const characterContent = await getFromIPFS(characterHash);

          try {
            const ipfsObject = JSON.parse(content);
            const characterObject = JSON.parse(characterContent)
            console.log('ipfsObject', ipfsObject);
            collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: ethersContext.account, character : characterObject ,...ipfsObject });
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      }
      //temporary map
      let temp = collectibleUpdate.map((item) => {
        return {
          ...item,
          attributes: consoleConfigs[item.name]
        }
      })
        console.log("UPDATING CONSOLE LIST",temp);
      setConsoleList(temp);
    };
    updateTamaControllers();
  }, [ethersContext.account, balance]);

  const renderShape = (value: any) => {
    return <img>{currentConsole}</img>
  };

  return connected ? (
    <div className="mainWrapper">
      {consoleList[currentConsole] && <div className="tamaWrapper">
        <img className="console--img" src={consoleList[currentConsole].image}></img>
        <TamaConsole
          consoleConfig={consoleList[currentConsole].attributes}
          tamaCharacter = {consoleList[currentConsole].character}
          onWalletChooseType = {onWalletChooseType}
          listenItemUsed = {listenItemUsed }
          consoleBackground = {consoleBackground}
        ></TamaConsole></div>}
      <div className="menuWrapper">
        <div className="menuTitle">PLAYGROUND</div>
        <GameMenu
          backColor={backColor}
          setBackColor={setBackColor}
          middleColor={middleColor}
          setMiddleColor={setMiddleColor}
          frontColor={frontColor}
          setFrontColor={setFrontColor}
          buttonColor={buttonColor}
          setButtonColor={setButtonColor}
          lineColor={lineColor}
          setLineColor={setLineColor}
          shapeList={consoleList}
          setCurrentConsole={setCurrentConsole}
          currentConsole={currentConsole}
          wallet={wallet}
          walletChooseType={walletChooseType}
          useItemFromWallet={useItemFromWallet}></GameMenu>
        <div
          className="mintButton"
          onClick={async () => {
            // await saveState();
          }}>
          SAVE
        </div>
      </div>
    </div>
  ) : (
    <div className="mainWrapper">
      <div className="notLogged">Please connect your wallet first</div>
    </div>
  );
};
