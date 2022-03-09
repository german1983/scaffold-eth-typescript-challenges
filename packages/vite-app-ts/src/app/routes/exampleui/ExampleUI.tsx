import './styles.less';
import { useState, FC, useContext, useEffect, useRef } from 'react';

import axios from 'axios';
import { StaticJsonRpcProvider } from '@ethersproject/providers';

import { Shape1 } from './components/Shape1';
import { Shape2 } from './components/Shape2';
import { GameMenu, IShapeObject, shapes } from './components/GameMenu';

import { TamaController } from '~~/generated/contract-types';
import { transactor } from 'eth-components/functions';
import { useEthersContext } from 'eth-hooks/context';
import { useContractLoader, useGasPrice } from 'eth-hooks';
import { useAppContracts } from '~~/app/routes/main/hooks/useAppContracts';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { targetNetworkInfo } from '~~/config/providersConfig';

// We should move this into a Service but given this is the only place we are using it for now, I'm simplifying
// const apiServerUrl = "https://tama-test-api.herokuapp.com/api/consoles";
const apiServerUrl = "http://localhost:5000/api/consoles";

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
    image: ""
  },
  {
    name: 'Whatever',
    id: shapes.SHAPE2,
    image: ""
  },
];
export interface IExampleUIProps {
  mainnetProvider: StaticJsonRpcProvider;
  yourCurrentBalance: any;
  price: number;
}

interface CreateConsoleResponse {
  ipfsCid: string;
}

export const ExampleUI: FC<IExampleUIProps> = (props) => {
  const ethersContext = useEthersContext();
  const appContractConfig = useAppContracts();
  const writeContracts = useContractLoader(appContractConfig, ethersContext?.signer, targetNetworkInfo.chainId);

  const [backColor, setBackColor] = useState(basicColorSetup.backColor);
  const [middleColor, setMiddleColor] = useState(basicColorSetup.middleColor);
  const [frontColor, setFrontColor] = useState(basicColorSetup.frontColor);
  const [buttonColor, setButtonColor] = useState(basicColorSetup.buttonColor);
  const [lineColor, setLineColor] = useState(basicColorSetup.lineColor);
  const [shapeList, setShapeList] = useState(initialShapesArray);
  const TamaControllerWrite = writeContracts['TamaController'] as TamaController;

  /*
  TODO : 
  get shapesList that the user has bought in the market place from chain.
  can add more fields such as price, time created, author, take a look at the declaration
  of initialShapesArray
  */
  /*
  TODO : 
  setter setshapelist() will help as ADD more shapes to our current list and pass it to 
  the children component
  */

  const [currentShape, setCurrentShape] = useState(shapes.SHAPE2);

  const toMint = useRef<any>();
  toMint.current = currentShape;

  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const gasPrice = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

  const [connected, connect] = useState(false);

  useEffect(() => {
    if (ethersContext.account) connect(true);
    else connect(false);
  }, [ethersContext.account]);

  const mintConsole = async () => {
    if (!tx || !ethersContext.account) return;

    const res = await axios.post(apiServerUrl, {
      shape: toMint.current,
      backColor: backColor,
      middleColor: middleColor,
      frontColor: frontColor,
      buttonColor: buttonColor,
      lineColor: lineColor,
    });
    console.log("RESULT", res.data);
    const ipfsCid = (res.data as CreateConsoleResponse).ipfsCid;

    // upload to ipfs
    console.log('Uploaded Hash: ', ipfsCid);
    await tx(TamaControllerWrite.mintItem(ipfsCid), (update) => {
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
        <div className='menuTitle'>
          MENU
        </div>
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
          shapeList={shapeList}
          setCurrentShape={setCurrentShape}
          currentShape={currentShape}></GameMenu>
        <div className='mintButton'
          onClick={async () => { await mintConsole() }}>
          MINT
        </div>
      </div>
    </div>
  ) : (
    <div className="mainWrapper">
      <div className="notLogged">Please connect your wallet first</div>
    </div>
  );
};
