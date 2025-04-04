// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ExpenseManager.sol";
import "./DelegationManager.sol";
import "./RewardNFT.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MetaFlux
 * @dev Main contract for the MetaFlux expense management system
 */
contract MetaFlux is Pausable, ReentrancyGuard, Ownable {
    // Contract instances
    ExpenseManager public expenseManager;
    DelegationManager public delegationManager;
    RewardNFT public rewardNFT;
    
    // Cashback percentage (in basis points, 100 = 1%)
    uint256 public cashbackRate = 100; // Default 1%
    
    // Earned cashback by user
    mapping(address => uint256) public earnedCashback;
    
    // Events
    event ExpenseRecorded(address indexed user, uint256 amount, string category, string txHash);
    event CashbackEarned(address indexed user, uint256 amount);
    event CashbackClaimed(address indexed user, uint256 amount);
    event CashbackRateUpdated(uint256 newRate);
    event RewardEarned(address indexed user, string badgeType, uint256 tokenId);
    
    /**
     * @dev Constructor to initialize the system with new contract instances
     */
    constructor() {
        expenseManager = new ExpenseManager();
        delegationManager = new DelegationManager();
        rewardNFT = new RewardNFT();
        
        // Initialize common reward badge types
        rewardNFT.addBadgeType("BudgetMaster", "ipfs://metaflux/badges/budget-master");
        rewardNFT.addBadgeType("ExpenseGuru", "ipfs://metaflux/badges/expense-guru");
        rewardNFT.addBadgeType("FirstExpense", "ipfs://metaflux/badges/first-expense");
    }
    
    /**
     * @dev Modified version of recordTransaction that integrates with rewards and cashback
     * @param amount Amount spent in the transaction
     * @param category Category of the expense
     * @param txHash Transaction hash or identifier
     */
    function recordTransaction(uint256 amount, string memory category, string memory txHash) 
        public 
        whenNotPaused 
        nonReentrant 
    {
        // Record the expense
        expenseManager.recordTransaction(msg.sender, amount, category, txHash);
        
        // Calculate cashback
        uint256 cashback = (amount * cashbackRate) / 10000;
        earnedCashback[msg.sender] += cashback;
        
        // Check if this is the user's first transaction - reward them
        if (expenseManager.getTransactions(msg.sender).length == 1) {
            uint256 tokenId = rewardNFT.mintRewardNFT(msg.sender, "FirstExpense");
            emit RewardEarned(msg.sender, "FirstExpense", tokenId);
        }
        
        emit ExpenseRecorded(msg.sender, amount, category, txHash);
        emit CashbackEarned(msg.sender, cashback);
    }
    
    /**
     * @dev Record a transaction on behalf of a delegate
     * @param user Address of the user on whose behalf the transaction is recorded
     * @param amount Amount spent in the transaction
     * @param category Category of the expense
     * @param txHash Transaction hash or identifier
     */
    function recordDelegatedTransaction(address user, uint256 amount, string memory category, string memory txHash) 
        public 
        whenNotPaused 
        nonReentrant 
    {
        // Check if sender is authorized to spend on behalf of the user
        require(delegationManager.isAuthorized(msg.sender, user), "Not authorized as delegate");
        require(delegationManager.canSpend(msg.sender, amount), "Exceeds spending limit");
        
        // Record the expense
        expenseManager.recordTransaction(user, amount, category, txHash);
        
        // Calculate cashback
        uint256 cashback = (amount * cashbackRate) / 10000;
        earnedCashback[user] += cashback;
        
        emit ExpenseRecorded(user, amount, category, txHash);
        emit CashbackEarned(user, cashback);
    }
    
    /**
     * @dev Claim earned cashback
     * @param amount Amount of cashback to claim
     */
    function claimCashback(uint256 amount) public nonReentrant {
        require(amount <= earnedCashback[msg.sender], "Insufficient cashback balance");
        
        earnedCashback[msg.sender] -= amount;
        
        // Here you would typically transfer tokens or currency to the user
        // This implementation would depend on your token contract or transfer mechanism
        
        emit CashbackClaimed(msg.sender, amount);
    }
    
    /**
     * @dev Set the cashback rate (admin only)
     * @param newRate New cashback rate in basis points (100 = 1%)
     */
    function setCashbackRate(uint256 newRate) public onlyOwner {
        require(newRate <= 1000, "Rate too high"); // Max 10%
        cashbackRate = newRate;
        
        emit CashbackRateUpdated(newRate);
    }
    
    /**
     * @dev Set a budget for a user
     * @param amount Budget amount
     * @param period Period in days for which the budget is valid
     */
    function setBudget(uint256 amount, uint256 period) public {
        expenseManager.setBudget(msg.sender, amount, period);
    }
    
    /**
     * @dev Assign a delegate with a spending limit
     * @param employee Address of the employee being delegated to
     * @param limit Spending limit for the employee
     */
    function assignDelegate(address employee, uint256 limit) public {
        delegationManager.assignDelegate(employee, limit);
    }
    
    /**
     * @dev Mint a reward NFT (admin only)
     * @param user Address of the user receiving the reward
     * @param badgeType Type of badge to mint
     */
    function mintReward(address user, string memory badgeType) public onlyOwner {
        require(rewardNFT.badgeTypeExists(badgeType), "Badge type does not exist");
        
        uint256 tokenId = rewardNFT.mintRewardNFT(user, badgeType);
        
        emit RewardEarned(user, badgeType, tokenId);
    }
    
    /**
     * @dev Pause the contract in case of emergency
     */
    function pause() public onlyOwner {
        _pause();
        expenseManager.pause();
        delegationManager.pause();
    }
    
    /**
     * @dev Unpause the contract
     */
    function unpause() public onlyOwner {
        _unpause();
        expenseManager.unpause();
        delegationManager.unpause();
    }
}