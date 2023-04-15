pragma solidity 0.8.18;

import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IPolyNftErc721 is IERC721 {
    function setTokenURI(uint256 tokneIdArg, string calldata tokenURIArg) external;

    function setTokenAttribute(uint256 tokneIdArg, bytes calldata attributeArg) external;

    function getTokenAttribute(uint256 tokenId) external view returns (bytes memory);

    function getFustionImplentation() external view returns (address);
}
