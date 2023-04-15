pragma solidity 0.8.18;

import { ERC721PresetMinterPauserAutoId } from "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";

contract PolyNftErc721 is ERC721PresetMinterPauserAutoId {
    address public registry;
    address public fusionImplementation;
    mapping(uint256 => bytes) public attributeMap;
    mapping(uint256 => string) public tokenUrlMap;

    modifier onlyRegistry() {
        // PNE721_OR: PolyNftErc721 only regitry
        require(msg.sender == registry, "PNE721_OR");
        _;
    }

    constructor(
        string memory nameArg,
        string memory symbolArg,
        string memory baseTokenURIArg,
        address fusionImplementationArg,
        address registryArg
    ) ERC721PresetMinterPauserAutoId(nameArg, symbolArg, baseTokenURIArg) {
        fusionImplementation = fusionImplementationArg;
        registry = registryArg;
    }

    // this function will be triggered after PolyNftRegistr.fustion()
    function setTokenURI(uint256 tokneIdArg, string calldata tokenURIArg) external onlyRegistry {
        tokenUrlMap[tokneIdArg] = tokenURIArg;
    }

    // this function will be triggered after PolyNftRegistr.fustion()
    function setTokenAttribute(uint256 tokneIdArg, bytes calldata attributeArg) external onlyRegistry {
        attributeMap[tokneIdArg] = attributeArg;
    }

    function getTokenAttribute(uint256 tokenId) external view returns (bytes memory) {
        return attributeMap[tokenId];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return bytes(tokenUrlMap[tokenId]).length > 0 ? tokenUrlMap[tokenId] : _baseURI();
    }

}
