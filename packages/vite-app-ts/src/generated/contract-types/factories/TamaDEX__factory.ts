/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TamaDEX, TamaDEXInterface } from "../TamaDEX";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "token_addr",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "ethToToken",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "eth",
        type: "uint256",
      },
    ],
    name: "ethToTokenPrice",
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
    inputs: [],
    name: "getBalance",
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
        name: "tokens",
        type: "uint256",
      },
    ],
    name: "init",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "liquidity",
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
        name: "tokens",
        type: "uint256",
      },
    ],
    name: "tokenToEth",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
    ],
    name: "tokenToEthPrice",
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
    inputs: [],
    name: "totalLiquidity",
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
        name: "liq_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610c19380380610c1983398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b610b86806100936000396000f3fe6080604052600436106100915760003560e01c806370b2a30f1161005957806370b2a30f14610143578063789770f414610163578063b7b0422d1461016b578063b8c876b11461017e578063d0e30db0146101ab57600080fd5b806312065fe01461009657806315770f92146100b85780632e1a7d4d146100ce57806336a97b42146101035780636f7b753e14610123575b600080fd5b3480156100a257600080fd5b50475b6040519081526020015b60405180910390f35b3480156100c457600080fd5b506100a560015481565b3480156100da57600080fd5b506100ee6100e9366004610a46565b6101b3565b604080519283526020830191909152016100af565b34801561010f57600080fd5b506100a561011e366004610a46565b6103c2565b34801561012f57600080fd5b506100a561013e366004610a46565b610441565b34801561014f57600080fd5b506100a561015e366004610a46565b6104c2565b6100a5610660565b6100a5610179366004610a46565b610764565b34801561018a57600080fd5b506100a5610199366004610a5f565b60026020526000908152604090205481565b6100a5610869565b600080546040516370a0823160e01b8152306004820152829182916001600160a01b03909116906370a0823190602401602060405180830381865afa158015610200573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102249190610a8f565b9050600060015447866102379190610abe565b6102419190610add565b9050600060015483876102549190610abe565b61025e9190610add565b33600090815260026020526040812080549293508892909190610282908490610aff565b92505081905550856001600082825461029b9190610aff565b9091555050604051600090339084908381818185875af1925050503d80600081146102e2576040519150601f19603f3d011682016040523d82523d6000602084013e6102e7565b606091505b50509050806103385760405162461bcd60e51b81526020600482015260186024820152772330b4b632b2103a379039b2b732103ab9b2b91032ba341760411b60448201526064015b60405180910390fd5b60005460405163a9059cbb60e01b8152336004820152602481018490526001600160a01b039091169063a9059cbb906044016020604051808303816000875af1158015610389573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ad9190610b16565b6103b657600080fd5b50909590945092505050565b600080546040516370a0823160e01b815230600482015261043b9184916001600160a01b03909116906370a0823190602401602060405180830381865afa158015610411573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104359190610a8f565b476109f7565b92915050565b600061043b826104518147610aff565b6000546040516370a0823160e01b81523060048201526001600160a01b03909116906370a0823190602401602060405180830381865afa158015610499573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104bd9190610a8f565b6109f7565b600080546040516370a0823160e01b815230600482015282916001600160a01b0316906370a0823190602401602060405180830381865afa15801561050b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061052f9190610a8f565b9050600061053e8483476109f7565b604051909150600090339083908381818185875af1925050503d8060008114610583576040519150601f19603f3d011682016040523d82523d6000602084013e610588565b606091505b50509050806105d45760405162461bcd60e51b81526020600482015260186024820152772330b4b632b2103a379039b2b732103ab9b2b91032ba341760411b604482015260640161032f565b6000546040516323b872dd60e01b8152336004820152306024820152604481018790526001600160a01b03909116906323b872dd906064016020604051808303816000875af115801561062b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061064f9190610b16565b61065857600080fd5b509392505050565b600080546040516370a0823160e01b815230600482015282916001600160a01b0316906370a0823190602401602060405180830381865afa1580156106a9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106cd9190610a8f565b905060006106e5346106df8147610aff565b846109f7565b60005460405163a9059cbb60e01b8152336004820152602481018390529192506001600160a01b03169063a9059cbb906044016020604051808303816000875af1158015610737573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061075b9190610b16565b61043b57600080fd5b60006001546000146107c45760405162461bcd60e51b8152602060048201526024808201527f54616d614445583a696e6974202d20616c726561647920686173206c697175696044820152636469747960e01b606482015260840161032f565b47600181905533600081815260026020526040808220939093555491516323b872dd60e01b81526004810191909152306024820152604481018490526001600160a01b03909116906323b872dd906064016020604051808303816000875af1158015610834573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108589190610b16565b61086157600080fd5b505060015490565b6000806108763447610aff565b600080546040516370a0823160e01b815230600482015292935090916001600160a01b03909116906370a0823190602401602060405180830381865afa1580156108c4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108e89190610a8f565b90506000826108f78334610abe565b6109019190610add565b61090c906001610b38565b90506000836001543461091f9190610abe565b6109299190610add565b3360009081526002602052604081208054929350839290919061094d908490610b38565b9250508190555080600160008282546109669190610b38565b90915550506000546040516323b872dd60e01b8152336004820152306024820152604481018490526001600160a01b03909116906323b872dd906064016020604051808303816000875af11580156109c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109e69190610b16565b6109ef57600080fd5b949350505050565b600080610a06856103e5610abe565b90506000610a148483610abe565b9050600082610a25876103e8610abe565b610a2f9190610b38565b9050610a3b8183610add565b979650505050505050565b600060208284031215610a5857600080fd5b5035919050565b600060208284031215610a7157600080fd5b81356001600160a01b0381168114610a8857600080fd5b9392505050565b600060208284031215610aa157600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b6000816000190483118215151615610ad857610ad8610aa8565b500290565b600082610afa57634e487b7160e01b600052601260045260246000fd5b500490565b600082821015610b1157610b11610aa8565b500390565b600060208284031215610b2857600080fd5b81518015158114610a8857600080fd5b60008219821115610b4b57610b4b610aa8565b50019056fea264697066735822122021eac1957b5f7a6fd98698454ab696bc821febcad88a0ac5c07d9b5e196dd2b664736f6c634300080c0033";

export class TamaDEX__factory extends ContractFactory {
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
    token_addr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TamaDEX> {
    return super.deploy(token_addr, overrides || {}) as Promise<TamaDEX>;
  }
  getDeployTransaction(
    token_addr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(token_addr, overrides || {});
  }
  attach(address: string): TamaDEX {
    return super.attach(address) as TamaDEX;
  }
  connect(signer: Signer): TamaDEX__factory {
    return super.connect(signer) as TamaDEX__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TamaDEXInterface {
    return new utils.Interface(_abi) as TamaDEXInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TamaDEX {
    return new Contract(address, _abi, signerOrProvider) as TamaDEX;
  }
}
