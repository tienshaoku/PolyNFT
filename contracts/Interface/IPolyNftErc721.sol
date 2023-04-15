pragma solidity 0.8.18;

import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IPolyNftErc721 is IERC721 {
    function mint(address to, bytes memory attribute, string memory prompt) external;

    function getTokenAttribute(uint256 tokenId) external view returns (bytes memory);

    function getFustionImplentation() external view returns (address);
}
