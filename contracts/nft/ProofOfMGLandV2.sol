// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract ProofOfMGLandV2 is ERC721Upgradeable, OwnableUpgradeable, AccessControlUpgradeable {
    // ====================== CUSTOM ERRORS ==================
    error NonTransferable();
    error MintNotAllow();
    error AlreadyMinted();
    error MintOver();

    using CountersUpgradeable for CountersUpgradeable.Counter;

    uint256 private _supply;
    string private _baseTokenUri;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    CountersUpgradeable.Counter private _tokenIdTracker;

    mapping(address => uint256) private _pomOwner;
    bool private _isClaimOver;

    function initialize() public initializer {
        __ERC721_init("Proof Of MGLand", "POMG");
        __Ownable_init();
        __AccessControl_init();
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _supply = 10000;
        _tokenIdTracker = CountersUpgradeable.Counter({_value: 1});

    }

    function mint(address receiver) external {
        if (!hasRole(MINTER_ROLE, msg.sender)) revert MintNotAllow();
        if (balanceOf(receiver) != 0) revert AlreadyMinted();
        uint256 tokenId = _tokenIdTracker.current();
        if (tokenId > _supply) revert MintOver();

        _pomOwner[receiver] = tokenId;
        _mint(receiver, tokenId);
        _tokenIdTracker.increment();
    }

    function mint() external {
        if (balanceOf(msg.sender) != 0) revert AlreadyMinted();
        if (_isClaimOver) revert MintOver();
        uint256 tokenId = _tokenIdTracker.current();
        _pomOwner[msg.sender] = tokenId;
        _mint(msg.sender, tokenId);
        _tokenIdTracker.increment();
    }

    function setApprovalForAll(address operator, bool _approved)
        public
        virtual
        override
    {
        revert NonTransferable();
    }

    function approve(address to, uint256 tokenId)
        public
        virtual
        override
    {
        revert NonTransferable();
    }

    function supportsInterface(bytes4 interfaceId) 
        public 
        view 
        virtual 
        override(ERC721Upgradeable, AccessControlUpgradeable) 
        returns (bool) 
    {
        return super.supportsInterface(interfaceId);
    }

    function pomgId(address pomOwner) public view returns (uint256) {
        return _pomOwner[pomOwner];
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdTracker.current() - 1;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenUri;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        if (from != address(0)) {
            revert NonTransferable();
        }
    }

    // ====================== ADMIN FUNCTIONS ==================
    function setBaseURI(string memory newURI) external onlyOwner {
        _baseTokenUri = newURI;
    }

    function setSupply(uint256 newSupply) external onlyOwner {
        _supply = newSupply;
    }

    function setClaimOver() external onlyOwner {
        _isClaimOver = !_isClaimOver;
    }

}