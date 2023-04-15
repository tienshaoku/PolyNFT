pragma solidity 0.8.18;

import { ERC721PresetMinterPauserAutoId } from "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract PolyNftErc721 is ERC721PresetMinterPauserAutoId {
    address private _registry;
    address private _fustionImplentation;
    mapping(uint256 => bytes) private _attributeMap;
    mapping(uint256 => string) private _tokenUriMap;

    modifier onlyRegistry() {
        // PNE721_OR: PolyNftErc721 only regitry
        require(msg.sender == _registry, "PNE721_OR");
        _;
    }

    constructor(
        string memory nameArg,
        string memory symbolArg,
        string memory baseTokenURIArg,
        address fustionImplentationArg,
        address registryArg
    ) ERC721PresetMinterPauserAutoId(nameArg, symbolArg, baseTokenURIArg) {
        _fustionImplentation = fustionImplentationArg;
        _registry = registryArg;
    }

    // this function will be triggered after PolyNftRegistr.fustion()
    function setTokenURI(uint256 tokneIdArg, string calldata tokenURIArg) external onlyRegistry {
        _tokenUriMap[tokneIdArg] = tokenURIArg;
    }

    // this function will be triggered after PolyNftRegistr.fustion()
    function setTokenAttribute(uint256 tokneIdArg, bytes calldata attributeArg) external onlyRegistry {
        _attributeMap[tokneIdArg] = attributeArg;
    }

    function getTokenAttribute(uint256 tokenId) external view returns (bytes memory) {
        return _attributeMap[tokenId];
    }

    function getFustionImplentation() external view returns (address) {
        return _fustionImplentation;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return bytes(_tokenUriMap[tokenId]).length > 0 ? _tokenUriMap[tokenId] : _baseURI();
    }

}
