pragma solidity ^0.8.12;
//SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
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

    struct AssignedTamaFriend{
    uint256 blockadded;
    address contractAddress; //contract of the erc721
    uint256 tokenId; //token id of nft at addr
    uint8 scale;

   
  }

  mapping(uint256 => AssignedTamaFriend[]) public TamacharacterId;



  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;




  function transferNFT(address contractAddress, uint256 tokenId, uint256 tankId, uint8 scale) external {
    ERC721 nft = ERC721(contractAddress);
    require(_isApprovedOrOwner(_msgSender(), tankId), "you need to own the tank");
    require(contractAddress != address(this), "nice try!");
    require(TamacharacterId[tankId].length < 2, "tank has reached the max limit of 1 components");

    nft.transferFrom(_msgSender(), address(this), tokenId);
    require(nft.ownerOf(tokenId) == address(this), "NFT not transferred");

    bytes32 randish = keccak256(abi.encodePacked( blockhash(block.number-1), _msgSender(), address(this), tokenId, tankId  ));
    TamacharacterId[tankId].push(AssignedTamaFriend(
      block.number,
      contractAddress,
      tokenId,


      scale));
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
  ) external returns (bytes4) {}

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
