import { SyncOutlined } from '@ant-design/icons';
import { formatEther, parseEther } from '@ethersproject/units';
import { Button, Card, DatePicker, Divider, Input, List, Progress, Slider, Spin, Switch } from 'antd';
import { Signer, Contract } from 'ethers';
import React, { useState, FC, useContext, useEffect } from 'react';

import { Address, Balance } from 'eth-components/ant';
import { transactor, TTransactor } from 'eth-components/functions';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { useEthersContext } from 'eth-hooks/context';
import { useContractLoader, useContractReader, useEventListener, useGasPrice } from 'eth-hooks';
// import { YourCollectible } from '~~/generated/contract-types';
import { useAppContracts } from '~~/app/routes/main/hooks/useAppContracts';
import { EthComponentsSettingsContext } from 'eth-components/models';
import './Menu.less';

export enum shapes {
  SHAPE1,
  SHAPE2,
}
export interface IShapeObject {
  id: shapes;
  name: string;
}

interface IMenu {
  backColor: any;
  setBackColor: any;
  middleColor: any;
  setMiddleColor: any;
  frontColor: any;
  setFrontColor: any;
  buttonColor: any;
  setButtonColor: any;
  lineColor: any;
  setLineColor: any;
  shapeList: Array<IShapeObject>;
  setCurrentShape: any;
  currentShape: any;
}
export const GameMenu: FC<IMenu> = (props) => {
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

  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const gasPrice = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);
  //   const { mainnetProvider, yourCurrentBalance, price } = props;
  // const ScaffoldListener = useScaffoldHooks(scaffoldAppProviders, readContracts, writeContracts, mainnetContracts)

  const [connected, connect] = useState(false);

  const {
    backColor,
    setBackColor,
    middleColor,
    setMiddleColor,
    frontColor,
    setFrontColor,
    buttonColor,
    setButtonColor,
    lineColor,
    setLineColor,
    shapeList,
    setCurrentShape,
    currentShape,
  } = props;

  useEffect(() => {
    if (ethersContext.account) connect(true);
    else connect(false);
  }, [ethersContext.account]);

  const onHandleBackChange = (e: any) => {
    //   console.log('changing color', e.target.value);
    setBackColor(e.target.value.substring(1));
  };
  const onHandleMiddleChange = (e: any) => {
    //   console.log('changing color', e.target.value);
    setMiddleColor(e.target.value.substring(1));
  };
  const onHandleFrontChange = (e: any) => {
    //   console.log('changing color', e.target.value);
    setFrontColor(e.target.value.substring(1));
  };
  const onHandleButtonChange = (e: any) => {
    //   console.log('changing color', e.target.value);
    setButtonColor(e.target.value.substring(1));
  };
  const onHandleLineChange = (e: any) => {
    //   console.log('changing color', e.target.value);
    setLineColor(e.target.value.substring(1));
  };

  const changeShape = (id: any) => {
    setCurrentShape(id);
  };

  return (
    <div className="main">
      <div className="submenu">Available Shapes</div>
      <div>
        <div>
          <ul className="ul1">
            {shapeList.map((item) => {
              return <img className="container-console" src={item.image} onClick={() => changeShape(item.id)} />;
            })}
          </ul>
        </div>
      </div>
      <div className="submenu">Choose colors</div>
      <ul className="ul2">
        <li>
          <label>Back Shape</label>
          <input
            type="color"
            value={'#' + backColor}
            onChange={(e) => {
              onHandleBackChange(e);
            }}></input>
        </li>
        <li>
          <label>Middle Shape</label>
          <input
            type="color"
            value={'#' + middleColor}
            onChange={(e) => {
              onHandleMiddleChange(e);
            }}></input>
        </li>

        <li>
          <label>Screen</label>
          <input
            type="color"
            value={'#' + frontColor}
            onChange={(e) => {
              onHandleFrontChange(e);
            }}></input>
        </li>
        <li>
          <label>Buttons</label>
          <input
            type="color"
            value={'#' + buttonColor}
            onChange={(e) => {
              onHandleButtonChange(e);
            }}></input>
        </li>

        <li>
          <label>Borders</label>
          <input
            type="color"
            value={'#' + lineColor}
            onChange={(e) => {
              onHandleLineChange(e);
            }}></input>
        </li>
      </ul>
      <div className="submenu">Learn how to play</div>
    </div>
  );
};
