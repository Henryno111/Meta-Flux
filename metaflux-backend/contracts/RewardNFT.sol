// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title RewardNFT
 * @dev Contract for minting and managing reward NFTs
 */
contract RewardNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Badge types with metadata URIs
    mapping(string => string) private _badgeTypeURIs;
    
    // User rewards count by badge type
    mapping(address => mapping(string => uint256)) public badgeCounts;
    
    // Total rewards earned by user
    mapping(address => uint256) public totalRewards;
    
    // Events
    event RewardNFTMinted(address indexed user, uint256 tokenId, string badgeType);
    event BadgeTypeAdded(string badgeType, string metadataURI);
    
    /**
     * @dev Constructor
     */
    constructor() ERC721("MetaFlux Rewards", "MFXR") {}
    
    /**
     * @dev Add a new badge type with its metadata
     * @param badgeType Type of badge (e.g., "BudgetMaster", "ExpenseGuru")
     * @param metadataURI URI pointing to the badge metadata
     */
    function addBadgeType(string memory badgeType, string memory metadataURI) public onlyOwner {
        require(bytes(_badgeTypeURIs[badgeType]).length == 0, "Badge type already exists");
        _badgeTypeURIs[badgeType] = metadataURI;
        
        emit BadgeTypeAdded(badgeType, metadataURI);
    }
    
    /**
     * @dev Mint a reward NFT for a user
     * @param user Address of the user receiving the reward
     * @param badgeType Type of badge to mint
     * @return The ID of the newly minted token
     */
    function mintRewardNFT(address user, string memory badgeType) public onlyOwner returns (uint256) {
        require(user != address(0), "Invalid user address");
        require(bytes(_badgeTypeURIs[badgeType]).length > 0, "Badge type does not exist");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(user, newTokenId);
        _setTokenURI(newTokenId, _badgeTypeURIs[badgeType]);
        
        // Update user rewards
        badgeCounts[user][badgeType] += 1;
        totalRewards[user] += 1;
        
        emit RewardNFTMinted(user, newTokenId, badgeType);
        
        return newTokenId;
    }
    
    /**
     * @dev Get all badge types a user has earned
     * @param user Address of the user
     * @param badgeType Type of badge to check
     * @return Number of badges of that type earned by the user
     */
    function getUserBadgeCount(address user, string memory badgeType) public view returns (uint256) {
        return badgeCounts[user][badgeType];
    }
    
    /**
     * @dev Get metadata URI for a badge type
     * @param badgeType Type of badge
     * @return Metadata URI for the badge type
     */
    function getBadgeTypeURI(string memory badgeType) public view returns (string memory) {
        require(bytes(_badgeTypeURIs[badgeType]).length > 0, "Badge type does not exist");
        return _badgeTypeURIs[badgeType];
    }
    
    /**
     * @dev Check if a badge type exists
     * @param badgeType Type of badge to check
     * @return Boolean indicating if the badge type exists
     */
    function badgeTypeExists(string memory badgeType) public view returns (bool) {
        return bytes(_badgeTypeURIs[badgeType]).length > 0;
    }
}