require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require("dotenv").config();
const { PRIVATE_KEY, INFURA_API_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    linea_sepolia: {
      url: `https://linea-sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    linea_mainnet: {
      url: `https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    // Keep fallback options if Infura key isn't available
    ...(PRIVATE_KEY && !INFURA_API_KEY ? {
      linea_sepolia: {
        url: "https://rpc.sepolia.linea.exchange",
        accounts: [PRIVATE_KEY],
      },
      linea_mainnet: {
        url: "https://rpc.linea.exchange",
        accounts: [PRIVATE_KEY],
      }
    } : {})
  }
};