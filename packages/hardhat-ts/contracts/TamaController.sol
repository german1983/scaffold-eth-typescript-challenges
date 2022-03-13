pragma solidity ^0.8.12;
//SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

/**
 * The TAMC ERC721 will be a free-to-mint NFT randomly generated on-chain
 * The container will allow the player to bring any other ERC721 from any of the allowed chains
 * In addition Tama Collectibles can be composed with this NFT to build a unique version of it
 */
/** SHOULD WE CONSIDER USING ERC1155 fot the containers as well? */
/** We might want to take a lok at Covalient API (FREE) or NFT Port to get details from NFTs to be added to the Container */
contract TamaController is ERC721('TamaController', 'TAMC'), ERC721Enumerable, ERC721URIStorage, IERC1155Receiver, Ownable {
  //initializing variables for the death of a tamacharacter!
  IERC1155 consumables;
  address public _consumablesBurnerAddress;

  constructor(address consumablesAddress, address consumablesBurnerAddress) {
    consumables = IERC1155(consumablesAddress);
    _consumablesBurnerAddress = consumablesBurnerAddress;
  }

  uint256 feedingblock;
  uint256 hungryblock;

  uint256 playblock;
  uint256 sleepblock;
  uint256 cleanblock;

 

  struct AssignedTamaFriend {
    string name;
    uint256 blockadded;
    address contractAddress; //contract of the erc721
    uint256 tokenId; //token id of nft at addr    
    uint256 xp;
    uint256 hungry;
    uint256 sleepy;
    uint256 dirty;
    uint256 bored;
    string linkToReturn;
    bool created;    
    uint8 length;
  }

  struct consoleData {
    uint256 tokenId;
    address contractAddress;
  }

  mapping(uint256 => AssignedTamaFriend) public TamacharacterId;
  mapping(uint256 => consoleData) public consoletoData;

  function tamafriendOf(uint256 tokenId) public view returns (AssignedTamaFriend memory) {
    AssignedTamaFriend memory TamacharacterIdInController = TamacharacterId[tokenId];
    // require(AssignedTamaFriend != address(0), "ERC721: owner query for nonexistent token");
    return TamacharacterIdInController;
  }

  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  //functions and getters for creating and feeding a character
  function createChar(
    uint256 tokenId,
    string memory _name,
    address importContract,
    uint256 importId
  ) public returns (string memory) {
    require(TamacharacterId[tokenId].created = !TamacharacterId[tokenId].created, "you've made a character already and named");
    require(TamacharacterId[tokenId].length < 1, 'tank has reached the max limit of 1 components');
    require(ownerOf(tokenId) == _msgSender(), "YOU DON't OWN THIS TANK");

    TamacharacterId[tokenId].name = _name;

    TamacharacterId[tokenId].blockadded = block.number;
    TamacharacterId[tokenId].contractAddress = importContract;
    TamacharacterId[tokenId].tokenId = importId;
    TamacharacterId[tokenId].xp = 0;
    TamacharacterId[tokenId].linkToReturn = ERC721(TamacharacterId[tokenId].contractAddress).tokenURI(TamacharacterId[tokenId].tokenId);
    TamacharacterId[tokenId].created = true;
    TamacharacterId[tokenId].hungry = 0;
    TamacharacterId[tokenId].sleepy = 0;
    TamacharacterId[tokenId].bored = 0;
    TamacharacterId[tokenId].dirty = 0;
    TamacharacterId[tokenId].length += 1;

    return TamacharacterId[tokenId].name;
  }

  function reviveChar (uint256 tokenId) public returns (string memory) {
    require(!getAlive(tokenId), "this character is alive - keep it up!");

    //this should consume tama
  feedingblock=block.number;
  hungryblock=block.number;

  playblock=block.number;
  sleepblock=block.number;
  cleanblock=block.number;

    TamacharacterId[tokenId].hungry = 0;
    TamacharacterId[tokenId].sleepy = 0;
    TamacharacterId[tokenId].bored = 0;
    TamacharacterId[tokenId].dirty = 0;

    return ("your character has been brought back to life! please take better care of your lil buddy.");
  }

  function claimstatus(uint256 tokenId) public view returns (bool) {
    return TamacharacterId[tokenId].created;
  }

  function getName(uint256 tokenId) public view returns (string memory) {
    return TamacharacterId[tokenId].name;
  }

  /**
   * This has to be done by calling the IERC1155 contract once we have our own Interface for it
   */
  function _foodByCollectible(uint256 consumableId) private pure returns (uint8 unitsPerToken) {
    if (consumableId == 0)
      // BANANA
      return 1;
    if (consumableId == 1)
      // APPLE
      return 5;
    return 0; // NO FOOD
  }

    function getAlive(uint256 tokenId) public view returns (bool) {
        return getHunger(tokenId) < 100 && getDirty(tokenId) < 100 &&
            getBored(tokenId) < 100 && getSleepy(tokenId) < 100;
    }

  function feed(
    uint256 tokenId,
    uint256[] memory consumableId,
    uint256[] memory consumableQuantities
  ) public returns (uint256) {
    require(TamacharacterId[tokenId].length > 0, 'you need a character!');
    require(TamacharacterId[tokenId].created, "you don't have a character!");
    require(getAlive(tokenId), "R.I.P. LIL BUDDY PLEASE REFRESH");
    //require(getSleepy(tokenId) < 70, "im too sleepy to eat");
    require(getDirty(tokenId) < 80, "its to dirty to eat in here!");
    require(getBored(tokenId) < 90, "im bored! i dont want to eat");  

    uint256 foodToConsume = 1;
    for (uint256 i = 0; i < consumableId.length; i++) {
      uint256 consumableStock = consumables.balanceOf(msg.sender, consumableId[i]);
      require(consumableStock >= consumableQuantities[i], 'TamaController: feed - Wallet does not have enough stock');

      foodToConsume += _foodByCollectible(consumableId[i]) * consumableQuantities[i];
    }
    foodToConsume -= 1;

    consumables.safeBatchTransferFrom(msg.sender, _consumablesBurnerAddress, consumableId, consumableQuantities, msg.data);

    feedingblock = block.number;
    hungryblock = feedingblock + foodToConsume * 100;

    TamacharacterId[tokenId].hungry = 0;
    TamacharacterId[tokenId].sleepy += 2;
    TamacharacterId[tokenId].bored += 1;
    TamacharacterId[tokenId].dirty += 3;

    TamacharacterId[tokenId].xp += foodToConsume;
    return TamacharacterId[tokenId].xp;
  }

  function passTime(uint256 tokenId) public returns (uint256) {
    require(TamacharacterId[tokenId].length > 0, 'you need a character!');
    require(getAlive(tokenId), "R.I.P. LIL BUDDY PLEASE REFRESH");
    require(getHunger(tokenId) < 70, "im hungry! i need to eat before I can play");
    require(getSleepy(tokenId) < 80, "im tired, i need a nap before i can play");
    require(getDirty(tokenId) < 90, "im dirty, i can't play like this");
   

    playblock = block.number;

    TamacharacterId[tokenId].hungry += 1;
    TamacharacterId[tokenId].sleepy += 3;
    TamacharacterId[tokenId].bored = 0;
    TamacharacterId[tokenId].dirty += 2;

    return (TamacharacterId[tokenId].hungry);
  }

  function sleep(uint256 tokenId) public returns (uint256) {
    require(getAlive(tokenId), "R.I.P. LIL BUDDY PLEASE REFRESH");
    //require(getHunger(tokenId) < 70, "im hungry! feed me then i can sleep");
  
    require(getDirty(tokenId) < 90, "im dirty! i need to clean up before hopping into bed!");
    require(getBored(tokenId) < 80, "im feeling restless! lets play before i sleep");

  sleepblock = block.number;

    TamacharacterId[tokenId].hungry += 1;
    TamacharacterId[tokenId].sleepy = 0;
    TamacharacterId[tokenId].bored += 3;
    TamacharacterId[tokenId].dirty += 2;
  }

  function clean(uint256 tokenId) public returns(uint256) {
  require(getAlive(tokenId), "R.I.P. LIL BUDDY PLEASE REFRESH");
  //require(getHunger(tokenId) < 70, "id like to eat before i shower!");
  require(getSleepy(tokenId) < 90, "i am so tired, can we sleep before showering?");
  require(getBored(tokenId) < 80, "i want to play before i shower!");

  cleanblock = block.number;

    TamacharacterId[tokenId].hungry = 0;
    TamacharacterId[tokenId].sleepy += 2;
    TamacharacterId[tokenId].bored += 1;
    TamacharacterId[tokenId].dirty += 3;
  }


  function getfeednumber() public view returns (uint256) {
    return feedingblock;
  }

  function getBlocknumber() public view returns (uint256) {
    return block.number;
  }

  function getXP(uint256 tokenId) public view returns (uint256) {
    return TamacharacterId[tokenId].xp;
  }

  function getHunger(uint256 tokenId) public view returns (uint256) {
    if (block.number < hungryblock)
      // We are not hungry yet
      return 0;
    return TamacharacterId[tokenId].hungry + ((block.number - hungryblock)/10) + 1;
  }

  function getSleepy(uint256 tokenId) public view returns(uint256) {
    if (block.number < sleepblock)
    // not tired yet
    return 0;
    return TamacharacterId[tokenId].sleepy + ((block.number - sleepblock)/10) + 1;
  }

    function getBored(uint256 tokenId) public view returns(uint256) {
    if (block.number < playblock)
    // not tired yet
    return 0;
    return TamacharacterId[tokenId].bored + ((block.number - playblock)/10) + 1;
  }

    function getDirty(uint256 tokenId) public view returns(uint256) {
    if (block.number < cleanblock)
    // not tired yet
    return 0;
    return TamacharacterId[tokenId].dirty + ((block.number - cleanblock)/10) + 1;
  }

  function getStatus(uint256 tokenId) public view returns (string memory) {
        uint256 mostNeeded = 0;
        
        string[4] memory goodStatus = [
            "(^.^)",
            ":P",
            ":D",
            "(^<^)"
        ];
        
        string memory status = goodStatus[block.number % 4];
        
        uint256 _hunger = getHunger(tokenId);
        uint256 _dirty = getDirty(tokenId);
        uint256 _bored = getBored(tokenId);
        uint256 _sleepy = getSleepy(tokenId);
        
        if (getAlive(tokenId) == false) {
            return "RIP LIL BUDDY";
        }
        
        if (_hunger > 70 && _hunger > mostNeeded) {
            mostNeeded = _hunger;
            status = "im hungry";
        }
        
        if (_dirty > 70 && _dirty > mostNeeded) {
            mostNeeded = _dirty;
            status = "i need to shower";
        }
        
        if (_bored > 70 && _bored > mostNeeded) {
            mostNeeded = _bored;
            status = "im bored";
        }
        
        if (_sleepy > 70 && _sleepy > mostNeeded) {
            mostNeeded = _sleepy;
            status = "*yawn* im sleepy";
        }
        
        return status;
    }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable, IERC165) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function mintItem(string memory tokenURIAssigned) public returns (uint256) {
    _tokenIds.increment();

    uint256 id = _tokenIds.current();
    _mint(msg.sender, id);
    _setTokenURI(id, tokenURIAssigned);

    return id;
  }

  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function faketokenURI(uint256 tokenId) public view returns (string memory) {
    return TamacharacterId[tokenId].linkToReturn;
  }

  function getAge(uint256 tokenId) public view returns (uint256) {
    return (block.number - TamacharacterId[tokenId].blockadded);
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
    // We can update our stock !!
    // IERC1155 collectiblesContract = new IERC1155(from);
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
