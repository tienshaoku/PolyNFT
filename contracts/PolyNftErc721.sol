pragma solidity 0.8.1;

import { ERC721PresetMinterPauserAutoId } from "./ERC721PresetMinterPauserAutoId.sol";
import { PolyNftFactory } from "./PolyNftFactory.sol";

contract PolyNftErc721 is ERC721PresetMinterPauserAutoId {
    address public factory;
    address public registry;
    address public fusionImplementation;
    mapping(uint256 => string) private _tokenURIMap;
    mapping(uint256 => bytes) public attributeMap;
    mapping(uint256 => string) public descriptionMap;

    // key: tokneId, value: source tokneId
    // original mint is empty array, will set source tokenId when PolyNftRegistry.fuse()
    mapping(uint256 => uint256[]) public sourceTokenIdMap;

    modifier onlyRegistry() {
        // PNE721_OR: PolyNftErc721 only regitry
        require(msg.sender == registry, "PNE721_OR");
        _;
    }

    constructor(
        string memory nameArg,
        string memory symbolArg,
        string memory baseTokenURIArg,
        address fusionImplementationArg
    ) ERC721PresetMinterPauserAutoId(nameArg, symbolArg, baseTokenURIArg) {
        fusionImplementation = fusionImplementationArg;
        factory = msg.sender;
        registry = PolyNftFactory(factory).registry();
    }

    // TODO: add access control, owner, registry or everyone
    function mint(
        address to,
        string memory tokenURI,
        bytes memory attribute,
        string memory description,
        uint256[] memory sourceTokenIds
    ) external {
        uint256 tokenId = mint(to);

        _tokenURIMap[tokenId] = tokenURI;
        attributeMap[tokenId] = attribute;
        descriptionMap[tokenId] = description;
        sourceTokenIdMap[tokenId] = sourceTokenIds;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return bytes(_tokenURIMap[tokenId]).length > 0 ? _tokenURIMap[tokenId] : _baseURI();
    }
}
