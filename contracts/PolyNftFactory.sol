pragma solidity 0.8.1;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { PolyNftErc721 } from "./PolyNftErc721.sol";

contract PolyNftFactory is Ownable {
    address public registry;
    mapping(address => address) public erc721Owner;

    // TODO: need to add whitelist logic to prevent non-allowed project
    string[] public projects;
    mapping(string => address) public projectMap;

    constructor(address registryArg) {
        registry = registryArg;
    }

    function create(
        string calldata projectName,
        string calldata name,
        string calldata symbol,
        string calldata tokenURI,
        address fusionImplementation
    ) external returns (address) {
        // PNF_SPN: same project name
        require(projectMap[projectName] == address(0), "PNF_SPN");

        PolyNftErc721 erc721 = new PolyNftErc721(name, symbol, tokenURI, fusionImplementation);
        address erc721Addr = address(erc721);
        erc721Owner[erc721Addr] = msg.sender;

        projects.push(projectName);
        projectMap[projectName] = erc721Addr;

        return erc721Addr;
    }

    function getProjects() external view returns(string[] memory) {
        return projects;
    }
}
