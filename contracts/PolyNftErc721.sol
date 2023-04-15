pragma solidity 0.8.1;

import { ERC721PresetMinterPauserAutoId } from "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import { PolyNftFactory } from "./PolyNftFactory.sol";

contract PolyNftErc721 is ERC721PresetMinterPauserAutoId {
    address public factory;
    address public registry;
    address public fusionImplementation;
    mapping(uint256 => string) private _tokenURIMap;
    mapping(uint256 => bytes) public attributeMap;
    mapping(uint256 => string) public descriptionMap;

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

    function mint(address to, string memory tokenURI, bytes memory attribute, string memory description) external  {
        // TODO: add access control, owner, registry or everyone

        mint(to);

        // sub 1 cuz totalSupply() is already incremented by 1 in the above mint()
        uint256 tokenId = totalSupply() - 1;
        
        _tokenURIMap[tokenId] = tokenURI;
        attributeMap[tokenId] = attribute;
        descriptionMap[tokenId] = description;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return bytes(_tokenURIMap[tokenId]).length > 0 ? _tokenURIMap[tokenId] : _baseURI();
    }

}
