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
import './navBar.less';

export interface INavBar {
  marketFields: any;
  setSearchFilter: any;
}

export const NavBar: FC<INavBar> = (props) => {
  const { marketFields, setSearchFilter } = props;

  const onClickNav = (id: any) => {
    setSearchFilter(marketFields[id].name);
    marketFields[id].isActive = false;
  };
  return (
    <div className="container--navigation">
      {marketFields.map((item, i) => {
        return item.isActive ? (
          <div
            className="item--link active"
            onClick={() => {
              onClickNav(i);
            }}>
            {item.name}
            {item.isHot && <div className="item--notification">HOT</div>}
          </div>
        ) : (
          <div
            className="item--link"
            onClick={() => {
              onClickNav(i);
            }}>
            {item.name}
            {item.isHot && <div className="item--notification">HOT</div>}
          </div>
        );
      })}
    </div>
  );
};
