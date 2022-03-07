import { SyncOutlined } from '@ant-design/icons';
import { formatEther, parseEther } from '@ethersproject/units';
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from 'antd';
import { Signer, Contract } from 'ethers';
import React, { useState, FC, useContext, useEffect } from 'react';
import { Shape1 } from './components/Shape1';
import { Shape2 } from './components/Shape2';
import { GameMenu } from './components/GameMenu';

import { Address, Balance } from 'eth-components/ant';
import { transactor, TTransactor } from 'eth-components/functions';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { useEthersContext } from 'eth-hooks/context';
import { useContractLoader, useContractReader, useEventListener, useGasPrice } from 'eth-hooks';
import { YourCollectible } from '~~/generated/contract-types';
import { useAppContracts } from '~~/app/routes/main/hooks/useAppContracts';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { Tamagotchi } from './components/Tamagotchi';
import './styles.less';

const basicColorSetup = {
  backColor: '3ca9de',
  middleColor: '90c6d6',
  frontColor: 'e1efef',
  buttonColor: '2273b5',
  lineColor: '2273b5',
};

enum shapes {
  SHAPE1,
  SHAPE2,
}

var initialShapesArray: Array<Object> = [
  {
    name: 'Oval',
    id: shapes.SHAPE1,
  },
  {
    name: 'Whatever',
    id: shapes.SHAPE2,
  },
];
export interface IExampleUIProps {
  mainnetProvider: StaticJsonRpcProvider;
  yourCurrentBalance: any;
  price: number;
}

export const ExampleUI: FC<IExampleUIProps> = (props) => {
  const [newPurpose, setNewPurpose] = useState('loading...');
  const ethersContext = useEthersContext();

  const appContractConfig = useAppContracts();
  const readContracts = useContractLoader(appContractConfig);
  const writeContracts = useContractLoader(appContractConfig, ethersContext?.signer);

  const yourContractRead = readContracts['YourContract'] as any;
  const yourContractWrite = writeContracts['YourContract'] as any;
  const purpose = useContractReader<string>(yourContractRead, {
    contractName: 'YourContract',
    functionName: 'purpose',
  });
  const setPurposeEvents = useEventListener(yourContractRead, 'SetPurpose', 1);

  const signer = ethersContext.signer;
  const address = ethersContext.account ?? '';

  const [backColor, setBackColor] = useState(basicColorSetup.backColor);
  const [middleColor, setMiddleColor] = useState(basicColorSetup.middleColor);
  const [frontColor, setFrontColor] = useState(basicColorSetup.frontColor);
  const [buttonColor, setButtonColor] = useState(basicColorSetup.buttonColor);
  const [lineColor, setLineColor] = useState(basicColorSetup.lineColor);
  const [shapeList, setShapeList] = useState(initialShapesArray);

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

  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const gasPrice = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  const { mainnetProvider, yourCurrentBalance, price } = props;
  // const ScaffoldListener = useScaffoldHooks(scaffoldAppProviders, readContracts, writeContracts, mainnetContracts)

  const [connected, connect] = useState(false);

  useEffect(() => {
    if (ethersContext.account) connect(true);
    else connect(false);
  }, [ethersContext.account]);

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
  };

  return connected ? (
    <div className="mainWrapper">
      <div className="tamaWrapper">{renderShape(currentShape)}</div>
      <div className="menuWrapper">
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
      </div>
    </div>
  ) : (
    <div className="mainWrapper">
      <div className="notLogged">Please connect your wallet first</div>
    </div>
  );
};
