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
  "0x60806040523480156200001157600080fd5b50604080518082018252600a81526915185b58519c9a595b9960b21b6020808301918252835180850190945260048452631513919560e21b9084015281519192916200006091600091620000ef565b50805162000076906001906020840190620000ef565b505050620000936200008d6200009960201b60201c565b6200009d565b620001d2565b3390565b600b80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b828054620000fd9062000195565b90600052602060002090601f0160209004810192826200012157600085556200016c565b82601f106200013c57805160ff19168380011785556200016c565b828001600101855582156200016c579182015b828111156200016c5782518255916020019190600101906200014f565b506200017a9291506200017e565b5090565b5b808211156200017a57600081556001016200017f565b600181811c90821680620001aa57607f821691505b60208210811415620001cc57634e487b7160e01b600052602260045260246000fd5b50919050565b611cfd80620001e26000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c806370a08231116100ad578063b88d4fde11610071578063b88d4fde14610266578063c754584914610279578063c87b56dd1461028c578063e985e9c51461029f578063f2fde38b146102db57600080fd5b806370a082311461021f578063715018a6146102325780638da5cb5b1461023a57806395d89b411461024b578063a22cb4651461025357600080fd5b806323b872dd116100f457806323b872dd146101c05780632f745c59146101d357806342842e0e146101e65780634f6ccce7146101f95780636352211e1461020c57600080fd5b806301ffc9a71461013157806306fdde0314610159578063081812fc1461016e578063095ea7b31461019957806318160ddd146101ae575b600080fd5b61014461013f366004611798565b6102ee565b60405190151581526020015b60405180910390f35b6101616102ff565b604051610150919061180d565b61018161017c366004611820565b610391565b6040516001600160a01b039091168152602001610150565b6101ac6101a7366004611855565b61041e565b005b6008545b604051908152602001610150565b6101ac6101ce36600461187f565b610534565b6101b26101e1366004611855565b610565565b6101ac6101f436600461187f565b6105fb565b6101b2610207366004611820565b610616565b61018161021a366004611820565b6106a9565b6101b261022d3660046118bb565b610720565b6101ac6107a7565b600b546001600160a01b0316610181565b61016161080d565b6101ac6102613660046118d6565b61081c565b6101ac61027436600461199e565b61082b565b6101b2610287366004611a1a565b610863565b61016161029a366004611820565b610894565b6101446102ad366004611a63565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6101ac6102e93660046118bb565b61089f565b60006102f98261096a565b92915050565b60606000805461030e90611a96565b80601f016020809104026020016040519081016040528092919081815260200182805461033a90611a96565b80156103875780601f1061035c57610100808354040283529160200191610387565b820191906000526020600020905b81548152906001019060200180831161036a57829003601f168201915b5050505050905090565b600061039c8261098f565b6104025760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b6000610429826106a9565b9050806001600160a01b0316836001600160a01b031614156104975760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016103f9565b336001600160a01b03821614806104b357506104b381336102ad565b6105255760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016103f9565b61052f83836109ac565b505050565b61053e3382610a1a565b61055a5760405162461bcd60e51b81526004016103f990611ad1565b61052f838383610b04565b600061057083610720565b82106105d25760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b60648201526084016103f9565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b61052f8383836040518060200160405280600081525061082b565b600061062160085490565b82106106845760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b60648201526084016103f9565b6008828154811061069757610697611b22565b90600052602060002001549050919050565b6000818152600260205260408120546001600160a01b0316806102f95760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016103f9565b60006001600160a01b03821661078b5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016103f9565b506001600160a01b031660009081526003602052604090205490565b600b546001600160a01b031633146108015760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103f9565b61080b6000610cab565b565b60606001805461030e90611a96565b610827338383610cfd565b5050565b6108353383610a1a565b6108515760405162461bcd60e51b81526004016103f990611ad1565b61085d84848484610dcc565b50505050565b6000610873600c80546001019055565b600061087e600c5490565b905061088a3382610dff565b6102f98184610f3e565b60606102f982610fc9565b600b546001600160a01b031633146108f95760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103f9565b6001600160a01b03811661095e5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103f9565b61096781610cab565b50565b60006001600160e01b0319821663780e9d6360e01b14806102f957506102f982611155565b6000908152600260205260409020546001600160a01b0316151590565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906109e1826106a9565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000610a258261098f565b610a865760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016103f9565b6000610a91836106a9565b9050806001600160a01b0316846001600160a01b03161480610acc5750836001600160a01b0316610ac184610391565b6001600160a01b0316145b80610afc57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316610b17826106a9565b6001600160a01b031614610b7b5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b60648201526084016103f9565b6001600160a01b038216610bdd5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103f9565b610be88383836111a5565b610bf36000826109ac565b6001600160a01b0383166000908152600360205260408120805460019290610c1c908490611b4e565b90915550506001600160a01b0382166000908152600360205260408120805460019290610c4a908490611b65565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600b80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b03161415610d5f5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103f9565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610dd7848484610b04565b610de3848484846111b0565b61085d5760405162461bcd60e51b81526004016103f990611b7d565b6001600160a01b038216610e555760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103f9565b610e5e8161098f565b15610eab5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103f9565b610eb7600083836111a5565b6001600160a01b0382166000908152600360205260408120805460019290610ee0908490611b65565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b610f478261098f565b610faa5760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b60648201526084016103f9565b6000828152600a60209081526040909120825161052f928401906116e9565b6060610fd48261098f565b61103a5760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f72206044820152703737b732bc34b9ba32b73a103a37b5b2b760791b60648201526084016103f9565b6000828152600a60205260408120805461105390611a96565b80601f016020809104026020016040519081016040528092919081815260200182805461107f90611a96565b80156110cc5780601f106110a1576101008083540402835291602001916110cc565b820191906000526020600020905b8154815290600101906020018083116110af57829003601f168201915b50505050509050600061110760408051808201909152601581527468747470733a2f2f697066732e696f2f697066732f60581b602082015290565b905080516000141561111a575092915050565b81511561114c578082604051602001611134929190611bcf565b60405160208183030381529060405292505050919050565b610afc846112ae565b60006001600160e01b031982166380ac58cd60e01b148061118657506001600160e01b03198216635b5e139f60e01b145b806102f957506301ffc9a760e01b6001600160e01b03198316146102f9565b61052f8383836113a3565b60006001600160a01b0384163b156112a357604051630a85bd0160e11b81526001600160a01b0385169063150b7a02906111f4903390899088908890600401611bfe565b6020604051808303816000875af192505050801561122f575060408051601f3d908101601f1916820190925261122c91810190611c3b565b60015b611289573d80801561125d576040519150601f19603f3d011682016040523d82523d6000602084013e611262565b606091505b5080516112815760405162461bcd60e51b81526004016103f990611b7d565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610afc565b506001949350505050565b60606112b98261098f565b61131d5760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b60648201526084016103f9565b600061135160408051808201909152601581527468747470733a2f2f697066732e696f2f697066732f60581b602082015290565b90506000815111611371576040518060200160405280600081525061139c565b8061137b8461145b565b60405160200161138c929190611bcf565b6040516020818303038152906040525b9392505050565b6001600160a01b0383166113fe576113f981600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b611421565b816001600160a01b0316836001600160a01b031614611421576114218382611559565b6001600160a01b0382166114385761052f816115f6565b826001600160a01b0316826001600160a01b03161461052f5761052f82826116a5565b60608161147f5750506040805180820190915260018152600360fc1b602082015290565b8160005b81156114a9578061149381611c58565b91506114a29050600a83611c89565b9150611483565b60008167ffffffffffffffff8111156114c4576114c4611912565b6040519080825280601f01601f1916602001820160405280156114ee576020820181803683370190505b5090505b8415610afc57611503600183611b4e565b9150611510600a86611c9d565b61151b906030611b65565b60f81b81838151811061153057611530611b22565b60200101906001600160f81b031916908160001a905350611552600a86611c89565b94506114f2565b6000600161156684610720565b6115709190611b4e565b6000838152600760205260409020549091508082146115c3576001600160a01b03841660009081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b5060009182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b60085460009061160890600190611b4e565b6000838152600960205260408120546008805493945090928490811061163057611630611b22565b90600052602060002001549050806008838154811061165157611651611b22565b600091825260208083209091019290925582815260099091526040808220849055858252812055600880548061168957611689611cb1565b6001900381819060005260206000200160009055905550505050565b60006116b083610720565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b8280546116f590611a96565b90600052602060002090601f016020900481019282611717576000855561175d565b82601f1061173057805160ff191683800117855561175d565b8280016001018555821561175d579182015b8281111561175d578251825591602001919060010190611742565b5061176992915061176d565b5090565b5b80821115611769576000815560010161176e565b6001600160e01b03198116811461096757600080fd5b6000602082840312156117aa57600080fd5b813561139c81611782565b60005b838110156117d05781810151838201526020016117b8565b8381111561085d5750506000910152565b600081518084526117f98160208601602086016117b5565b601f01601f19169290920160200192915050565b60208152600061139c60208301846117e1565b60006020828403121561183257600080fd5b5035919050565b80356001600160a01b038116811461185057600080fd5b919050565b6000806040838503121561186857600080fd5b61187183611839565b946020939093013593505050565b60008060006060848603121561189457600080fd5b61189d84611839565b92506118ab60208501611839565b9150604084013590509250925092565b6000602082840312156118cd57600080fd5b61139c82611839565b600080604083850312156118e957600080fd5b6118f283611839565b91506020830135801515811461190757600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561194357611943611912565b604051601f8501601f19908116603f0116810190828211818310171561196b5761196b611912565b8160405280935085815286868601111561198457600080fd5b858560208301376000602087830101525050509392505050565b600080600080608085870312156119b457600080fd5b6119bd85611839565b93506119cb60208601611839565b925060408501359150606085013567ffffffffffffffff8111156119ee57600080fd5b8501601f810187136119ff57600080fd5b611a0e87823560208401611928565b91505092959194509250565b600060208284031215611a2c57600080fd5b813567ffffffffffffffff811115611a4357600080fd5b8201601f81018413611a5457600080fd5b610afc84823560208401611928565b60008060408385031215611a7657600080fd5b611a7f83611839565b9150611a8d60208401611839565b90509250929050565b600181811c90821680611aaa57607f821691505b60208210811415611acb57634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600082821015611b6057611b60611b38565b500390565b60008219821115611b7857611b78611b38565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60008351611be18184602088016117b5565b835190830190611bf58183602088016117b5565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611c31908301846117e1565b9695505050505050565b600060208284031215611c4d57600080fd5b815161139c81611782565b6000600019821415611c6c57611c6c611b38565b5060010190565b634e487b7160e01b600052601260045260246000fd5b600082611c9857611c98611c73565b500490565b600082611cac57611cac611c73565b500690565b634e487b7160e01b600052603160045260246000fdfea264697066735822122072595a99a1dde2f6e530819a6f05e34f37eb49300c901ec905d464eaf9b7886564736f6c634300080c0033";

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
