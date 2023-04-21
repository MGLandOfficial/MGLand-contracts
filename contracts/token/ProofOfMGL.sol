// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProofOfMGL is ERC20Burnable, Ownable {
    uint256 constant MAX_SUPPLY = 66000000 ether;

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC20(name_, symbol_) {
        _mint(msg.sender, MAX_SUPPLY);
    }

    function batchTransfer(address[] memory addList, uint256[] memory amountList) external onlyOwner{
        uint256 len = addList.length;
        require(len == amountList.length, "List error.");
        for (uint i; i < len; i++) {
            _transfer(msg.sender, addList[i], amountList[i]);
        }
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override virtual {
        require(from == address(0) || from == owner() || to == address(0), "PMGL transfer error.");
    }

}