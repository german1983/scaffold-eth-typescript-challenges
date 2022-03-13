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
  image?: string;
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
  setCurrentConsole: any;
  currentConsole: any;
  wallet: Array<any>;
  walletChooseType: string;
  useItemFromWallet: Function
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
    setCurrentConsole,
    currentConsole,
    wallet,
    walletChooseType,
    useItemFromWallet
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

  const changeConsole = (index: any) => {
    setCurrentConsole(index);
  };

  const onClickItem = (item: any) => {

    console.log('clicked', item)
    console.log(walletChooseType)
    if (item.type == walletChooseType) {

      console.log('performing consume', item);
      useItemFromWallet(item);
    }
  }
  return (
    <div className="main">
      <div className="submenu">Available Shapes</div>
      <div>
        <div>
          <ul className="ul1">
            {shapeList.map((item, index) => {
              return <img className="container-console" src={item.image} onClick={() => changeConsole(index)} />;
            })}
          </ul>
        </div>
      </div>
      <div className="submenu">Wallet</div>
      <ul className="ul2">
        {wallet.map((item, i) => {
          return (<li className='walletLi' key={'index_' + i} onClick={() => { onClickItem(item) }}>
            <label>{item.name}</label>
            <label className='walletItemInfo'>{item.value}</label>
          </li>)
        })}
      </ul>
      <div className="submenu" style={{ paddingTop: '1rem', fontSize: '15px' }}>Learn more about Tama</div>
    </div>
  );
};
