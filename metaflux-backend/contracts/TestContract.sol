// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TestContract is Ownable {
    constructor() {}
    
    function test() public view onlyOwner returns (bool) {
        return true;
    }
}