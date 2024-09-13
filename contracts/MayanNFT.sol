// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MayanNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Añadido para llevar el conteo total de NFTs
    Counters.Counter private _totalSupply;

    mapping(uint256 => string) public nftRarities;
    mapping(uint256 => string) public nftAbilities;

    event Minted(uint256 tokenId, string rarity, string ability);

    constructor() ERC721("Mayan NFT", "MNFT") {}

    function _generateRandomRarity() internal view returns (string memory) {
        uint random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 100;
        if (random < 50) return "Common";
        else if (random < 80) return "Rare";
        else if (random < 95) return "Legendary";
        else return "Mythic";
    }

    function _generateRandomAbility(string memory rarity) internal pure returns (string memory) {
        if (keccak256(abi.encodePacked(rarity)) == keccak256(abi.encodePacked("Mythic"))) return "Divine Protection";
        else if (keccak256(abi.encodePacked(rarity)) == keccak256(abi.encodePacked("Legendary"))) return "Ancient Wisdom";
        else if (keccak256(abi.encodePacked(rarity)) == keccak256(abi.encodePacked("Rare"))) return "Mayan Strength";
        return "Basic Ritual";
    }

    function mint() external {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        string memory rarity = _generateRandomRarity();
        string memory ability = _generateRandomAbility(rarity);
        _mint(msg.sender, tokenId);
        nftRarities[tokenId] = rarity;
        nftAbilities[tokenId] = ability;
        emit Minted(tokenId, rarity, ability);

        // Actualiza el conteo total de NFTs
        _totalSupply.increment();
    }

    // Función pública para obtener el total de NFTs minteados
    function totalSupply() external view returns (uint256) {
        return _totalSupply.current();
    }

    // Opcional: Función para obtener un token por índice
    function tokenByIndex(uint256 index) external view returns (uint256) {
        require(index < _totalSupply.current(), "Index out of bounds");
        return index;
    }
}
