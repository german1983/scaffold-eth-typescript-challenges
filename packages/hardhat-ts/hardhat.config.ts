/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/order */
// This adds support for typescript paths mappings
import 'tsconfig-paths/register';

import { Signer, utils } from 'ethers';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@tenderly/hardhat-tenderly';
import 'hardhat-deploy';
// not required as we are using @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers

// import 'solidity-coverage';

import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';

import { Provider, TransactionRequest } from '@ethersproject/providers';

import { HardhatUserConfig, task } from 'hardhat/config';
import { HttpNetworkUserConfig } from 'hardhat/types';
import { HardhatRuntimeEnvironmentExtended, TEthers } from 'helpers/types/hardhat-type-extensions';

import { create } from 'ipfs-http-client';

declare module 'hardhat/types/runtime' {
  // This is an example of an extension to the Hardhat Runtime Environment.
  // This new field will be available in tasks' actions, scripts, and tests.
  export interface HardhatRuntimeEnvironment {
    ethers: TEthers;
  }
}

const { isAddress, getAddress, formatUnits, parseUnits } = utils;
//
// Select the network you want to deploy to here:
//
const defaultNetwork = 'optimismkovan'; //'kovan';

const getMnemonic = () => {
  try {
    return fs.readFileSync('./mnemonic.secret').toString().trim();
  } catch (e) {
    // @ts-ignore
    if (defaultNetwork !== 'localhost') {
      console.log('☢️ WARNING: No mnemonic file created for a deploy account. Try `yarn run generate` and then `yarn run account`.');
    }
  }
  return '';
};

