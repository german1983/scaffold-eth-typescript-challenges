pragma solidity ^0.8.12;
//SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

/**
 * For users that don't have any NFT to associate to the container
 * or simple because they want some new NFT, we'll have a mintable NFT available
 */
/** THIS IS JUST A BASIC IMPLEMENTATION USING SCAFFOLD-ETH Examples */
contract TamaFriend is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721('TamaFriend', 'TNFT') {}

  function _baseURI() internal view virtual override returns (string memory) {
    return 'bafybeide66xdnusugxp3y6majfxb5ggiczveamy7et3gp4er3feb5wvkny/metadata/';
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal override(ERC721, ERC721Enumerable) {
    super._beforeTokenTransfer(from, to, tokenId);
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    return super.tokenURI(tokenId);
  }

  function mintItem(string memory tokenURIAssigned) public returns (uint256) {
    _tokenIds.increment();

    uint256 id = _tokenIds.current();
    _mint(msg.sender, id);

    return id;
  }
}
