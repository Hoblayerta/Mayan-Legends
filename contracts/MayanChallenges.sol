// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./MayanNFT.sol"; // Importa el contrato MayanNFT

contract MayanChallenges {
    MayanNFT public nftContract; // Usa el contrato MayanNFT
    mapping(uint256 => address) public staker;

    constructor(MayanNFT _nftContract) {
        nftContract = _nftContract;
    }

    function participateInChallenge(uint256 _tokenId) external {
        require(nftContract.ownerOf(_tokenId) == msg.sender, "Not the owner");
        // Lógica para participar en el desafío
        staker[_tokenId] = msg.sender;
    }

    // Puedes añadir más funciones para manejar los desafíos y misiones
}
