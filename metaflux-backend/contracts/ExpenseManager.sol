// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Make sure these imports match the installed package structure
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ExpenseManager
 * @dev Contract for managing and tracking expenses
 */
contract ExpenseManager is Pausable, ReentrancyGuard, Ownable {
    struct Transaction {
        address user;
        uint256 amount;
        string category;
        string txHash;
        uint256 timestamp;
    }

    // Mappings
    mapping(address => Transaction[]) public transactions;
    mapping(address => uint256) public budgets;
    mapping(address => uint256) public periodEnd; // When the budget period ends
    
    // Events
    event TransactionRecorded(address indexed user, uint256 amount, string category, string txHash);
    event BudgetSet(address indexed user, uint256 amount, uint256 periodEnd);
    
    /**
     * @dev Constructor that sets the owner as the deployer
     */
    constructor() {}
    
    /**
     * @dev Records a new transaction
     * @param user Address of the user making the transaction
     * @param amount Amount spent in the transaction
     * @param category Category of the expense
     * @param txHash Transaction hash or identifier
     */
    function recordTransaction(
        address user, 
        uint256 amount, 
        string memory category, 
        string memory txHash
    ) public whenNotPaused nonReentrant {
        require(msg.sender == user || isAuthorized(msg.sender, user), "Not authorized");
        
        // Check if user has enough budget
        if (budgets[user] > 0) {
            require(amount <= budgets[user], "Exceeds budget limit");
            budgets[user] -= amount;
        }
        
        transactions[user].push(Transaction(user, amount, category, txHash, block.timestamp));
        
        emit TransactionRecorded(user, amount, category, txHash);
    }
    
    /**
     * @dev Set a budget for a user
     * @param user Address of the user
     * @param amount Budget amount
     * @param period Period in days for which the budget is valid
     */
    function setBudget(address user, uint256 amount, uint256 period) public {
        require(msg.sender == user || isAuthorized(msg.sender, user), "Not authorized");
        
        budgets[user] = amount;
        periodEnd[user] = block.timestamp + (period * 1 days);
        
        emit BudgetSet(user, amount, periodEnd[user]);
    }
    
    /**
     * @dev Get all transactions for a user
     * @param user Address of the user
     * @return Array of transactions
     */
    function getTransactions(address user) public view returns (Transaction[] memory) {
        return transactions[user];
    }
    
    /**
     * @dev Get the remaining budget for a user
     * @param user Address of the user
     * @return Remaining budget amount
     */
    function getRemainingBudget(address user) public view returns (uint256) {
        if (block.timestamp > periodEnd[user]) {
            return 0;
        }
        return budgets[user];
    }
    
    /**
     * @dev Check if an address is authorized to act on behalf of a user
     * @param delegate Address to check
     * @param user User being represented
     * @return Boolean indicating authorization status
     */
    function isAuthorized(address delegate, address user) internal view returns (bool) {
        // This will be implemented in the DelegationManager
        return false;
    }
    
    /**
     * @dev Pause the contract in case of emergency
     */
    function pause() public onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause the contract
     */
    function unpause() public onlyOwner {
        _unpause();
    }
}