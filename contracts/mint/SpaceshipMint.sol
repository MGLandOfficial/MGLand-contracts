// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../nft/MGSpaceship.sol";

contract SpaceshipMint is EIP712, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    bool private _isMintPaused;
    address private _admin;
    address private _spaceship;
    Counters.Counter private _tokenIdTracker;
    mapping(uint256 => mapping(address => bool)) public isClaimed;

    constructor(address spaceship_) EIP712("MGSpaceship", "1.0.0") {
        _spaceship = spaceship_;
        _tokenIdTracker = Counters.Counter({_value: 1});

    }

    function mint(
        address nftAdd,
        uint256 timestamp,
        uint256 wlType,
        bytes calldata signature
    ) external nonReentrant {
        require(!isClaimed[wlType][msg.sender], "Do not reclaim");
        require(
            _verify(
                _hash(nftAdd, msg.sender, wlType, timestamp),
                signature
            ),
            "Invalid signature"
        );
        isClaimed[wlType][msg.sender] = true;
        uint256 tokenId = _tokenIdTracker.current();
        MGSpaceship(_spaceship).mint(msg.sender, tokenId);
        _tokenIdTracker.increment();
    }

    function _hash(
        address nftAdd,
        address sender,
        uint256 wlType,
        uint256 timestamp
    ) internal view returns (bytes32) {
        return
            _hashTypedDataV4(
                keccak256(
                    abi.encode(
                        keccak256(
                            "MGSpaceship(address nftAdd,address sender,uint256 wlType,uint256 timestamp)"
                        ),
                        nftAdd,
                        sender,
                        wlType,
                        timestamp
                    )
                )
            );
    }

    function _verify(bytes32 digest, bytes memory signature)
        internal
        view
        returns (bool)
    {
        return _admin == ECDSA.recover(digest, signature);
    }

    function setMintPaused() external onlyOwner {
        _isMintPaused = !_isMintPaused;
    }

    function setAdmin(address newAdmin) external onlyOwner {
        _admin = newAdmin;
    }

}
