require("dotenv").config({ path: ".env" });

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {

  networks: {

    sepolia: {

      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_SEPOLIA}`,

      accounts: [process.env.WALLET_PRIVATE_KEY],

    },

    ethereum: {

      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MAIN}`,

      accounts: [process.env.WALLET_PRIVATE_KEY],

    },

  },

  etherscan: {

    apiKey: {

        sepolia: process.env.ETHEREUM_SCAN_API_KEY,

    },

  },

  sourcify: {
    enabled: false,
  },

  solidity: "0.8.27",

};
