import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { TamaCollectibles, TamaCollectiblesVendor, TamaFriend, TamaToken } from '~~/generated/contract-types';
import { targetNetworkInfo } from '~~/config/providersConfig';
import { useAppContracts } from '~~/app/routes/main/hooks/useAppContracts';
import { useContractLoader, useContractReader } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber, ethers } from 'ethers';
import { create } from 'ipfs-http-client';
import { Button, Card, InputNumber, List } from 'antd';
import { Address, AddressInput, Balance } from 'eth-components/ant';
import { TTransactor } from 'eth-components/functions';
import { mintJson } from './mint';
import { RequestEthereumAccountsResponse } from 'walletlink/dist/relay/Web3Response';

export interface IYourCollectibleProps {
  mainnetProvider: StaticJsonRpcProvider;
  blockExplorer: string;
  tx?: TTransactor;
  tamaTokenRead: TamaToken;
  tamaTokenWrite: TamaToken;
  yourCollectibleRead: TamaCollectibles;
  yourCollectibleWrite: TamaCollectibles;
  tamaCollectiblesVendorRead: TamaCollectiblesVendor;
  tamaCollectiblesVendorWrite: TamaCollectiblesVendor;
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

class Balances {
  tokenId: number;
  balance: string;
  constructor(_tokenId: number, _balance: string) {
    this.tokenId = _tokenId;
    this.balance = _balance;
  }
}

interface MyHack {
  value: string;
}

export const TamaMichael: FC<IYourCollectibleProps> = (props: IYourCollectibleProps) => {
  const ethersContext = useEthersContext();
  const appContractConfig = useAppContracts();
  const readContracts = useContractLoader(appContractConfig);
  const writeContracts = useContractLoader(appContractConfig, ethersContext?.signer, targetNetworkInfo.chainId);
  const { mainnetProvider, blockExplorer, tx } = props;


  const TamaTokenRead = readContracts['TamaToken'] as TamaToken;
  const TamaTokenWrite = writeContracts['TamaToken'] as TamaToken;
  const YourCollectibleRead = readContracts['TamaCollectibles'] as TamaCollectibles;
  const YourCollectibleWrite = writeContracts['TamaCollectibles'] as TamaCollectibles;
  const TamaCollectiblesVendorRead = readContracts['TamaCollectiblesVendor'] as TamaCollectiblesVendor;
  const TamaCollectiblesVendorWrite = writeContracts['TamaCollectiblesVendor'] as TamaCollectiblesVendor;

  //
  // 🧠 This effect will update yourCollectibles by polling when your balance changes
  //
  const [yourCollectibles, setYourCollectibles] = useState<any>([]);
  const [yourBalances, setYourBalances] = useState<Balances[]>();

  let yourBalancesTemp: Balances[];
  useEffect(() => {
    const updateYourCollectibles = async () => {
      if (ethersContext.account == undefined) return;
      // const yourCollectibles = props.yourCollectibleRead || YourCollectibleRead;
      // if (yourCollectibles == undefined) return;
      const collectibleUpdate: any = [];

      for (let tokenId = 0; tokenId < 2; tokenId++) {
        if (!collectibleUpdate?.some((myToken: any) => myToken.id == tokenId)) {
          try {
            console.log('Getting token index', tokenId);
            const tokenURI = await YourCollectibleRead.uri(tokenId);
            console.log('tokenURI', tokenURI);
            const tokenBalance = await YourCollectibleRead.balanceOf(ethersContext.account || '', tokenId);
            console.log('tokenBalance: ', tokenBalance);
            const content = await getFromIPFS(tokenURI + tokenId);
            if (yourBalancesTemp == undefined) {
              yourBalancesTemp = new Array<Balances>();
            }
            yourBalancesTemp.push(new Balances(tokenId, ethers.utils.formatUnits(BigNumber.from(tokenBalance), "wei")));
            try {
              const ipfsObject = JSON.parse(content);
              console.log('ipfsObject', ipfsObject);
              collectibleUpdate.push({
                id: tokenId,
                uri: tokenURI,
                owner: ethersContext.account,
                ...ipfsObject
              });
            } catch (e) {
              console.log(e);
            }
          } catch (e) {
            console.log(e);
          }
        }
      }

      // [0, 1].forEach(async tokenId => {

      // });
      console.log("New tokenBalance: ", yourBalances);
      console.log("New Collection: ", collectibleUpdate);
      setYourBalances(yourBalancesTemp);
      setYourCollectibles(collectibleUpdate);
    };
    updateYourCollectibles();
  }, [ethersContext.account, props.yourCollectibleRead]);
  const amountToBuy = useRef(null);
  return (
    <>
      <div style={{ width: 640, margin: 'auto', marginTop: 32, paddingBottom: 32 }}>
        <List
          bordered
          dataSource={yourCollectibles}
          renderItem={(item: any) => {
            const id = item.id as number;
            let tokenBalance: string = "0";
            if (yourBalances != undefined) {
              const theBalance = yourBalances.find((b: Balances) => b.tokenId == id);
              tokenBalance = theBalance?.balance || '0';
            }
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
                  <div>Owned:  {tokenBalance}</div>

                  <InputNumber id={'token_buy_' + id.toString()} ref={amountToBuy}></InputNumber>
                  <Button onClick={async () => {
                    if (tx == undefined) return;
                    if (ethersContext?.account == undefined) return;

                    console.log("Input by user: ", amountToBuy.current);

                    const { value } = amountToBuy.current as unknown as MyHack;
                    console.log("Input by user: ", value);

                    const valueInNumber = Number.parseInt(value);
                    let allowance = await props.tamaTokenRead.allowance(
                      ethersContext.account,
                      props.tamaCollectiblesVendorWrite.address,
                    );
                    console.log("allowance", allowance);
                    const idBigNumber = ethers.BigNumber.from(id);
                    const price = await props.tamaCollectiblesVendorRead.prices(idBigNumber);
                    const priceInEther = ethers.utils.formatUnits(BigNumber.from(price), "wei");
                    const totalTama = valueInNumber * Number.parseFloat(priceInEther) * 2;
                    let approveTx;
                    const totalTamaBN = BigNumber.from('' + totalTama);
                    if (allowance.lt(totalTamaBN)) {
                      approveTx = tx(
                        props.tamaTokenWrite.approve(props.tamaCollectiblesVendorWrite.address, totalTamaBN, { gasLimit: 200000 }),
                      );
                    }

                    if (approveTx) {
                      console.log("waiting on approve to finish...");
                      let approveTxResult = await approveTx;
                      console.log("approveTxResult:", approveTxResult);
                    }

                    const buyTx = await tx(props.tamaCollectiblesVendorWrite
                      .buyToken(new Array(idBigNumber), new Array(ethers.BigNumber.from(value))));

                    console.log("buyTx: ", buyTx);

                    if (buyTx) {
                      const newBalance = (yourBalances || []).map((b) => {
                        if (b.tokenId == id) {
                          const theNewBalance = Number.parseFloat(b.balance) + valueInNumber;
                          b.balance = '' + theNewBalance;
                        }
                        return b;
                      });
                      setYourBalances(newBalance);
                    }
                  }}>
                    Buy</Button>
                </div>
              </List.Item>
            );
          }}
        />
      </div>
    </>
  );
};
