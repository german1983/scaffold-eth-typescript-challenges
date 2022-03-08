/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TamaContainer, TamaContainerInterface } from "../TamaContainer";

const _abi = [
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
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
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
  "0x60806040523480156200001157600080fd5b50604080518082018252600d81526c2a30b6b0a1b7b73a30b4b732b960991b60208083019182528351808501909452600484526354414d4360e01b9084015281519192916200006391600091620000f2565b50805162000079906001906020840190620000f2565b50505062000096620000906200009c60201b60201c565b620000a0565b620001d5565b3390565b600b80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b828054620001009062000198565b90600052602060002090601f0160209004810192826200012457600085556200016f565b82601f106200013f57805160ff19168380011785556200016f565b828001600101855582156200016f579182015b828111156200016f57825182559160200191906001019062000152565b506200017d92915062000181565b5090565b5b808211156200017d576000815560010162000182565b600181811c90821680620001ad57607f821691505b60208210811415620001cf57634e487b7160e01b600052602260045260246000fd5b50919050565b611ee980620001e56000396000f3fe608060405234801561001057600080fd5b50600436106101425760003560e01c8063715018a6116100b8578063bc197c811161007c578063bc197c811461028f578063c7545849146102c4578063c87b56dd146102d7578063e985e9c5146102ea578063f23a6e6114610326578063f2fde38b1461034057600080fd5b8063715018a6146102485780638da5cb5b1461025057806395d89b4114610261578063a22cb46514610269578063b88d4fde1461027c57600080fd5b806323b872dd1161010a57806323b872dd146101d65780632f745c59146101e957806342842e0e146101fc5780634f6ccce71461020f5780636352211e1461022257806370a082311461023557600080fd5b806301ffc9a71461014757806306fdde031461016f578063081812fc14610184578063095ea7b3146101af57806318160ddd146101c4575b600080fd5b61015a6101553660046117c3565b610353565b60405190151581526020015b60405180910390f35b610177610364565b6040516101669190611838565b61019761019236600461184b565b6103f6565b6040516001600160a01b039091168152602001610166565b6101c26101bd366004611880565b610483565b005b6008545b604051908152602001610166565b6101c26101e43660046118aa565b610599565b6101c86101f7366004611880565b6105ca565b6101c261020a3660046118aa565b610660565b6101c861021d36600461184b565b61067b565b61019761023036600461184b565b61070e565b6101c86102433660046118e6565b610785565b6101c261080c565b600b546001600160a01b0316610197565b610177610872565b6101c2610277366004611901565b610881565b6101c261028a3660046119c9565b610890565b6102ab61029d366004611ad3565b600098975050505050505050565b6040516001600160e01b03199091168152602001610166565b6101c86102d2366004611b8e565b6108c8565b6101776102e536600461184b565b6108f9565b61015a6102f8366004611bd7565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6102ab610334366004611c0a565b60009695505050505050565b6101c261034e3660046118e6565b610904565b600061035e826109cf565b92915050565b60606000805461037390611c82565b80601f016020809104026020016040519081016040528092919081815260200182805461039f90611c82565b80156103ec5780601f106103c1576101008083540402835291602001916103ec565b820191906000526020600020905b8154815290600101906020018083116103cf57829003601f168201915b5050505050905090565b6000610401826109f4565b6104675760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061048e8261070e565b9050806001600160a01b0316836001600160a01b031614156104fc5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b606482015260840161045e565b336001600160a01b0382161480610518575061051881336102f8565b61058a5760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000606482015260840161045e565b6105948383610a11565b505050565b6105a33382610a7f565b6105bf5760405162461bcd60e51b815260040161045e90611cbd565b610594838383610b69565b60006105d583610785565b82106106375760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b606482015260840161045e565b506001600160a01b03919091166000908152600660209081526040808320938352929052205490565b61059483838360405180602001604052806000815250610890565b600061068660085490565b82106106e95760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b606482015260840161045e565b600882815481106106fc576106fc611d0e565b90600052602060002001549050919050565b6000818152600260205260408120546001600160a01b03168061035e5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b606482015260840161045e565b60006001600160a01b0382166107f05760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b606482015260840161045e565b506001600160a01b031660009081526003602052604090205490565b600b546001600160a01b031633146108665760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161045e565b6108706000610d10565b565b60606001805461037390611c82565b61088c338383610d62565b5050565b61089a3383610a7f565b6108b65760405162461bcd60e51b815260040161045e90611cbd565b6108c284848484610e31565b50505050565b60006108d8600c80546001019055565b60006108e3600c5490565b90506108ef3382610e64565b61035e8184610fa3565b606061035e8261102e565b600b546001600160a01b0316331461095e5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161045e565b6001600160a01b0381166109c35760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161045e565b6109cc81610d10565b50565b60006001600160e01b0319821663780e9d6360e01b148061035e575061035e8261119d565b6000908152600260205260409020546001600160a01b0316151590565b600081815260046020526040902080546001600160a01b0319166001600160a01b0384169081179091558190610a468261070e565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000610a8a826109f4565b610aeb5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b606482015260840161045e565b6000610af68361070e565b9050806001600160a01b0316846001600160a01b03161480610b315750836001600160a01b0316610b26846103f6565b6001600160a01b0316145b80610b6157506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316610b7c8261070e565b6001600160a01b031614610be05760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b606482015260840161045e565b6001600160a01b038216610c425760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161045e565b610c4d8383836111ed565b610c58600082610a11565b6001600160a01b0383166000908152600360205260408120805460019290610c81908490611d3a565b90915550506001600160a01b0382166000908152600360205260408120805460019290610caf908490611d51565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600b80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b03161415610dc45760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161045e565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610e3c848484610b69565b610e48848484846111f8565b6108c25760405162461bcd60e51b815260040161045e90611d69565b6001600160a01b038216610eba5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161045e565b610ec3816109f4565b15610f105760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161045e565b610f1c600083836111ed565b6001600160a01b0382166000908152600360205260408120805460019290610f45908490611d51565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b610fac826109f4565b61100f5760405162461bcd60e51b815260206004820152602e60248201527f45524337323155524953746f726167653a2055524920736574206f66206e6f6e60448201526d32bc34b9ba32b73a103a37b5b2b760911b606482015260840161045e565b6000828152600a60209081526040909120825161059492840190611714565b6060611039826109f4565b61109f5760405162461bcd60e51b815260206004820152603160248201527f45524337323155524953746f726167653a2055524920717565727920666f72206044820152703737b732bc34b9ba32b73a103a37b5b2b760791b606482015260840161045e565b6000828152600a6020526040812080546110b890611c82565b80601f01602080910402602001604051908101604052809291908181526020018280546110e490611c82565b80156111315780601f1061110657610100808354040283529160200191611131565b820191906000526020600020905b81548152906001019060200180831161111457829003601f168201915b50505050509050600061114f60408051602081019091526000815290565b9050805160001415611162575092915050565b81511561119457808260405160200161117c929190611dbb565b60405160208183030381529060405292505050919050565b610b61846112f6565b60006001600160e01b031982166380ac58cd60e01b14806111ce57506001600160e01b03198216635b5e139f60e01b145b8061035e57506301ffc9a760e01b6001600160e01b031983161461035e565b6105948383836113ce565b60006001600160a01b0384163b156112eb57604051630a85bd0160e11b81526001600160a01b0385169063150b7a029061123c903390899088908890600401611dea565b6020604051808303816000875af1925050508015611277575060408051601f3d908101601f1916820190925261127491810190611e27565b60015b6112d1573d8080156112a5576040519150601f19603f3d011682016040523d82523d6000602084013e6112aa565b606091505b5080516112c95760405162461bcd60e51b815260040161045e90611d69565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610b61565b506001949350505050565b6060611301826109f4565b6113655760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b606482015260840161045e565b600061137c60408051602081019091526000815290565b9050600081511161139c57604051806020016040528060008152506113c7565b806113a684611486565b6040516020016113b7929190611dbb565b6040516020818303038152906040525b9392505050565b6001600160a01b0383166114295761142481600880546000838152600960205260408120829055600182018355919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee30155565b61144c565b816001600160a01b0316836001600160a01b03161461144c5761144c8382611584565b6001600160a01b0382166114635761059481611621565b826001600160a01b0316826001600160a01b0316146105945761059482826116d0565b6060816114aa5750506040805180820190915260018152600360fc1b602082015290565b8160005b81156114d457806114be81611e44565b91506114cd9050600a83611e75565b91506114ae565b60008167ffffffffffffffff8111156114ef576114ef61193d565b6040519080825280601f01601f191660200182016040528015611519576020820181803683370190505b5090505b8415610b615761152e600183611d3a565b915061153b600a86611e89565b611546906030611d51565b60f81b81838151811061155b5761155b611d0e565b60200101906001600160f81b031916908160001a90535061157d600a86611e75565b945061151d565b6000600161159184610785565b61159b9190611d3a565b6000838152600760205260409020549091508082146115ee576001600160a01b03841660009081526006602090815260408083208584528252808320548484528184208190558352600790915290208190555b5060009182526007602090815260408084208490556001600160a01b039094168352600681528383209183525290812055565b60085460009061163390600190611d3a565b6000838152600960205260408120546008805493945090928490811061165b5761165b611d0e565b90600052602060002001549050806008838154811061167c5761167c611d0e565b60009182526020808320909101929092558281526009909152604080822084905585825281205560088054806116b4576116b4611e9d565b6001900381819060005260206000200160009055905550505050565b60006116db83610785565b6001600160a01b039093166000908152600660209081526040808320868452825280832085905593825260079052919091209190915550565b82805461172090611c82565b90600052602060002090601f0160209004810192826117425760008555611788565b82601f1061175b57805160ff1916838001178555611788565b82800160010185558215611788579182015b8281111561178857825182559160200191906001019061176d565b50611794929150611798565b5090565b5b808211156117945760008155600101611799565b6001600160e01b0319811681146109cc57600080fd5b6000602082840312156117d557600080fd5b81356113c7816117ad565b60005b838110156117fb5781810151838201526020016117e3565b838111156108c25750506000910152565b600081518084526118248160208601602086016117e0565b601f01601f19169290920160200192915050565b6020815260006113c7602083018461180c565b60006020828403121561185d57600080fd5b5035919050565b80356001600160a01b038116811461187b57600080fd5b919050565b6000806040838503121561189357600080fd5b61189c83611864565b946020939093013593505050565b6000806000606084860312156118bf57600080fd5b6118c884611864565b92506118d660208501611864565b9150604084013590509250925092565b6000602082840312156118f857600080fd5b6113c782611864565b6000806040838503121561191457600080fd5b61191d83611864565b91506020830135801515811461193257600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff8084111561196e5761196e61193d565b604051601f8501601f19908116603f011681019082821181831017156119965761199661193d565b816040528093508581528686860111156119af57600080fd5b858560208301376000602087830101525050509392505050565b600080600080608085870312156119df57600080fd5b6119e885611864565b93506119f660208601611864565b925060408501359150606085013567ffffffffffffffff811115611a1957600080fd5b8501601f81018713611a2a57600080fd5b611a3987823560208401611953565b91505092959194509250565b60008083601f840112611a5757600080fd5b50813567ffffffffffffffff811115611a6f57600080fd5b6020830191508360208260051b8501011115611a8a57600080fd5b9250929050565b60008083601f840112611aa357600080fd5b50813567ffffffffffffffff811115611abb57600080fd5b602083019150836020828501011115611a8a57600080fd5b60008060008060008060008060a0898b031215611aef57600080fd5b611af889611864565b9750611b0660208a01611864565b9650604089013567ffffffffffffffff80821115611b2357600080fd5b611b2f8c838d01611a45565b909850965060608b0135915080821115611b4857600080fd5b611b548c838d01611a45565b909650945060808b0135915080821115611b6d57600080fd5b50611b7a8b828c01611a91565b999c989b5096995094979396929594505050565b600060208284031215611ba057600080fd5b813567ffffffffffffffff811115611bb757600080fd5b8201601f81018413611bc857600080fd5b610b6184823560208401611953565b60008060408385031215611bea57600080fd5b611bf383611864565b9150611c0160208401611864565b90509250929050565b60008060008060008060a08789031215611c2357600080fd5b611c2c87611864565b9550611c3a60208801611864565b94506040870135935060608701359250608087013567ffffffffffffffff811115611c6457600080fd5b611c7089828a01611a91565b979a9699509497509295939492505050565b600181811c90821680611c9657607f821691505b60208210811415611cb757634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600082821015611d4c57611d4c611d24565b500390565b60008219821115611d6457611d64611d24565b500190565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60008351611dcd8184602088016117e0565b835190830190611de18183602088016117e0565b01949350505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611e1d9083018461180c565b9695505050505050565b600060208284031215611e3957600080fd5b81516113c7816117ad565b6000600019821415611e5857611e58611d24565b5060010190565b634e487b7160e01b600052601260045260246000fd5b600082611e8457611e84611e5f565b500490565b600082611e9857611e98611e5f565b500690565b634e487b7160e01b600052603160045260246000fdfea264697066735822122009f3ae84669ddc05c731ea2256098081b53897e53f5a344cdb80ecc89691b49264736f6c634300080c0033";

export class TamaContainer__factory extends ContractFactory {
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
  ): Promise<TamaContainer> {
    return super.deploy(overrides || {}) as Promise<TamaContainer>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TamaContainer {
    return super.attach(address) as TamaContainer;
  }
  connect(signer: Signer): TamaContainer__factory {
    return super.connect(signer) as TamaContainer__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TamaContainerInterface {
    return new utils.Interface(_abi) as TamaContainerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TamaContainer {
    return new Contract(address, _abi, signerOrProvider) as TamaContainer;
  }
}
