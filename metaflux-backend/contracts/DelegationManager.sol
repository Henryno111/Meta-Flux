// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title DelegationManager
 * @dev Contract for managing delegation of spending authority
 */
contract DelegationManager is Pausable, ReentrancyGuard, Ownable {
    struct Delegate {
        address admin;
        address employee;
        uint256 spendingLimit;
        bool isActive;
    }

    // Mappings
    mapping(address => Delegate) public delegations;
    mapping(address => mapping(address => bool)) public delegationRelationships;

    // Events
    event DelegateAssigned(address indexed admin, address indexed employee, uint256 spendingLimit);
    event DelegateRemoved(address indexed admin, address indexed employee);
    event SpendingLimitUpdated(address indexed admin, address indexed employee, uint256 newLimit);

    /**
     * @dev Constructor
     */
    constructor() {}

    /**
     * @dev Assign a delegate with a spending limit
     * @param employee Address of the employee being delegated to
     * @param limit Spending limit for the employee
     */
    function assignDelegate(address employee, uint256 limit) public whenNotPaused nonReentrant {
        require(employee != address(0), "Invalid employee address");
        require(employee != msg.sender, "Cannot delegate to self");
        
        delegations[employee] = Delegate(msg.sender, employee, limit, true);
        delegationRelationships[msg.sender][employee] = true;
        
        emit DelegateAssigned(msg.sender, employee, limit);
    }

    /**
     * @dev Remove a delegate
     * @param employee Address of the employee to remove delegation from
     */
    function removeDelegate(address employee) public nonReentrant {
        require(delegations[employee].admin == msg.sender, "Not authorized");
        
        delegationRelationships[msg.sender][employee] = false;
        delegations[employee].isActive = false;
        
        emit DelegateRemoved(msg.sender, employee);
    }

    /**
     * @dev Update the spending limit for a delegate
     * @param employee Address of the employee
     * @param newLimit New spending limit
     */
    function updateSpendingLimit(address employee, uint256 newLimit) public nonReentrant {
        require(delegations[employee].admin == msg.sender, "Not authorized");
        require(delegations[employee].isActive, "Delegation not active");
        
        delegations[employee].spendingLimit = newLimit;
        
        emit SpendingLimitUpdated(msg.sender, employee, newLimit);
    }

    /**
     * @dev Check if a delegate is authorized to act on behalf of an admin
     * @param delegate Address of the potential delegate
     * @param admin Address of the admin
     * @return Boolean indicating if the delegate is authorized
     */
    function isAuthorized(address delegate, address admin) public view returns (bool) {
        // Check if this is an active delegation relationship
        return delegationRelationships[admin][delegate] && delegations[delegate].isActive;
    }

    /**
     * @dev Check if a delegate is authorized to spend a certain amount
     * @param delegate Address of the delegate
     * @param amount Amount to be spent
     * @return Boolean indicating if the spending is authorized
     */
    function canSpend(address delegate, uint256 amount) public view returns (bool) {
        return delegations[delegate].isActive && amount <= delegations[delegate].spendingLimit;
    }

    /**
     * @dev Get the spending limit for a delegate
     * @param delegate Address of the delegate
     * @return Spending limit amount
     */
    function getSpendingLimit(address delegate) public view returns (uint256) {
        return delegations[delegate].spendingLimit;
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