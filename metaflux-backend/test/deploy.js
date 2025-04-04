// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  console.log("Deploying MetaFlux contracts...");

  // Deploy MetaFlux (which will deploy other contracts)
  const MetaFlux = await hre.ethers.getContractFactory("MetaFlux");
  const metaFlux = await MetaFlux.deploy();
  
  // For ethers.js v5
  // await metaFlux.deployed();
  
  // For ethers.js v6 (if needed)
  // await metaFlux.waitForDeployment();

  // For ethers.js v5
  console.log("MetaFlux deployed to:", metaFlux.address || metaFlux.target);
  
  // For ethers.js v6 (uncomment if using v6)
  // console.log("MetaFlux deployed to:", metaFlux.target);
  
  // Get addresses of the other contracts
  const expenseManagerAddress = await metaFlux.expenseManager();
  const delegationManagerAddress = await metaFlux.delegationManager();
  const rewardNFTAddress = await metaFlux.rewardNFT();
  
  console.log("ExpenseManager deployed to:", expenseManagerAddress);
  console.log("DelegationManager deployed to:", delegationManagerAddress);
  console.log("RewardNFT deployed to:", rewardNFTAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });