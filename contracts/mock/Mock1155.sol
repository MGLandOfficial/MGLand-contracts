// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Mock1155 is ERC1155, Ownable {
    //============================ error ==============================
    error NonTransferableToken();


    string private _name;
    string private _symbol;
    mapping(uint256 => string) uriList;
    
    constructor(string memory name_, string memory symbol_) ERC1155("") {
        _name = name_;
        _symbol = symbol_;
    }

    function mint(uint256 id, address receiver) external {
        _mint(receiver, id, 1, '');
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override {
        if (from != address(0) && to != address(0)) {
            revert NonTransferableToken();
        }
    }

    function burn(uint256 id) external {
        _burn(msg.sender, id, 1);
    }

    function setUri(uint256 id, string memory newUri) external {
        uriList[id] = newUri;
    }

    function uri(uint256 id) public view override returns(string memory) {
        return uriList[id];
    }

    function name() public view returns(string memory){
        return _name;
    }

    function symbol() public view returns(string memory){
        return _symbol;
    }
}