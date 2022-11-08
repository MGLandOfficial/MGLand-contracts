// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MGSpaceship is ERC721Enumerable, Ownable, AccessControl {
    string public _baseTokenURI;
    uint256 public constant MAX_SUPPLY = 10000;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function mint(address receiver, uint256 tokenId) external {
        require(hasRole(MINTER_ROLE, msg.sender), "Do not have mint role");
        require(totalSupply() < MAX_SUPPLY, "Mint over");
        _mint(receiver, tokenId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override (AccessControl, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenOfOwnerAll(address user) public view returns (uint256[] memory) {
        uint256 bal = balanceOf(user);
        uint256[] memory tokenList = new uint256[](bal);
        
        for (uint i; i < bal; i++) {
            tokenList[i] = tokenOfOwnerByIndex(user, i);
        }
        
        return tokenList;
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner() {
        _baseTokenURI = newBaseURI;
    }
}
