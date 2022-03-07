import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { FC, useEffect, useState } from 'react';
import { TamaController } from '~~/generated/contract-types';
import { targetNetworkInfo } from '~~/config/providersConfig';
import { useAppContracts } from '~~/app/routes/main/hooks/useAppContracts';
import { useContractLoader, useContractReader } from 'eth-hooks';
import { useEthersContext } from 'eth-hooks/context';
import { BigNumber, ethers } from 'ethers';
import { create } from 'ipfs-http-client';
import { Button, Card, List } from 'antd';
import { Address, AddressInput } from 'eth-components/ant';
import { TTransactor } from 'eth-components/functions';
import { NFTStorage, Blob } from 'nft.storage';
import { mintTemplate, TemplateProperties } from './TemplateTamaController';

const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDM4MjYwYTczQzI1ODZEODMxODlmMEQ2M0Q5NUZlYUVDNWY1NDU0ZmQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NjU5ODE3OTUwMywibmFtZSI6IlRhbWF2ZXJzZSJ9.na-vsUo7qamdGSrvOCqGbKSE0m4h2MdT-n6_BSQx15I';
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

export interface ITamaControllersProps {
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

async function storeExampleNFT(options: TemplateProperties | undefined) {
  const toMint = mintTemplate(options);
  const image = toMint.image;
  console.log("Image being minted (base64): ", image);
  const myNFT = JSON.stringify(toMint);
  const someData = new Blob([myNFT]);
  const cid = await client.storeBlob(someData)
  return cid;
}

export const TamaControllers: FC<ITamaControllersProps> = (props: ITamaControllersProps) => {
  const ethersContext = useEthersContext();
  const appContractConfig = useAppContracts();
  const readContracts = useContractLoader(appContractConfig);
  const writeContracts = useContractLoader(appContractConfig, ethersContext?.signer, targetNetworkInfo.chainId);
  const { mainnetProvider, blockExplorer, tx } = props;

  const TamaControllerRead = readContracts['TamaController'] as TamaController;
  const TamaControllerWrite = writeContracts['TamaController'] as TamaController;

  const balance = useContractReader<BigNumber[]>(TamaControllerRead, {
    contractName: 'TamaController',
    functionName: 'balanceOf',
    functionArgs: [ethersContext.account],
  });
  console.log('balance', balance);
  //
  // 🧠 This effect will update yourCollectibles by polling when your balance changes
  //
  const [yourCollectibles, setTamaControllers] = useState<any>([]);
  const [minting, setMinting] = useState<boolean>(false);
  const [transferToAddresses, setTransferToAddresses] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateTamaControllers = async () => {
      const collectibleUpdate = [];
      if (!balance) return;
      const yourBalance = balance[0]?.toNumber() ?? 0;
      for (let tokenIndex = 0; tokenIndex < yourBalance; tokenIndex++) {
        try {
          console.log('Getting token index', tokenIndex);
          const tokenId = await TamaControllerRead.tokenOfOwnerByIndex(ethersContext.account ?? '', tokenIndex);
          console.log('tokenId', tokenId);
          const tokenURI = await TamaControllerRead.tokenURI(tokenId);
          console.log('tokenURI', tokenURI);

          const ipfsHash = tokenURI.replace('ipfs://', '');
          console.log('ipfsHash', ipfsHash);

          const content = await getFromIPFS(ipfsHash);

          try {
            const ipfsObject = JSON.parse(content);
            console.log('ipfsObject', ipfsObject);
            collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: ethersContext.account, ...ipfsObject });
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      }
      setTamaControllers(collectibleUpdate);
    };
    updateTamaControllers();
  }, [ethersContext.account, balance]);

  const [mintCount, setMintCount] = useState<number>(0);
  const mintItem = async () => {
    if (!tx || !ethersContext.account) return;

    // upload to ipfs
    const uploaded = await storeExampleNFT(undefined); // TODO replace with real options selected by the user
    setMintCount(mintCount + 1);
    console.log('Uploaded Hash: ', uploaded);
    await tx(TamaControllerWrite.mintItem(uploaded), (update) => {
      console.log('📡 Transaction Update:', update);
      if (update && (update.status === 'confirmed' || update.status === 1)) {
        console.log(' 🍾 Transaction ' + update.hash + ' finished!');
        console.log(
          ' ⛽️ ' +
          update.gasUsed +
          '/' +
          (update.gasLimit || update.gas) +
          ' @ ' +
          parseFloat(update.gasPrice) / 1000000000 +
          ' gwei'
        );
      }
    });
  };

  return (
    <>
      <div style={{ width: 640, margin: 'auto', marginTop: 32, paddingBottom: 32 }}>
        <Button
          shape="round"
          size="large"
          onClick={async () => {
            setMinting(true);
            await mintItem();
            setMinting(false);
          }}>
          MINT NFT
        </Button>
      </div>
      <div style={{ width: 640, margin: 'auto', marginTop: 32, paddingBottom: 32 }}>
        <List
          bordered
          dataSource={yourCollectibles}
          renderItem={(item: any) => {
            const id = item.id.toNumber();
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
                  owner:{' '}
                  <Address
                    address={item.owner}
                    ensProvider={mainnetProvider}
                    blockExplorer={blockExplorer}
                    fontSize={16}
                  />
                  <AddressInput
                    ensProvider={mainnetProvider}
                    placeholder="transfer to address"
                    address={transferToAddresses[id]}
                    onChange={(newValue) => {
                      setTransferToAddresses({ ...transferToAddresses, ...{ [id]: newValue } });
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (!ethersContext.account || !tx) return;
                      tx(TamaControllerWrite.transferFrom(ethersContext.account, transferToAddresses[id], id));
                    }}>
                    Transfer
                  </Button>
                </div>
              </List.Item>
            );
          }}
        />
      </div>
    </>
  );
};
