pragma solidity ^0.8.12;
// SPDX-License-Identifier: MIT
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol';

/**
 * The TamaDEX will allow users to buy buy/sell TAMA tokens with/for ETH
 */
contract TamaCollectiblesVendor is IERC1155Receiver, Ownable {
  IERC1155 token;
  IERC20 tokenTama;
  bool private _isInit;
  mapping(uint256 => uint256) public prices;

  /*
   * For liquidity curve we can do prices[tokensToTransfer[i]] * quantities[i]
   * and that's gonna be the 2nd term in the equation
   */

  constructor(address token_addr, address token_tama_addr) {
    token = IERC1155(token_addr);
    tokenTama = IERC20(token_tama_addr);
  }

  function init() public payable returns (uint256[] memory) {
    require(!_isInit, 'TamaCollectiblesVendor:init - already has liquidity');
    _isInit = true;

    uint256[] memory initial_tokens_ids = new uint256[](2);
    initial_tokens_ids[0] = 0;
    initial_tokens_ids[1] = 1;

    uint256[] memory initial_tokens = new uint256[](2);
    initial_tokens[0] = 10**27;
    initial_tokens[1] = 10**18;
    token.safeBatchTransferFrom(msg.sender, address(this), initial_tokens_ids, initial_tokens, msg.data);

    return initial_tokens;
  }

  /*
   * TODO: This will have to be secured properly
   */
  function setPrices(uint256[] memory tokensToUpdate, uint256[] memory newPrices) public {
    uint256 tokensToUpdateLength = tokensToUpdate.length;
    uint256 newPricesLength = newPrices.length;
    require(tokensToUpdateLength == newPricesLength, 'TamaCollectibleVendor: setPrices - same amount of tokens to update and new prices are required');

    for (uint256 i = 0; i < tokensToUpdate.length; i++) {
      prices[i] = newPrices[i];
    }
  }

  function buyToken(uint256[] memory tokensToTransfer, uint256[] memory quantities) public {
    uint256 tokensToTransferLength = tokensToTransfer.length;
    uint256 quantitiesLength = quantities.length;
    require(tokensToTransferLength == quantitiesLength, 'TamaCollectibleVendor: buyToken - same amount of tokens to update and new prices are required');

    uint256 totalCost = prices[tokensToTransfer[0]] * quantities[0];
    for (uint256 i = 1; i < tokensToTransferLength; i++) {
      totalCost += prices[tokensToTransfer[i]] * quantities[i];
    }

    // check amount of TAMA
    uint256 tamaBalance = tokenTama.balanceOf(msg.sender);
    require(tamaBalance > totalCost, 'TamaConnectiblesVendor - buyToken: Not enough TAMA in wallet');

    uint256 vendorAllowance = tokenTama.allowance(msg.sender, address(this));
    require(vendorAllowance > totalCost, 'TamaConnectiblesVendor - buyToken: Not enough allowance on ERC 20 contract');

    token.safeBatchTransferFrom(address(this), msg.sender, tokensToTransfer, quantities, msg.data);
  }

  // function ethToToken() public payable returns (uint256) {
  //   uint256 token_reserve = token.balanceOf(address(this));
  //   uint256 tokens_bought = price(msg.value, address(this).balance - msg.value, token_reserve);
  //   require(token.transfer(msg.sender, tokens_bought));
  //   return tokens_bought;
  // }

  // function tokenToEth(uint256 tokens) public returns (uint256) {
  //   uint256 token_reserve = token.balanceOf(address(this));
  //   uint256 eth_bought = price(tokens, token_reserve, address(this).balance);
  //   (bool sent, ) = msg.sender.call{value: eth_bought}('');
  //   require(sent, 'Failed to send user eth.');
  //   require(token.transferFrom(msg.sender, address(this), tokens));
  //   return eth_bought;
  // }

  // function deposit() public payable returns (uint256) {
  //   uint256 eth_reserve = address(this).balance - msg.value;
  //   uint256 token_reserve = token.balanceOf(address(this));
  //   uint256 token_amount = ((msg.value * token_reserve) / eth_reserve) + 1;
  //   uint256 liquidity_minted = (msg.value * totalLiquidity) / eth_reserve;
  //   liquidity[msg.sender] += liquidity_minted;
  //   totalLiquidity += liquidity_minted;
  //   require(token.transferFrom(msg.sender, address(this), token_amount));
  //   return liquidity_minted;
  // }

  // function withdraw(uint256 liq_amount) public returns (uint256, uint256) {
  //   uint256 token_reserve = token.balanceOf(address(this));
  //   uint256 eth_amount = (liq_amount * address(this).balance) / totalLiquidity;
  //   uint256 token_amount = (liq_amount * token_reserve) / totalLiquidity;
  //   liquidity[msg.sender] -= liq_amount;
  //   totalLiquidity -= liq_amount;
  //   (bool sent, ) = msg.sender.call{value: eth_amount}('');
  //   require(sent, 'Failed to send user eth.');
  //   require(token.transfer(msg.sender, token_amount));
  //   return (eth_amount, token_amount);
  // }

  // function ethToTokenPrice(uint256 eth) public view returns (uint256) {
  //   return price(eth, address(this).balance - eth, token.balanceOf(address(this)));
  // }

  // function tokenToEthPrice(uint256 tokens) public view returns (uint256) {
  //   return price(tokens, token.balanceOf(address(this)), address(this).balance);
  // }

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function price(
    uint256 input_amount,
    uint256 input_reserve,
    uint256 output_reserve
  ) private pure returns (uint256) {
    uint256 input_amount_with_fee = input_amount * 997;
    uint256 numerator = input_amount_with_fee * output_reserve;
    uint256 denominator = input_reserve * 1000 + input_amount_with_fee;
    return numerator / denominator;
  }

  function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
    return true;
  }

  /**
   * @dev Handles the receipt of a single ERC1155 token type. This function is
   * called at the end of a `safeTransferFrom` after the balance has been updated.
   *
   * NOTE: To accept the transfer, this must return
   * `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`
   * (i.e. 0xf23a6e61, or its own function selector).
   *
   * @param operator The address which initiated the transfer (i.e. msg.sender)
   * @param from The address which previously owned the token
   * @param id The ID of the token being transferred
   * @param value The amount of tokens being transferred
   * @param data Additional data with no specified format
   * @return `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))` if transfer is allowed
   */
  function onERC1155Received(
    address operator,
    address from,
    uint256 id,
    uint256 value,
    bytes calldata data
  ) external returns (bytes4) {
    return bytes4(keccak256('onERC1155Received(address,address,uint256,uint256,bytes)'));
  }

  /**
   * @dev Handles the receipt of a multiple ERC1155 token types. This function
   * is called at the end of a `safeBatchTransferFrom` after the balances have
   * been updated.
   *
   * NOTE: To accept the transfer(s), this must return
   * `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`
   * (i.e. 0xbc197c81, or its own function selector).
   *
   * @param operator The address which initiated the batch transfer (i.e. msg.sender)
   * @param from The address which previously owned the token
   * @param ids An array containing ids of each token being transferred (order and length must match values array)
   * @param values An array containing amounts of each token being transferred (order and length must match ids array)
   * @param data Additional data with no specified format
   * @return `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))` if transfer is allowed
   */
  function onERC1155BatchReceived(
    address operator,
    address from,
    uint256[] calldata ids,
    uint256[] calldata values,
    bytes calldata data
  ) external returns (bytes4) {}
}
