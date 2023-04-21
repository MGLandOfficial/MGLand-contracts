// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract MetagamePool is Ownable {
    event Deposit(address from, uint256 amount);

    constructor(){}

    function deposit() external payable {
        require(msg.value > 0, "Transfer zero value");
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(address to, uint256 amount) external payable onlyOwner {
        require(to != address(0), "Transfer to zero address");
        payable(to).transfer(amount);
    }
    
}