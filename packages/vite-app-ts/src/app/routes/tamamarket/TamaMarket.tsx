import { useState, FC, useEffect } from 'react';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { sampleMarketFields } from './sampleData';
import marketLogo from './tama-logo.png';
import './TamaMarket.less';
import { NavBar } from './components/navBar';
import { ResultBoxObject, ResultsBox } from './components/resultsBox';
import { fetchNFTsOwnedByAccount, OwnedByUserNFT } from './utils';
import { checkFormat } from './utils';

export interface ITamaMarketProps {
  mainnetProvider: StaticJsonRpcProvider;
  yourCurrentBalance: any;
  price: number;
  account: string | undefined;
}

class ResultNFT implements ResultBoxObject {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public url?: string,
    public price?: number
  ) { }
}


export const TamaMarket: FC<ITamaMarketProps> = (props) => {
  const [marketFields, setMarketFields] = useState(sampleMarketFields);
  const [searchResults, setSearchResults] = useState<ResultBoxObject[]>(new Array());
  const [searchFilter, setSearchFilter] = useState(marketFields[0].name);
  const [searchInput, setSearchInput] = useState('');
  const [buttonSearch, setButtonSearch] = useState('Go!')
  const [reloadSearchBar, setReloadSearchBar] = useState(false);

  useEffect(() => {
    let newFields = marketFields.map((item) => {
      return {
        ...item,
        isActive: item.name != searchFilter ? false : true,
      };
    });
    setMarketFields(newFields);
  }, [searchFilter]);

  const onHandleSearch = async (input: String) => {
    if (props.account == undefined) return;
    setButtonSearch('Wait');
    setSearchInput('');
    setReloadSearchBar(true);
    let dataFromNFTPort = await fetchNFTsOwnedByAccount(props.account);
    // dataFromNFTPort = dataFromNFTPort.filter((item: OwnedByUserNFT) => checkFormat(item));
    const resultBoxObject = dataFromNFTPort.map((item: OwnedByUserNFT) =>
      new ResultNFT(
        Number.parseInt(item.token_id),
        item.name || '',
        item.description || '',
        item.file_url || ''
      )
    )
    setSearchResults(resultBoxObject);
    setButtonSearch('Go!');
    setReloadSearchBar(false);
    console.log('fetched data', dataFromNFTPort);
  }

  const Input = () => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'Enter') {
        onHandleSearch(searchInput)
        // console.log('searching for this value',searchInput)
      }
    }

    // return <div className="marketInput">
    return <textarea className="marketInput searchBar" onKeyDown={handleKeyDown} placeholder='SEARCH IN NFT PORT' value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
    // </div>
  }

  return (<div className="marketMainWrapper">
    <div className="marketBackground"></div>
    <div className="marketContainer">
      <div className="container--logo">
        <img className="invert" src={marketLogo} />
      </div>
      <div className="searchLabel market-wrapper">
        {/* <div className='searchLabel'> */}
        {Input()}
        <label className="marketInput submit" onClick={async () => { onHandleSearch(searchInput) }}>{buttonSearch}</label>
        {/* </div */}
      </div>
      <NavBar marketFields={marketFields} setSearchFilter={setSearchFilter}></NavBar>
      <ResultsBox resultList={searchResults}></ResultsBox>
    </div>
  </div>
  );
};
