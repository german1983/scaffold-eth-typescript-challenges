import { SyncOutlined } from '@ant-design/icons';
import { formatEther, parseEther } from '@ethersproject/units';
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from 'antd';
import { Signer, Contract } from 'ethers';
import React, { useState, FC, useContext, useEffect, useRef, ReactElement } from 'react';
import { Shape1 } from './components/Shape1';
import { Shape2 } from './components/Shape2';

import { BigNumber, ethers } from 'ethers';
import { GameMenu, IShapeObject, shapes } from './components/Menu';

import { Address, Balance } from 'eth-components/ant';
import { transactor, TTransactor } from 'eth-components/functions';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { useEthersContext } from 'eth-hooks/context';
import { useContractLoader, useContractReader, useEventListener, useGasPrice } from 'eth-hooks';
import { create } from 'ipfs-http-client';
import { useAppContracts } from '~~/app/routes/main/hooks/useAppContracts';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { Tamagotchi } from './components/Tamagotchi';
import './styles.less';
import { storeExampleNFT } from './utils';
import { TamaController } from '~~/generated/contract-types';
import { targetNetworkInfo } from '~~/config/providersConfig';
import ReactDOMServer from 'react-dom/server';
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

  const [currentShape, setCurrentShape] = useState(shapes.SHAPE2);

  const toMint = useRef<any>();
  toMint.current = currentShape;

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

          const ipfsHash = tokenURI.replace('ipfs://', '');
          console.log('ipfsHash', ipfsHash);

          const content = await getFromIPFS(ipfsHash);

          try {
            const ipfsObject = JSON.parse(content);
            console.log('ipfsObject', ipfsObject);
            collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: ethersContext.account, ...ipfsObject });
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      }
      setConsoleList(collectibleUpdate);
    };
    updateTamaControllers();
  }, [ethersContext.account, balance]);

  const saveState = async () => {
    if (!tx || !ethersContext.account) return;

    // upload to ipfs
    var myComponent = ReactDOMServer.renderToString(renderShape(toMint.current));
    const uploaded = await storeExampleNFT(myComponent); // TODO replace with real options selected by the user
    console.log('Uploaded Hash: ', uploaded);
    await tx(TamaControllerWrite.mintItem(uploaded), (update) => {
      console.log('📡 Transaction Update:', update);
      if (update && (update.status === 'confirmed' || update.status === 1)) {
        console.log(' 🍾 Transaction ' + update.hash + ' finished!');
        console.log(
          ' ⛽️ ' +
            update.gasUsed +
            '/' +
            (update.gasLimit || update.gas) +
            ' @ ' +
            parseFloat(update.gasPrice) / 1000000000 +
            ' gwei'
        );
      }
    });
  };
  const renderShape = (value: any) => {
    if (value == shapes.SHAPE1) {
      return (
        <Shape1
          backColor={backColor}
          middleColor={middleColor}
          frontColor={frontColor}
          buttonColor={buttonColor}
          lineColor={lineColor}></Shape1>
      );
    }
    if (value == shapes.SHAPE2) {
      return (
        <Shape2
          backColor={backColor}
          middleColor={middleColor}
          frontColor={frontColor}
          buttonColor={buttonColor}
          lineColor={lineColor}></Shape2>
      );
    }
    return (
      <Shape2
        backColor={backColor}
        middleColor={middleColor}
        frontColor={frontColor}
        buttonColor={buttonColor}
        lineColor={lineColor}></Shape2>
    );
  };

  return connected ? (
    <div className="mainWrapper">
      <div className="tamaWrapper">{renderShape(currentShape)}</div>
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
          setCurrentShape={setCurrentShape}
          currentShape={currentShape}></GameMenu>
        <div
          className="mintButton"
          onClick={async () => {
            await saveState();
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
