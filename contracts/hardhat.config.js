/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 require('@nomiclabs/hardhat-ethers');
 require("@nomiclabs/hardhat-waffle");

 const { PrivateKey } = require('./secret.json');

 module.exports = {
    defaultNetwork: 'mainnet',
 
    networks: {
       hardhat: {
       },
       testnet: {
          url: 'https://rpc.ankr.com/core',
          accounts: [PrivateKey],
          chainId: 1116,
       }
    },
    solidity: {
       compilers: [
         {
            version: '0.8.9',
            settings: {
               evmVersion: 'paris',
               optimizer: {
                  enabled: true,
                  runs: 200,
               },
            },
         },
       ],
    },
    paths: {
       sources: './contracts',
       cache: './cache',
       artifacts: './artifacts',
    },
    mocha: {
       timeout: 20000,
    },
 };
 