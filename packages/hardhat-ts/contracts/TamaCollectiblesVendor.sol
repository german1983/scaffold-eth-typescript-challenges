pragma solidity ^0.8.12;
// SPDX-License-Identifier: MIT
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

/**
 * The TamaDEX will allow users to buy buy/sell TAMA tokens with/for ETH
 */
contract TamaCollectiblesVendor is Ownable {
  IERC1155 token;
  uint256 public totalLiquidity;
  mapping(address => uint256) public liquidity;
  mapping(uint256 => uint256) public prices;

  constructor(address token_addr) {
    token = IERC1155(token_addr);
  }

  function init() public payable returns (uint256[] memory) {
    require(totalLiquidity == 0, 'TamaDEX:init - already has liquidity');

    totalLiquidity = address(this).balance;
    liquidity[msg.sender] = totalLiquidity;

    uint256[] memory initial_tokens_ids = new uint256[](2);
    initial_tokens_ids[0] = 1;
    initial_tokens_ids[1] = 2;

    uint256[] memory initial_tokens = new uint256[](2);
    initial_tokens[0] = 10**27;
    initial_tokens[1] = 10**18;
    token.safeBatchTransferFrom(msg.sender, address(this), initial_tokens_ids, initial_tokens, '');

    return initial_tokens;
  }

  function setPrices(uint256[] memory tokensToUpdate, uint256[] memory newPrices) public onlyOwner {
    uint256 tokensToUpdateLength = tokensToUpdate.length;
    uint256 newPricesLength = newPrices.length;
    require(tokensToUpdateLength == newPricesLength, 'TamaCollectibleVendor: setPrices - same amount of tokens to update and new prices are required');

    for (uint256 i = 0; i < tokensToUpdate.length; i++) {
      prices[i] = newPrices[i];
    }
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
}
