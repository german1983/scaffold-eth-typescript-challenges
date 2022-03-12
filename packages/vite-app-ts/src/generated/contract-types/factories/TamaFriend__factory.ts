/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TamaFriend, TamaFriendInterface } from "../TamaFriend";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "tokenURIAssigned",
        type: "string",
      },
    ],
    name: "mintItem",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604080518082018252600a81526915185b58519c9a595b9960b21b6020808301918252835180850190945260048452631513919560e21b9084015281519192916200006091600091620000ef565b50805162000076906001906020840190620000ef565b505050620000936200008d6200009960201b60201c565b6200009d565b620001d2565b3390565b600b80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b828054620000fd9062000195565b90600052602060002090601f0160209004810192826200012157600085556200016c565b82601f106200013c57805160ff19168380011785556200016c565b828001600101855582156200016c579182015b828111156200016c5782518255916020019190600101906200014f565b506200017a9291506200017e565b5090565b5b808211156200017a57600081556001016200017f565b600181811c90821680620001aa57607f821691505b60208210811415620001cc57634e487b7160e01b600052602260045260246000fd5b50919050565b611c0c80620001e26000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c806370a08231116100ad578063b88d4fde11610071578063b88d4fde14610266578063c754584914610279578063c87b56dd1461028c578063e985e9c51461029f578063f2fde38b146102db57600080fd5b806370a082311461021f578063715018a6146102325780638da5cb5b1461023a57806395d89b411461024b578063a22cb4651461025357600080fd5b806323b872dd116100f457806323b872dd146101c05780632f745c59146101d357806342842e0e146101e65780634f6ccce7146101f95780636352211e1461020c57600080fd5b806301ffc9a71461013157806306fdde0314610159578063081812fc1461016e578063095ea7b31461019957806318160ddd146101ae575b600080fd5b61014461013f366004611662565b6102ee565b60405190151581526020015b60405180910390f35b6101616102ff565b60405161015091906116d7565b61018161017c3660046116ea565b610391565b6040516001600160a01b039091168152602001610150565b6101ac6101a736600461171f565b61042b565b005b6008545b604051908152602001610150565b6101ac6101ce366004611749565b610541565b6101b26101e136600461171f565b610572565b6101ac6101f4366004611749565b610608565b6101b26102073660046116ea565b610623565b61018161021a3660046116ea565b6106b6565b6101b261022d366004611785565b61072d565b6101ac6107b4565b600b546001600160a01b0316610181565b61016161081a565b6101ac6102613660046117a0565b610829565b6101ac610274366004611868565b610838565b6101b26102873660046118e4565b610870565b61016161029a3660046116ea565b610897565b6101446102ad36600461192d565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6101ac6102e9366004611785565b6108a2565b60006102f98261096d565b92915050565b60606000805461030e90611960565b80601f016020809104026020016040519081016040528092919081815260200182805461033a90611960565b80156103875780601f1061035c57610100808354040283529160200191610387565b820191906000526020600020905b81548152906001019060200180831161036a57829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b031661040f5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b6000610436826106b6565b9050806001600160a01b0316836001600160a01b031614156104a45760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610406565b336001600160a01b03821614806104c057506104c081336102ad565b6105325760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610406565b61053c8383610992565b505050565b61054b3382610a00565b6105675760405162461bcd60e51b81526004016104069061199b565b61053c838383610af7565b600061057d8361072d565b82106105df5760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b6064820152608401610406565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b61053c83838360405180602001604052806000815250610838565b600061062e60085490565b82106106915760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b6064820152608401610406565b600882815481106106a4576106a46119ec565b90600052602060002001549050919050565b6000818152600260205260408120546001600160a01b0316806102f95760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610406565b60006001600160a01b0382166107985760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610406565b506001600160a01b031660009081526003602052604090205490565b600b546001600160a01b0316331461080e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610406565b6108186000610c9e565b565b60606001805461030e90611960565b610834338383610cf0565b5050565b6108423383610a00565b61085e5760405162461bcd60e51b81526004016104069061199b565b61086a84848484610dbf565b50505050565b6000610880600c80546001019055565b600061088b600c5490565b90506102f93382610df2565b60606102f982610f40565b600b546001600160a01b031633146108fc5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610406565b6001600160a01b0381166109615760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610406565b61096a81610c9e565b50565b60006001600160e01b0319821663780e9d6360e01b14806102f957506102f9826110b2565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906109c7826106b6565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b0316610a795760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610406565b6000610a84836106b6565b9050806001600160a01b0316846001600160a01b03161480610abf5750836001600160a01b0316610ab484610391565b6001600160a01b0316145b80610aef57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316610b0a826106b6565b6001600160a01b031614610b6e5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610406565b6001600160a01b038216610bd05760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610406565b610bdb838383611102565b610be6600082610992565b6001600160a01b0383166000908152600360205260408120805460019290610c0f908490611a18565b90915550506001600160a01b0382166000908152600360205260408120805460019290610c3d908490611a2f565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600b80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b03161415610d525760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610406565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610dca848484610af7565b610dd68484848461110d565b61086a5760405162461bcd60e51b815260040161040690611a47565b6001600160a01b038216610e485760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610406565b6000818152600260205260409020546001600160a01b031615610ead5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610406565b610eb960008383611102565b6001600160a01b0382166000908152600360205260408120805460019290610ee2908490611a2f565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6000818152600260205260409020546060906001600160a01b0316610fc15760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f72206044820152703737b732bc34b9ba32b73a103a37b5b2b760791b6064820152608401610406565b6000828152600a602052604081208054610fda90611960565b80601f016020809104026020016040519081016040528092919081815260200182805461100690611960565b80156110535780601f1061102857610100808354040283529160200191611053565b820191906000526020600020905b81548152906001019060200180831161103657829003601f168201915b50505050509050600061106461120b565b9050805160001415611077575092915050565b8151156110a9578082604051602001611091929190611a99565b60405160208183030381529060405292505050919050565b610aef8461122b565b60006001600160e01b031982166380ac58cd60e01b14806110e357506001600160e01b03198216635b5e139f60e01b145b806102f957506301ffc9a760e01b6001600160e01b03198316146102f9565b61053c838383611306565b60006001600160a01b0384163b1561120057604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611151903390899088908890600401611ac8565b6020604051808303816000875af192505050801561118c575060408051601f3d908101601f1916820190925261118991810190611b05565b60015b6111e6573d8080156111ba576040519150601f19603f3d011682016040523d82523d6000602084013e6111bf565b606091505b5080516111de5760405162461bcd60e51b815260040161040690611a47565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610aef565b506001949350505050565b6060604051806080016040528060458152602001611b9260459139905090565b6000818152600260205260409020546060906001600160a01b03166112aa5760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610406565b60006112b461120b565b905060008151116112d457604051806020016040528060008152506112ff565b806112de846113be565b6040516020016112ef929190611a99565b6040516020818303038152906040525b9392505050565b6001600160a01b0383166113615761135c81600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b611384565b816001600160a01b0316836001600160a01b0316146113845761138483826114bc565b6001600160a01b03821661139b5761053c81611559565b826001600160a01b0316826001600160a01b03161461053c5761053c8282611608565b6060816113e25750506040805180820190915260018152600360fc1b602082015290565b8160005b811561140c57806113f681611b22565b91506114059050600a83611b53565b91506113e6565b60008167ffffffffffffffff811115611427576114276117dc565b6040519080825280601f01601f191660200182016040528015611451576020820181803683370190505b5090505b8415610aef57611466600183611a18565b9150611473600a86611b67565b61147e906030611a2f565b60f81b818381518110611493576114936119ec565b60200101906001600160f81b031916908160001a9053506114b5600a86611b53565b9450611455565b600060016114c98461072d565b6114d39190611a18565b600083815260076020526040902054909150808214611526576001600160a01b03841660009081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b5060009182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b60085460009061156b90600190611a18565b60008381526009602052604081205460088054939450909284908110611593576115936119ec565b9060005260206000200154905080600883815481106115b4576115b46119ec565b60009182526020808320909101929092558281526009909152604080822084905585825281205560088054806115ec576115ec611b7b565b6001900381819060005260206000200160009055905550505050565b60006116138361072d565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b6001600160e01b03198116811461096a57600080fd5b60006020828403121561167457600080fd5b81356112ff8161164c565b60005b8381101561169a578181015183820152602001611682565b8381111561086a5750506000910152565b600081518084526116c381602086016020860161167f565b601f01601f19169290920160200192915050565b6020815260006112ff60208301846116ab565b6000602082840312156116fc57600080fd5b5035919050565b80356001600160a01b038116811461171a57600080fd5b919050565b6000806040838503121561173257600080fd5b61173b83611703565b946020939093013593505050565b60008060006060848603121561175e57600080fd5b61176784611703565b925061177560208501611703565b9150604084013590509250925092565b60006020828403121561179757600080fd5b6112ff82611703565b600080604083850312156117b357600080fd5b6117bc83611703565b9150602083013580151581146117d157600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561180d5761180d6117dc565b604051601f8501601f19908116603f01168101908282118183101715611835576118356117dc565b8160405280935085815286868601111561184e57600080fd5b858560208301376000602087830101525050509392505050565b6000806000806080858703121561187e57600080fd5b61188785611703565b935061189560208601611703565b925060408501359150606085013567ffffffffffffffff8111156118b857600080fd5b8501601f810187136118c957600080fd5b6118d8878235602084016117f2565b91505092959194509250565b6000602082840312156118f657600080fd5b813567ffffffffffffffff81111561190d57600080fd5b8201601f8101841361191e57600080fd5b610aef848235602084016117f2565b6000806040838503121561194057600080fd5b61194983611703565b915061195760208401611703565b90509250929050565b600181811c9082168061197457607f821691505b6020821081141561199557634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600082821015611a2a57611a2a611a02565b500390565b60008219821115611a4257611a42611a02565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60008351611aab81846020880161167f565b835190830190611abf81836020880161167f565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611afb908301846116ab565b9695505050505050565b600060208284031215611b1757600080fd5b81516112ff8161164c565b6000600019821415611b3657611b36611a02565b5060010190565b634e487b7160e01b600052601260045260246000fd5b600082611b6257611b62611b3d565b500490565b600082611b7657611b76611b3d565b500690565b634e487b7160e01b600052603160045260246000fdfe626166796265696465363678646e7573756778703379366d616a66786235676769637a7665616d79376574336770346572336665623577766b6e792f6d657461646174612fa26469706673582212204e5d4c10ced425531f499a26df0ab71bdad26e4ea684109d9385421c3a06a6ce64736f6c634300080c0033";

export class TamaFriend__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TamaFriend> {
    return super.deploy(overrides || {}) as Promise<TamaFriend>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TamaFriend {
    return super.attach(address) as TamaFriend;
  }
  connect(signer: Signer): TamaFriend__factory {
    return super.connect(signer) as TamaFriend__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TamaFriendInterface {
    return new utils.Interface(_abi) as TamaFriendInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TamaFriend {
    return new Contract(address, _abi, signerOrProvider) as TamaFriend;
  }
}
