pragma solidity ^0.8.12;
//SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

/**
 * The Tama Collectibles will be the game items players can buy to compose to their Tama Container and build unique experiences
 */
contract TamaCollectibles is ERC1155 {
  uint256 public constant BANANA = 0;
  uint256 public constant APPLE = 1;
  uint256 public constant THORS_HAMMER = 2;
  uint256 public constant SWORD = 3;
  uint256 public constant SHIELD = 4;

  constructor() ERC1155('bafybeiffgg5zmmhgfjvcyg4i4rtbbgupexlcip4zfobg44zboe2wwslf3m/metadata/') {
    _mint(msg.sender, BANANA, 10**27, '');
    _mint(msg.sender, APPLE, 10**18, '');
    _mint(msg.sender, THORS_HAMMER, 1, '');
    _mint(msg.sender, SWORD, 10**9, '');
    _mint(msg.sender, SHIELD, 10**9, '');
  }
}
