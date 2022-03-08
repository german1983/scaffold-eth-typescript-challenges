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
// import { Tamagotchi } from './components/Tamagotchi';
import { sampleMarketFields, sampleSearchResults, sampleSearchResults2 } from './sampleData';
import marketLogo from './tama-logo.png';
import './styles.less';
import { NavBar } from './components/navBar';
import { ResultsBox } from './components/resultsBox';
import { fetchFromNFTPort } from './utils';
import { checkFormat } from './utils';

export interface ITamaMarketProps {
  mainnetProvider: StaticJsonRpcProvider;
  yourCurrentBalance: any;
  price: number;
}

export const TamaMarket: FC<ITamaMarketProps> = (props) => {
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

  const { mainnetProvider, yourCurrentBalance, price } = props;
  const [marketFields, setMarketFields] = useState(sampleMarketFields);
  const [searchResults, setSearchResults] = useState(sampleSearchResults);
  const [searchFilter, setSearchFilter] = useState(marketFields[0].name);
  const [searchInput, setSearchInput] = useState('');
  const [buttonSearch, setButtonSearch] = useState('Go!')

  useEffect(() => {
    let newFields = marketFields.map((item) => {
      return {
        ...item,
        isActive: item.name != searchFilter ? false : true,
      };
    });
    setMarketFields(newFields);
  }, [searchFilter]);

  useEffect(() => {
    if (marketFields[0].isActive) setSearchResults(sampleSearchResults);
    else setSearchResults(sampleSearchResults2);
  }, [marketFields]);

  const onHandleSearch = async (input : String) =>{
    setButtonSearch('Wait !')
    let dataFromNFTPort = await fetchFromNFTPort(input);
    dataFromNFTPort = dataFromNFTPort.filter(item=>checkFormat(item));
    dataFromNFTPort = dataFromNFTPort.map((item) => {
      return {
        ...item,
        url : item.cached_file_url,
        title : item .name, 
        description : '' 
      }
    })
    setSearchResults(dataFromNFTPort);
    setSearchInput('');
    setButtonSearch('Go!');
    console.log('fetched data',dataFromNFTPort);
  }

  return (
    <div className="mainWrapper">
      <div className="background"></div>
      <div className="container">
        <div className="container--logo">
          <img className="invert" src={marketLogo} />
        </div>
        <div className="wrapper">
          <div className='searchLabel'>
          <input className="search" placeholder='SEARCH IN NFT PORT' type="text" value={searchInput} onChange={(event) => setSearchInput(event.target.value)}/>
          <input className="submit" type="submit" value={buttonSearch} onClick={async () => {onHandleSearch(searchInput)}}/>
          </div>
        </div>
        <NavBar marketFields={marketFields} setSearchFilter={setSearchFilter}></NavBar>
        <ResultsBox resultList={searchResults}></ResultsBox>
      </div>
    </div>
  );
};
