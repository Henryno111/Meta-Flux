// test/MetaFlux.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MetaFlux", function () {
  let metaFlux;
  let owner, user1, user2, user3;

  before(async function () {
    // Get signers
    [owner, user1, user2, user3] = await ethers.getSigners();

    // Deploy the MetaFlux contract
    const MetaFlux = await ethers.getContractFactory("MetaFlux");
    metaFlux = await MetaFlux.deploy();
    
    // For ethers.js v5, remove the .deployed() call
    // For ethers.js v6, uncomment the next line if needed
    // await metaFlux.waitForDeployment();
  });

  describe("Basic Functionality", function () {
    it("Should record a transaction", async function () {
      // For ethers.js v5
      const amount = ethers.utils.parseEther("1");
      // For ethers.js v6
      // const amount = ethers.parseEther("1");
      const category = "Travel";
      const txHash = "0x1234567890abcdef";

      await metaFlux.connect(user1).recordTransaction(amount, category, txHash);

      // Get the expense manager address
      const expenseManagerAddress = await metaFlux.expenseManager();
      
      // For ethers.js v5
      const expenseManager = await ethers.getContractAt("ExpenseManager", expenseManagerAddress);
      
      // For ethers.js v6 (uncomment if using v6)
      // const expenseManager = await ethers.getContractAt("ExpenseManager", expenseManagerAddress, owner);

      // Get transactions for user1
      const transactions = await expenseManager.getTransactions(user1.address);
      expect(transactions.length).to.equal(1);
      expect(transactions[0].amount).to.equal(amount);
      expect(transactions[0].category).to.equal(category);
      expect(transactions[0].txHash).to.equal(txHash);
    });

    it("Should set a budget", async function () {
      // For ethers.js v5
      const amount = ethers.utils.parseEther("5");
      // For ethers.js v6
      // const amount = ethers.parseEther("5");
      const period = 30; // 30 days

      await metaFlux.connect(user1).setBudget(amount, period);

      // Get the expense manager address
      const expenseManagerAddress = await metaFlux.expenseManager();
      const expenseManager = await ethers.getContractAt("ExpenseManager", expenseManagerAddress);

      // Check budget for user1
      const budget = await expenseManager.budgets(user1.address);
      expect(budget).to.equal(amount);
    });

    it("Should assign a delegate", async function () {
      // For ethers.js v5
      const limit = ethers.utils.parseEther("2");
      // For ethers.js v6
      // const limit = ethers.parseEther("2");

      await metaFlux.connect(user1).assignDelegate(user2.address, limit);

      // Get the delegation manager address
      const delegationManagerAddress = await metaFlux.delegationManager();
      
      // For ethers.js v5
      const delegationManager = await ethers.getContractAt("DelegationManager", delegationManagerAddress);
      
      // For ethers.js v6 (uncomment if using v6)
      // const delegationManager = await ethers.getContractAt("DelegationManager", delegationManagerAddress, owner);

      // Check if user2 is a delegate of user1
      const isAuthorized = await delegationManager.isAuthorized(user2.address, user1.address);
      expect(isAuthorized).to.be.true;

      // Check spending limit
      const spendingLimit = await delegationManager.getSpendingLimit(user2.address);
      expect(spendingLimit).to.equal(limit);
    });

    it("Should allow delegate to record a transaction", async function () {
      const amount = ethers.utils.parseEther("1");
      const category = "Office";
      const txHash = "0xabcdef1234567890";

      await metaFlux.connect(user2).recordDelegatedTransaction(user1.address, amount, category, txHash);

      // Get the expense manager address
      const expenseManagerAddress = await metaFlux.expenseManager();
      const expenseManager = await ethers.getContractAt("ExpenseManager", expenseManagerAddress);

      // Get transactions for user1
      const transactions = await expenseManager.getTransactions(user1.address);
      expect(transactions.length).to.equal(2);
      expect(transactions[1].amount).to.equal(amount);
      expect(transactions[1].category).to.equal(category);
      expect(transactions[1].txHash).to.equal(txHash);
    });

    it("Should earn cashback", async function () {
      // Check user1's cashback balance
      const cashback = await metaFlux.earnedCashback(user1.address);
      
      // We made 2 transactions of 1 ETH each, with 1% cashback
      const expectedCashback = ethers.utils.parseEther("0.02"); // 2 * 1 * 0.01
      expect(cashback).to.equal(expectedCashback);
    });

    it("Should mint reward NFT", async function () {
      // Get the reward NFT address
      const rewardNFTAddress = await metaFlux.rewardNFT();
      
      // For ethers.js v5
      const rewardNFT = await ethers.getContractAt("RewardNFT", rewardNFTAddress);
      
      // For ethers.js v6 (uncomment if using v6)
      // const rewardNFT = await ethers.getContractAt("RewardNFT", rewardNFTAddress, owner);

      // Check if user1 received FirstExpense badge
      const badgeCount = await rewardNFT.getUserBadgeCount(user1.address, "FirstExpense");
      expect(badgeCount).to.equal(1);
    });
  });
});