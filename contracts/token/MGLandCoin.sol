// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract MGLandCoin is ERC20Burnable, Ownable {
    uint256 constant MAX_SUPPLY = 3300000000 ether;

    constructor() ERC20("MGLand Coin", "MGL") {}

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Reach Upper Limit");
        _mint(to, amount);
    }

}