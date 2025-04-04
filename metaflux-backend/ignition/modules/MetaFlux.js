// ignition/modules/MetaFlux.js
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MetaFluxModule", (m) => {
  // Deploy the MetaFlux contract
  const metaFlux = m.contract("MetaFlux");

  // We will use these in the frontend
  return {
    metaFlux
  };
});