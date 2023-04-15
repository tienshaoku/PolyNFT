pragma solidity 0.8.1;

import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IPolyNftErc721 is IERC721 {
    struct TokenInfo {
        uint256 tokenId;
        string tokenURI;
        bytes attribute;
        string description;
        uint256[] fusionSourceTokenIds;
    }

    function mint(
        address to,
        bytes memory tokenURO,
        bytes memory attribute,
        string memory description,
        uint256[] memory sourceTokenIds
    ) external;

    function getTokenAttribute(uint256 tokenId) external view returns (bytes memory);

    function getFusionImplementation() external view returns (address);

    function totalSupply() external view returns (uint256);

    function tokenURI(uint256 tokenId) external view returns (string memory);

    function getFusionSourceTokenIds(uint256 tokenId) external view returns (uint256[] memory);
}
