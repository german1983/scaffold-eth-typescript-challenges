import React, { FC } from 'react';
import { GenericContract } from 'eth-components/ant/generic-contract';
import { Contract } from 'ethers';
import { useContractLoader } from 'eth-hooks';
import { IScaffoldAppProviders } from '~~/app/routes/main/hooks/useScaffoldAppProviders';
import { useEthersContext } from 'eth-hooks/context';
import { NETWORKS } from '~~/models/constants/networks';
import { TContractLoaderConfig } from 'eth-hooks/models';
export interface IMainPageContractsProps {
  scaffoldAppProviders: IScaffoldAppProviders;
  mainnetContracts: Record<string, Contract>;
  appContractConfig: TContractLoaderConfig;
}

/**
 * 🎛 this scaffolding is full of commonly used components
    this <GenericContract/> component will automatically parse your ABI
    and give you a form to interact with it locally
 * @param props
 * @returns
 */
export const MainPageContracts: FC<IMainPageContractsProps> = (props) => {
  const ethersContext = useEthersContext();
  const contractList = useContractLoader(props.appContractConfig, undefined);

  if (ethersContext.account == null) {
    return <></>;
  }

  return (
    <>
      <>
        {/* **********
          ❓ this scaffolding is full of commonly used components
          this <Contract/> component will automatically parse your ABI
          and give you a form to interact with it locally
        ********** */}
        <GenericContract
          contractName="TamaToken"
          contract={contractList?.['TamaToken']}
          mainnetProvider={props.scaffoldAppProviders.mainnetProvider}
          blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
          contractConfig={props.appContractConfig}
        />

        <GenericContract
          contractName="TamaDEX"
          contract={contractList?.['TamaDEX']}
          mainnetProvider={props.scaffoldAppProviders.mainnetProvider}
          blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
          contractConfig={props.appContractConfig}
        />
        <GenericContract
          contractName="TamaFriend"
          contract={contractList?.['TamaFriend']}
          mainnetProvider={props.scaffoldAppProviders.mainnetProvider}
          blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
          contractConfig={props.appContractConfig}
        />

        <GenericContract
          contractName="TamaController"
          contract={contractList?.['TamaController']}
          mainnetProvider={props.scaffoldAppProviders.mainnetProvider}
          blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
          contractConfig={props.appContractConfig}
        />

        <GenericContract
          contractName="TamaCollectibles"
          contract={contractList?.['TamaCollectibles']}
          mainnetProvider={props.scaffoldAppProviders.mainnetProvider}
          blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
          contractConfig={props.appContractConfig}
        />
        <GenericContract
          contractName="TamaCollectiblesVendor"
          contract={contractList?.['TamaCollectiblesVendor']}
          mainnetProvider={props.scaffoldAppProviders.mainnetProvider}
          blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
          contractConfig={props.appContractConfig}
        />
      </>
    </>
  );
};
