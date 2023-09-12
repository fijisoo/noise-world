// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Premade is Initializable, ERC1155Upgradeable, OwnableUpgradeable, PausableUpgradeable, ERC1155BurnableUpgradeable, ERC1155SupplyUpgradeable {
    uint256 public minPublicPrice = 0.01 ether;
    address public account;

    string private _baseUri = "ipfs://bafybeigyc2yediwsnmtrfawccdyqphae4csguiilo7japp5xsfauw53w2q/";
    string public mp3 = "ipfs://bafybeih2bkuwuqbivwhnyyr7vcdcigfd6sqrtjkm4rf6dgf5k2rrwm4iuy";

    mapping(uint256 => NftAttributes) public nftAttributes;

    struct NftAttributes {
        string mp3;
    }

    NftAttributes public predefinedAttributes = NftAttributes(
        "ipfs://bafybeih2bkuwuqbivwhnyyr7vcdcigfd6sqrtjkm4rf6dgf5k2rrwm4iuy"
    );

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(string memory baseUri) initializer public {
        __ERC1155_init(baseUri);
        __Ownable_init();
        __Pausable_init();
        __ERC1155Burnable_init();
        __ERC1155Supply_init();
    }

    function setBaseURI(string memory baseUri) external onlyOwner {
        _baseUri = baseUri;
    }

    function setURI(string memory newuri) internal virtual {
        _setURI(newuri);
    }

    function uri(uint256 tokenId) public view virtual override returns (string memory) {
        require(exists(tokenId), "URI: doesn't exists");

        return string(abi.encodePacked(_baseUri, Strings.toString(tokenId), ".json"));
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function getNftAttributes(uint256 id) public view returns (NftAttributes memory) {
        return nftAttributes[id];
    }

    function mint(uint256 id, uint256 amount)
    public
    payable
    {
        require(id < 1, "Sorry, you trying to mint wrong NFT");
        require(msg.value == minPublicPrice * amount, "Default price (0.01 eth) should be multiplied by amount!");

        require(bytes(nftAttributes[id].mp3).length == 0, "Attributes already set");
        nftAttributes[id] = predefinedAttributes;

        _mint(msg.sender, id, amount, "");
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
    public
    onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
    internal
    whenNotPaused
    override(ERC1155Upgradeable, ERC1155SupplyUpgradeable)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
