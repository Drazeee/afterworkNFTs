const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, `https://matic-mumbai.chainstacklabs.com`),
      network_id: 80001,       // Ropsten's id
      timeoutBlocks: 300,  // # of blocks before a deployment times out  (minimum/default: 50)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://matic-mainnet.chainstacklabs.com`),
      network_id: 137,       // Ropsten's id
      timeoutBlocks: 300,  // # of blocks before a deployment times out  (minimum/default: 50)
      gasPrice: 40000000000,
    }
    // polygon: {
    //   provider: () => new HDWalletProvider(mnemonic, `https://matic-mainnet.chainstacklabs.com`),
    //   network_id: 137,       // Ropsten's id
    //   timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
    // }
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.14",      // Fetch exact version from solc-bin (default: truffle's version)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: true,
         runs: 200
       },
      }
    }
  },
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    polygonscan: process.env.POLYGONSCAN_API_KEY
  }
};
