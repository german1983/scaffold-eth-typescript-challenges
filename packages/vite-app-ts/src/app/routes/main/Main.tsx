import React, { FC, ReactElement, useCallback, useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import '~~/styles/main-page.css';
import { useGasPrice, useContractLoader, useContractReader, useBalance } from 'eth-hooks';
import { useDexEthPrice } from 'eth-hooks/dapps';

import { GenericContract } from 'eth-components/ant/generic-contract';
import { TamaConsole, YourCollectibles, TamaMarket, TamaPlayground, TamaVendor, TamaMichael } from '~~/app/routes';
import { transactor } from 'eth-components/functions';

import { ethers } from 'ethers';

import { useEventListener } from 'eth-hooks';
import { MainPageMenu, MainPageContracts, MainPageFooter, MainPageHeader } from './components';
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/app/routes/main/hooks/useScaffoldAppProviders';
import { useBurnerFallback } from '~~/app/routes/main/hooks/useBurnerFallback';
import { useScaffoldHooks as useScaffoldHooksExamples } from './hooks/useScaffoldHooksExamples';
import { getNetworkInfo } from '~~/helpers/getNetworkInfo';
import { subgraphUri } from '~~/config/subgraphConfig';
import { useEthersContext } from 'eth-hooks/context';
import { NETWORKS } from '~~/models/constants/networks';
import { mainnetProvider } from '~~/config/providersConfig';
// import { YourCollectible } from '~~/generated/contract-types';
import { useAppContracts } from '~~/app/routes/main/hooks/useAppContracts';
import { EthComponentsSettingsContext } from 'eth-components/models';
import { TamaCollectibles, TamaCollectiblesVendor, TamaDEX, TamaToken } from '~~/generated/contract-types';

export const DEBUG = false;

export const Main: FC = () => {
  // -----------------------------
  // Providers, signers & wallets
  // -----------------------------

  // 🛰 providers
  // see useLoadProviders.ts for everything to do with loading the right providers
  const scaffoldAppProviders = useScaffoldAppProviders();

  // 🦊 Get your web3 ethers context from current providers
  const ethersContext = useEthersContext();

  // if no user is found use a burner wallet on localhost as fallback if enabled
  useBurnerFallback(scaffoldAppProviders, true); //false

  // -----------------------------
  // Contracts use examples
  // -----------------------------
  // ⚙ contract config
  // get the contracts configuration for the app
  const appContractConfig = useAppContracts();

  // Load in your 📝 readonly contract and read a value from it:
  const readContracts = useContractLoader(appContractConfig);

  // If you want to make 🔐 write transactions to your contracts, pass the signer:
  const writeContracts = useContractLoader(appContractConfig, ethersContext?.signer);

  // 👾 external contract example
  // If you want to bring in the mainnet DAI contract it would look like:
  // you need to pass the appropriate provider (readonly) or signer (write)
  const mainnetContracts = useContractLoader(appContractConfig, mainnetProvider, NETWORKS['mainnet'].chainId);

  // -----------------------------
  // example for current contract and listners
  // -----------------------------
  // const yourCollectibleRead = readContracts['YourCollectible'] as YourCollectible;

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // 💵 This hook will get the price of ETH from 🦄 Uniswap:
  const ethPrice = useDexEthPrice(scaffoldAppProviders.mainnetProvider, scaffoldAppProviders.targetNetwork);

  // 💰 this hook will get your balance
  const yourCurrentBalance = useBalance(ethersContext.account ?? '');

  // -----------------------------
  // Hooks use and examples
  // -----------------------------
  // 🎉 Console logs & More hook examples:  Check out this to see how to get
  useScaffoldHooksExamples(scaffoldAppProviders, readContracts, writeContracts, mainnetContracts);

  // -----------------------------
  // .... 🎇 End of examples
  // -----------------------------

  const ethComponentsSettings = useContext(EthComponentsSettingsContext);
  const gasPrice = useGasPrice(ethersContext.chainId, 'fast');
  const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

  const [route, setRoute] = useState<string>('');
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  return (
    <div className="App">
      <MainPageHeader scaffoldAppProviders={scaffoldAppProviders} price={ethPrice} />

      {/* Routes should be added between the <Switch> </Switch> as seen below */}
      <BrowserRouter>
        <MainPageMenu route={route} setRoute={setRoute} />
        <Switch>
          <Route exact path="/">
            <YourCollectibles
              mainnetProvider={scaffoldAppProviders.mainnetProvider}
              blockExplorer={scaffoldAppProviders.targetNetwork.blockExplorer}
              tx={tx}
            />
          </Route>
          <Route path="/tamadex">
            <TamaVendor
              mainnetProvider={scaffoldAppProviders.mainnetProvider}
              address={ethersContext.account}
              yourCurrentBalance={yourCurrentBalance}
              price={ethPrice}
              tx={tx}
              tamaDexRead={readContracts['TamaDEX'] as TamaDEX}
              tamaDexWrite={writeContracts['TamaDEX'] as TamaDEX}
              tamaTokenRead={readContracts['TamaToken'] as TamaToken}
              tamaTokenWrite={writeContracts['TamaToken'] as TamaToken}
            />
          </Route>
          <Route exact path="/debugcontract">
            <MainPageContracts
              scaffoldAppProviders={scaffoldAppProviders}
              mainnetContracts={mainnetContracts}
              appContractConfig={appContractConfig}
            />
          </Route>
          {/* you can add routes here like the below examlples */}
          <Route path="/tamaconsole">
            <TamaConsole
              mainnetProvider={scaffoldAppProviders.mainnetProvider}
              yourCurrentBalance={yourCurrentBalance}
              price={ethPrice}
            />
          </Route>
          <Route path="/tamamarket">
            <TamaMarket
              mainnetProvider={scaffoldAppProviders.mainnetProvider}
              yourCurrentBalance={yourCurrentBalance}
              price={ethPrice}
              account={ethersContext.account}
            />
          </Route>
          <Route path="/tamaplayground">
            <TamaPlayground
              mainnetProvider={scaffoldAppProviders.mainnetProvider}
              yourCurrentBalance={yourCurrentBalance}
              price={ethPrice}
            />
          </Route>
          <Route path="/tamamichael">
            <TamaMichael
              mainnetProvider={scaffoldAppProviders.mainnetProvider}
              blockExplorer={scaffoldAppProviders.targetNetwork.blockExplorer}
              tx={tx}
              yourCollectibleRead={readContracts['TamaCollectibles'] as TamaCollectibles}
              yourCollectibleWrite={writeContracts['TamaCollectibles'] as TamaCollectibles}
              tamaTokenRead={readContracts['TamaToken'] as TamaToken}
              tamaTokenWrite={writeContracts['TamaToken'] as TamaToken}
              tamaCollectiblesVendorRead={writeContracts['TamaCollectiblesVendor'] as TamaCollectiblesVendor}
              tamaCollectiblesVendorWrite={writeContracts['TamaCollectiblesVendor'] as TamaCollectiblesVendor}
            />
          </Route>
        </Switch>
      </BrowserRouter>

      <MainPageFooter scaffoldAppProviders={scaffoldAppProviders} price={ethPrice} />
    </div>
  );
};

export default Main;
