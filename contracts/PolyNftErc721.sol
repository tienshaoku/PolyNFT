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

    // key: tokneId, value: fusion source tokneId
    // the first mint is an empty array; will set fusion source tokenId when PolyNftRegistry.fuse()
    mapping(uint256 => uint256[]) public fusionSourceTokenIdsMap;

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
        uint256[] memory fusionSourceTokenIds
    ) external {
        uint256 tokenId = mint(to);

        _tokenURIMap[tokenId] = tokenURI;
        attributeMap[tokenId] = attribute;
        descriptionMap[tokenId] = description;
        fusionSourceTokenIdsMap[tokenId] = fusionSourceTokenIds;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return bytes(_tokenURIMap[tokenId]).length > 0 ? _tokenURIMap[tokenId] : _baseURI();
    }

    function getFusionSourceTokenIds(uint256 tokenId) public view returns(uint256[] memory) {
        return fusionSourceTokenIdsMap[tokenId];
    }

    function getTokenIdsByOwner(address ownerArg) public view returns(uint256[] memory) {
        uint256 balance = balanceOf(ownerArg);
        uint256[] memory tokens = new uint256[](balance);
        uint256 index = 0;
        for (uint256 i = 0; i < balance; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(ownerArg, i);
            if (ownerOf(tokenId) == ownerArg) {
                tokens[index] = tokenId;
                index++;
            }
        }
        return tokens;
    }
}
