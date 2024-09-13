import React, { useState, useEffect } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import { nftAddress, nftABI, challengesAddress, challengesABI } from './constants';

function App() {
    const [account, setAccount] = useState(null);
    const [mintedNFTs, setMintedNFTs] = useState([]);
    const [selectedTokenId, setSelectedTokenId] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (account) {
            fetchMintedNFTs();
        }
    }, [account]);

    async function connectWallet() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                console.log("Wallet connected:", accounts[0]);
            } catch (error) {
                console.error("Error connecting wallet:", error);
            }
        } else {
            alert("Please install MetaMask");
        }
    }

    async function mintNFT() {
        try {
            setLoading(true);
            console.log("Minting NFT...");

            const provider = new Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const nftContract = new Contract(nftAddress, nftABI, signer);

            const tx = await nftContract.mint();
            console.log("Transaction sent:", tx);

            const receipt = await tx.wait();
            console.log("Transaction confirmed:", receipt);

            if (receipt.status === 1) {
                alert("NFT minted successfully!");
                await fetchMintedNFTs();
            } else {
                alert("NFT minting failed!");
            }

        } catch (error) {
            console.error("Error minting NFT:", error);
            alert("Error minting NFT: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    async function fetchMintedNFTs() {
        if (!account) return;

        try {
            setLoading(true);
            const provider = new Web3Provider(window.ethereum);
            const nftContract = new Contract(nftAddress, nftABI, provider);
            const totalSupply = await nftContract.totalSupply();
            const mintedNFTs = [];

            for (let i = 0; i < totalSupply; i++) {
                const tokenId = await nftContract.tokenByIndex(i);
                const tokenURI = await nftContract.tokenURI(tokenId);
                mintedNFTs.push({ tokenId, tokenURI });
            }

            setMintedNFTs(mintedNFTs);
        } catch (error) {
            console.error("Error fetching minted NFTs:", error);
        } finally {
            setLoading(false);
        }
    }

    async function participateInChallenge() {
        if (!selectedTokenId) {
            alert("Please select a token ID to participate in the challenge.");
            return;
        }

        try {
            console.log(`Participating in challenge with token ID: ${selectedTokenId}`);

            const provider = new Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const challengesContract = new Contract(challengesAddress, challengesABI, signer);

            const tx = await challengesContract.participateInChallenge(selectedTokenId);
            console.log("Transaction sent:", tx);

            const receipt = await tx.wait();
            console.log("Transaction confirmed:", receipt);

            alert(`Participated in challenge with token ID: ${selectedTokenId}`);

        } catch (error) {
            console.error("Error participating in challenge:", error);
            alert("Error participating in challenge: " + error.message);
        }
    }

    return (
        <div className="App">
            <h1>Mayan Legends</h1>
            <button onClick={connectWallet}>Connect Wallet</button>
            <button onClick={mintNFT} disabled={loading}>
                {loading ? 'Minting...' : 'Mint NFT'}
            </button>
            <div>
                <h2>Minted NFTs</h2>
                {loading ? <p>Loading...</p> : (
                    <ul>
                        {mintedNFTs.map(nft => (
                            <li key={nft.tokenId}>
                                Token ID: {nft.tokenId} - URI: {nft.tokenURI}
                                <button onClick={() => setSelectedTokenId(nft.tokenId)}>
                                    Select for Challenge
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {selectedTokenId && (
                <div>
                    <h2>Participate in Challenge</h2>
                    <button onClick={participateInChallenge} disabled={loading}>
                        {loading ? 'Participating...' : 'Participate'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;
