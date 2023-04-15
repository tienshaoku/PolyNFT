pragma solidity 0.8.1;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { PolyNftErc721 } from "./PolyNftErc721.sol";

contract PolyNftFactory is Ownable {
    address public registry;
    mapping(address => address) public erc721Owner;

    constructor(address registryArg) {
        registry = registryArg;
    }

    function create(
        string calldata name,
        string calldata symbol,
        string calldata tokenURI,
        address fusionImplementation
    ) external returns (address) {
        PolyNftErc721 erc721 = new PolyNftErc721(name, symbol, tokenURI, fusionImplementation);
        address erc721Addr = address(erc721);
        erc721Owner[erc721Addr] = msg.sender;

        return erc721Addr;
    }
}