const config: HardhatUserConfig = {
  defaultNetwork,
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  // don't forget to set your provider like:
  // REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
  // (then your frontend will talk to your contracts on the live network!)
  // (you will need to restart the `yarn run start` dev server after editing the .env)

  networks: {
    localhost: {
      url: 'http://localhost:8545',
      /*
        if there is no mnemonic, it will just use account 0 of the hardhat node to deploy
        (you can put in a mnemonic here to set the deployer locally)
      */
      // accounts: {
      //   mnemonic: mnemonic(),
      // },
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/dd74cd7fbb08440b9c5db669e97bac0c', // <---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    kovan: {
      url: 'https://kovan.infura.io/v3/dd74cd7fbb08440b9c5db669e97bac0c', // <---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/dd74cd7fbb08440b9c5db669e97bac0c', // <---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    ropsten: {
      url: 'https://ropsten.infura.io/v3/dd74cd7fbb08440b9c5db669e97bac0c', // <---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/dd74cd7fbb08440b9c5db669e97bac0c', // <---- YOUR INFURA ID! (or it won't work)
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    xdai: {
      url: 'https://rpc.xdaichain.com/',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    matic: {
      url: 'https://polygon-rpc.com/',
      gasPrice: 1000000000,
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    // for mainnet
    optimism: {
      url: "https://mainnet.optimism.io",
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    // for testnet
    optimismkovan: {
      url: "https://kovan.optimism.io",
      accounts: {
        mnemonic: getMnemonic(),
      },
    },
    // for the local dev environment
    optimismlocal: {
      url: "http://localhost:8545",
      accounts: {
        mnemonic: getMnemonic(),
      },
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.8.12',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.6.7',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    cache: './generated/cache',
    artifacts: './generated/artifacts',
    deployments: './generated/deployments',
  },
  typechain: {
    outDir: '../vite-app-ts/src/generated/contract-types',
  },
};
export default config;

const DEBUG = false;

function debug(text: string) {
  if (DEBUG) {
    console.log(text);
  }
}

task('mint', 'Mints NFTs to the specified address', async (_, hre) => {
  const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  });

  const { getNamedAccounts } = hre;

  // ADDRESS TO MINT TO:
  const toAddress = '0xE987D57A1466E1Cb19CE9AbC3A01457890409b75';

  // // // // // // // // // // // // // // // // // //

  console.log('\n\n 🎫 Minting to ' + toAddress + '...\n');

  const { deployer } = await getNamedAccounts();
  const yourCollectible = await hre.ethers.getContract('YourCollectible', deployer);
  const delay = 1000;

  const buffalo = {
    description: "It's actually a bison?",
    external_url: 'https://austingriffith.com/portfolio/paintings/', // <-- this can link to a page for the specific file too
    image: 'https://austingriffith.com/images/paintings/buffalo.jpg',
    name: 'Buffalo',
    attributes: [
      {
        trait_type: 'BackgroundColor',
        value: 'green',
      },
      {
        trait_type: 'Eyes',
        value: 'googly',
      },
      {
        trait_type: 'Stamina',
        value: 42,
      },
    ],
  };
  console.log('Uploading buffalo...');
  const uploaded = await ipfs.add(JSON.stringify(buffalo));

  console.log('Minting buffalo with IPFS hash (' + uploaded.path + ')');
  await yourCollectible.mintItem(toAddress, uploaded.path, {
    gasLimit: 400000,
  });

  await sleep(delay);

  const zebra = {
    description: 'What is it so worried about?',
    external_url: 'https://austingriffith.com/portfolio/paintings/', // <-- this can link to a page for the specific file too
    image: 'https://austingriffith.com/images/paintings/zebra.jpg',
    name: 'Zebra',
    attributes: [
      {
        trait_type: 'BackgroundColor',
        value: 'blue',
      },
      {
        trait_type: 'Eyes',
        value: 'googly',
      },
      {
        trait_type: 'Stamina',
        value: 38,
      },
    ],
  };
  console.log('Uploading zebra...');
  const uploadedzebra = await ipfs.add(JSON.stringify(zebra));

  console.log('Minting zebra with IPFS hash (' + uploadedzebra.path + ')');
  await yourCollectible.mintItem(toAddress, uploadedzebra.path, {
    gasLimit: 400000,
  });

  await sleep(delay);

  const rhino = {
    description: 'What a horn!',
    external_url: 'https://austingriffith.com/portfolio/paintings/', // <-- this can link to a page for the specific file too
    image: 'https://austingriffith.com/images/paintings/rhino.jpg',
    name: 'Rhino',
    attributes: [
      {
        trait_type: 'BackgroundColor',
        value: 'pink',
      },
      {
        trait_type: 'Eyes',
        value: 'googly',
      },
      {
        trait_type: 'Stamina',
        value: 22,
      },
    ],
  };
  console.log('Uploading rhino...');
  const uploadedrhino = await ipfs.add(JSON.stringify(rhino));

  console.log('Minting rhino with IPFS hash (' + uploadedrhino.path + ')');
  await yourCollectible.mintItem(toAddress, uploadedrhino.path, {
    gasLimit: 400000,
  });

  await sleep(delay);

  const fish = {
    description: 'Is that an underbyte?',
    external_url: 'https://austingriffith.com/portfolio/paintings/', // <-- this can link to a page for the specific file too
    image: 'https://austingriffith.com/images/paintings/fish.jpg',
    name: 'Fish',
    attributes: [
      {
        trait_type: 'BackgroundColor',
        value: 'blue',
      },
      {
        trait_type: 'Eyes',
        value: 'googly',
      },
      {
        trait_type: 'Stamina',
        value: 15,
      },
    ],
  };
  console.log('Uploading fish...');
  const uploadedfish = await ipfs.add(JSON.stringify(fish));

  console.log('Minting fish with IPFS hash (' + uploadedfish.path + ')');
  await yourCollectible.mintItem(toAddress, uploadedfish.path, {
    gasLimit: 400000,
  });

  await sleep(delay);

  console.log('Transferring Ownership of YourCollectible to ' + toAddress + '...');

  await yourCollectible.transferOwnership(toAddress, { gasLimit: 400000 });

  await sleep(delay);

  /*


  console.log("Minting zebra...")
  await yourCollectible.mintItem("0xD75b0609ed51307E13bae0F9394b5f63A7f8b6A1","zebra.jpg")

  */

  // const secondContract = await deploy("SecondContract")

  // const exampleToken = await deploy("ExampleToken")
  // const examplePriceOracle = await deploy("ExamplePriceOracle")
  // const smartContractWallet = await deploy("SmartContractWallet",[exampleToken.address,examplePriceOracle.address])

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */
});

task('wallet', 'Create a wallet (pk) link', async (_, { ethers }) => {
  const randomWallet = ethers.Wallet.createRandom();
  const { privateKey } = randomWallet._signingKey();
  console.log(`🔐 WALLET Generated as ${randomWallet.address}`);
  console.log(`🔗 http://localhost:3000/pk#${privateKey}`);
});

task('fundedwallet', 'Create a wallet (pk) link and fund it with deployer?')
  .addOptionalParam('amount', 'Amount of ETH to send to wallet after generating')
  .addOptionalParam('url', 'URL to add pk to')
  .setAction(async (taskArgs, hre) => {
    const { ethers } = hre;
    hre.waffle;
    const randomWallet = ethers.Wallet.createRandom();
    const { privateKey } = randomWallet._signingKey();
    console.log(`🔐 WALLET Generated as ${randomWallet.address}`);
    const url = taskArgs.url ? taskArgs.url : 'http://localhost:3000';

    let localDeployerMnemonic: string | undefined;
    try {
      const mnemonic = fs.readFileSync('./mnemonic.secret');
      localDeployerMnemonic = mnemonic.toString().trim();
    } catch (e) {
      /* do nothing - this file isn't always there */
    }

    const amount = taskArgs.amount ? taskArgs.amount : '0.01';
    const tx = {
      to: randomWallet.address,
      value: ethers.utils.parseEther(amount),
    };

    // SEND USING LOCAL DEPLOYER MNEMONIC IF THERE IS ONE
    // IF NOT SEND USING LOCAL HARDHAT NODE:
    if (localDeployerMnemonic) {
      let deployerWallet = ethers.Wallet.fromMnemonic(localDeployerMnemonic);
      deployerWallet = deployerWallet.connect(ethers.provider as Provider);
      console.log(`💵 Sending ${amount} ETH to ${randomWallet.address} using deployer account`);
      const sendresult = await deployerWallet.sendTransaction(tx);
      console.log(`\n${url}/pk#${privateKey}\n`);
    } else {
      console.log(`💵 Sending ${amount} ETH to ${randomWallet.address} using local node`);
      console.log(`\n${url}/pk#${privateKey}\n`);
      return send(ethers.provider.getSigner() as Signer, tx);
    }
  });

task('generate', 'Create a mnemonic for builder deploys', async (_, { ethers }) => {
  const bip39 = require('bip39');
  const hdkey = require('ethereumjs-wallet/hdkey');
  const mnemonic = bip39.generateMnemonic();
  if (DEBUG) console.log('mnemonic', mnemonic);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  if (DEBUG) console.log('seed', seed);
  const hdwallet = hdkey.fromMasterSeed(seed);
  const wallet_hdpath = "m/44'/60'/0'/0/";
  const account_index = 0;
  const fullPath = wallet_hdpath + account_index;
  if (DEBUG) console.log('fullPath', fullPath);
  const wallet = hdwallet.derivePath(fullPath).getWallet();
  const privateKey = `0x${wallet._privKey.toString('hex')}`;
  if (DEBUG) console.log('privateKey', privateKey);
  const EthUtil = require('ethereumjs-util');
  const address = `0x${EthUtil.privateToAddress(wallet._privKey).toString('hex')}`;
  console.log(`🔐 Account Generated as ${address} and set as mnemonic in packages/hardhat`);
  console.log("💬 Use 'yarn run account' to get more information about the deployment account.");

  fs.writeFileSync(`./${address}.txt`, mnemonic.toString());
  fs.writeFileSync('./mnemonic.secret', mnemonic.toString());
});

task('mineContractAddress', 'Looks for a deployer account that will give leading zeros')
  .addParam('searchFor', 'String to search for')
  .setAction(async (taskArgs, { network, ethers }) => {
    let contract_address = '';
    let address;

    const bip39 = require('bip39');
    const hdkey = require('ethereumjs-wallet/hdkey');

    let mnemonic = '';
    while (contract_address.indexOf(taskArgs.searchFor) != 0) {
      mnemonic = bip39.generateMnemonic();
      if (DEBUG) console.log('mnemonic', mnemonic);
      const seed = await bip39.mnemonicToSeed(mnemonic);
      if (DEBUG) console.log('seed', seed);
      const hdwallet = hdkey.fromMasterSeed(seed);
      const wallet_hdpath = "m/44'/60'/0'/0/";
      const account_index = 0;
      const fullPath = wallet_hdpath + account_index;
      if (DEBUG) console.log('fullPath', fullPath);
      const wallet = hdwallet.derivePath(fullPath).getWallet();
      const privateKey = `0x${wallet._privKey.toString('hex')}`;
      if (DEBUG) console.log('privateKey', privateKey);
      const EthUtil = require('ethereumjs-util');
      address = `0x${EthUtil.privateToAddress(wallet._privKey).toString('hex')}`;

      const rlp = require('rlp');
      const keccak = require('keccak');

      const nonce = 0x00; // The nonce must be a hex literal!
      const sender = address;

      const input_arr = [sender, nonce];
      const rlp_encoded = rlp.encode(input_arr);

      const contract_address_long = keccak('keccak256').update(rlp_encoded).digest('hex');

      contract_address = contract_address_long.substring(24); // Trim the first 24 characters.
    }

    console.log(`⛏  Account Mined as ${address} and set as mnemonic in packages/hardhat`);
    console.log(`📜 This will create the first contract: ${chalk.magenta(`0x${contract_address}`)}`);
    console.log("💬 Use 'yarn run account' to get more information about the deployment account.");

    fs.writeFileSync(`./${address}_produces${contract_address}.txt`, mnemonic.toString());
    fs.writeFileSync('./mnemonic.secret', mnemonic.toString());
  });

task('account', 'Get balance informations for the deployment account.', async (_, { ethers }) => {
  const hdkey = require('ethereumjs-wallet/hdkey');
  const bip39 = require('bip39');
  const mnemonic = fs.readFileSync('./mnemonic.secret').toString().trim();
  if (DEBUG) console.log('mnemonic', mnemonic);
  const seed = await bip39.mnemonicToSeed(mnemonic);
  if (DEBUG) console.log('seed', seed);
  const hdwallet = hdkey.fromMasterSeed(seed);
  const wallet_hdpath = "m/44'/60'/0'/0/";
  const account_index = 0;
  const fullPath = wallet_hdpath + account_index;
  if (DEBUG) console.log('fullPath', fullPath);
  const wallet = hdwallet.derivePath(fullPath).getWallet();
  const privateKey = `0x${wallet._privKey.toString('hex')}`;
  if (DEBUG) console.log('privateKey', privateKey);
  const EthUtil = require('ethereumjs-util');
  const address = `0x${EthUtil.privateToAddress(wallet._privKey).toString('hex')}`;

  const qrcode = require('qrcode-terminal');
  qrcode.generate(address);
  console.log(`‍📬 Deployer Account is ${address}`);
  for (const n in config.networks) {
    // console.log(config.networks[n],n)
    try {
      const { url } = config.networks[n] as HttpNetworkUserConfig;
      const provider = new ethers.providers.JsonRpcProvider('');
      const balance = await provider.getBalance(address);
      console.log(` -- ${n} --  -- -- 📡 `);
      console.log(`   balance: ${ethers.utils.formatEther(balance)}`);
      console.log(`   nonce: ${await provider.getTransactionCount(address)}`);
    } catch (e) {
      if (DEBUG) {
        console.log(e);
      }
    }
  }
});

const findFirstAddr = async (ethers: TEthers, addr: string) => {
  if (isAddress(addr)) {
    return getAddress(addr);
  }
  const accounts = await ethers.provider.listAccounts();
  if (accounts !== undefined) {
    const temp = accounts.find((f: string) => f === addr);
    if (temp?.length) return temp[0];
  }
  throw `Could not normalize address: ${addr}`;
};

task('accounts', 'Prints the list of accounts', async (_, { ethers }) => {
  const accounts = await ethers.provider.listAccounts();
  accounts.forEach((account: any) => console.log(account));
});

task('blockNumber', 'Prints the block number', async (_, { ethers }) => {
  const blockNumber = await ethers.provider.getBlockNumber();
  console.log(blockNumber);
});

task('balance', "Prints an account's balance")
  .addPositionalParam('account', "The account's address")
  .setAction(async (taskArgs, { ethers }) => {
    const balance = await ethers.provider.getBalance(await findFirstAddr(ethers, taskArgs.account));
    console.log(formatUnits(balance, 'ether'), 'ETH');
  });

function send(signer: Signer, txparams: any) {
  return signer.sendTransaction(txparams);
  //    , (error, transactionHash) => {
  //     if (error) {
  //       debug(`Error: ${error}`);
  //     }
  //     debug(`transactionHash: ${transactionHash}`);
  //     // checkForReceipt(2, params, transactionHash, resolve)
  //   });
}

task('send', 'Send ETH')
  .addParam('from', 'From address or account index')
  .addOptionalParam('to', 'To address or account index')
  .addOptionalParam('amount', 'Amount to send in ether')
  .addOptionalParam('data', 'Data included in transaction')
  .addOptionalParam('gasPrice', 'Price you are willing to pay in gwei')
  .addOptionalParam('gasLimit', 'Limit of how much gas to spend')

  .setAction(async (taskArgs, { network, ethers }) => {
    const from = await findFirstAddr(ethers, taskArgs.from);
    debug(`Normalized from address: ${from}`);
    const fromSigner = ethers.provider.getSigner(from);

    let to;
    if (taskArgs.to) {
      to = await findFirstAddr(ethers, taskArgs.to);
      debug(`Normalized to address: ${to}`);
    }

    const txRequest: TransactionRequest = {
      from: await fromSigner.getAddress(),
      to,
      value: parseUnits(taskArgs.amount ? taskArgs.amount : '0', 'ether').toHexString(),
      nonce: await fromSigner.getTransactionCount(),
      gasPrice: parseUnits(taskArgs.gasPrice ? taskArgs.gasPrice : '1.001', 'gwei').toHexString(),
      gasLimit: taskArgs.gasLimit ? taskArgs.gasLimit : 24000,
      chainId: network.config.chainId,
    };

    if (taskArgs.data !== undefined) {
      txRequest.data = taskArgs.data;
      debug(`Adding data to payload: ${txRequest.data}`);
    }
    debug(`${(txRequest.gasPrice as any) / 1000000000} gwei`);
    debug(JSON.stringify(txRequest, null, 2));

    return send(fromSigner as Signer, txRequest);
  });

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
