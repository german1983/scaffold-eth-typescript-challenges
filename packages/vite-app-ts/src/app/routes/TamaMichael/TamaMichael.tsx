import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { FC, useEffect, useState } from 'react';
import { TamaCollectibles, TamaFriend } from '~~/generated/contract-types';
import { targetNetworkInfo } from '~~/config/providersConfig';
import { useAppContracts } from '~~/app/routes/main/hooks/useAppContracts';
import { useContractLoader, useContractReader } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber, ethers } from 'ethers';
import { create } from 'ipfs-http-client';
import { Button, Card, List } from 'antd';
import { Address, AddressInput } from 'eth-components/ant';
import { TTransactor } from 'eth-components/functions';
import { mintJson } from './mint';

export interface IYourCollectibleProps {
  mainnetProvider: StaticJsonRpcProvider;
  blockExplorer: string;
  tx?: TTransactor;
}

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

export const TamaMichael: FC<IYourCollectibleProps> = (props: IYourCollectibleProps) => {
  const ethersContext = useEthersContext();
  const appContractConfig = useAppContracts();
  const readContracts = useContractLoader(appContractConfig);
  const writeContracts = useContractLoader(appContractConfig, ethersContext?.signer, targetNetworkInfo.chainId);
  const { mainnetProvider, blockExplorer, tx } = props;

  const YourCollectibleRead = readContracts['TamaCollectibles'] as TamaCollectibles;
  const YourCollectibleWrite = writeContracts['TamaCollectibles'] as TamaCollectibles;

  const balance = useContractReader<BigNumber[]>(YourCollectibleRead, {
    contractName: 'TamaCollectibles',
    functionName: 'balanceOf',
    functionArgs: [ethersContext.account, 0],
  });
  console.log('balance', balance);
  //
  // 🧠 This effect will update yourCollectibles by polling when your balance changes
  //
  const [yourCollectibles, setYourCollectibles] = useState<any>([]);

  useEffect(() => {
    const updateYourCollectibles = async () => {
      if (ethersContext.account == undefined) return;

      const collectibleUpdate: any = [];
      [0, 1].forEach(async tokenId => {
        try {
          console.log('Getting token index', tokenId);
          const tokenURI = await YourCollectibleRead.uri(tokenId);
          console.log('tokenURI', tokenURI);
          const tokenBalance = await YourCollectibleRead.balanceOf(ethersContext.account || '', tokenId);

          const content = await getFromIPFS(tokenURI + '/0');

          try {
            const ipfsObject = JSON.parse(content);
            console.log('ipfsObject', ipfsObject);
            collectibleUpdate.push({
              id: tokenId,
              uri: tokenURI,
              owner: ethersContext.account,
              tokenBalance: BigNumber.from(tokenBalance),
              ...ipfsObject
            });
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      });

      setYourCollectibles(collectibleUpdate);
    };
    updateYourCollectibles();
  }, [ethersContext.account, balance]);

  return (
    <>
      <div style={{ width: 640, margin: 'auto', marginTop: 32, paddingBottom: 32 }}>
        <List
          bordered
          dataSource={yourCollectibles}
          renderItem={(item: any) => {
            const id = 0;
            return (
              <List.Item key={id + '_' + item.uri + '_' + item.owner}>
                <Card
                  title={
                    <div>
                      <span style={{ fontSize: 16, marginRight: 8 }}>#{id}</span> {item.name}
                    </div>
                  }>
                  <div>
                    <img src={item.image} style={{ maxWidth: 150 }} />
                  </div>
                  <div>{item.description}</div>
                </Card>

                <div>
                  <div>Owned: {balance}</div>
                  <Button>BUY MORE (not working)</Button>
                </div>
              </List.Item>
            );
          }}
        />
      </div>
    </>
  );
};
