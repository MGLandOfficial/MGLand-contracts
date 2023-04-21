// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

contract MGRecycleV2 is IERC721Receiver, OwnableUpgradeable {
    event Recycle(address nftaAdd, address from, uint256 tokenId, string name);

    mapping(address => uint256) public recycleAmount;

    function initialize() public initializer {
        __Ownable_init();
    }
    
    function onERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) external override returns (bytes4) {
        unchecked {
            recycleAmount[from] ++;
        }
        string memory nftName = IERC721Metadata(msg.sender).name();
        emit Recycle(msg.sender, from, tokenId, nftName);
        return IERC721Receiver.onERC721Received.selector;
    }

    function withdraw(address nft, address to, uint256 tokenId) external onlyOwner {
        IERC721(nft).safeTransferFrom(address(this), to, tokenId);
    }
}