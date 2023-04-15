pragma solidity 0.8.18;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { PolyNftErc721 } from "./PolyNftErc721.sol";

contract PolyNftFactory is Ownable {
    address private _registry;

    constructor(address registry) {
        _registry = registry;
    }

    function create(
        string calldata nameArg,
        string calldata symbalArg,
        string calldata baseTokenURI,
        address fustionImplentation
    ) external returns (address) {
        PolyNftErc721 polyNftErc721 = new PolyNftErc721(nameArg, symbalArg, baseTokenURI, fustionImplentation, _registry);

        return address(polyNftErc721);
    }
}
