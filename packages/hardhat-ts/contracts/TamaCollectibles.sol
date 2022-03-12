pragma solidity ^0.8.12;
//SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

/**
 * The Tama Collectibles will be the game items players can buy to compose to their Tama Container and build unique experiences
 */
contract TamaCollectibles is ERC1155, Ownable {
  uint256 public constant BANANA = 0;
  uint256 public constant APPLE = 1;
  uint256 public constant THORS_HAMMER = 2;
  uint256 public constant SWORD = 3;
  uint256 public constant SHIELD = 4;
  bool private _isInit;

  constructor() ERC1155('bafybeiedhvz64z2pwcoxcckph6y5323nxfudzqnbqg5ml5kkqunm3qrl24/metadata/') {}

  function init(address vendor) public onlyOwner {
    require(!_isInit, 'TamaCollectibles: init - already in initialized');
    _isInit = true;
    _mint(vendor, BANANA, 10**27, '');
    _mint(vendor, APPLE, 10**18, '');
    _mint(vendor, THORS_HAMMER, 1, '');
    _mint(vendor, SWORD, 10**9, '');
    _mint(vendor, SHIELD, 10**9, '');
  }
}
