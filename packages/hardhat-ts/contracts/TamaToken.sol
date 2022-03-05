pragma solidity ^0.8.12;
//SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

/**
 * The TAMA Token will be the Utility token to play the game
 * An initial 1000 ether will be minted on creation to make sure it's enough for the needs of the game at a very low price
 */
contract TamaToken is ERC20 {
  constructor() ERC20('TamaCoin', 'TAMA') {
    _mint(msg.sender, 1000 ether);
  }
}
