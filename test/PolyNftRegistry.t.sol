pragma solidity 0.8.1;

import "forge-std/Test.sol";
import { PolyNftRegistry } from "../contracts/PolyNftRegistry.sol";
import { PolyNftFactory } from "../contracts/PolyNftFactory.sol";
import { PolyNftErc721 } from "../contracts/PolyNftErc721.sol";
import { IPolyNftErc721, IERC721 } from "../contracts/Interface/IPolyNftErc721.sol";

contract PolyNftRegistryTest is Test {
    PolyNftRegistry polyNftRegistry;
    PolyNftFactory polyNftFactory;
    PolyNftErc721 polyNftErc721;

    string projectName = "Cute Shark Family";
    string name = "Cute Shark Family";
    string projectSymbol = "CuteShark";
    string projectBaseURI = "https://cuteshark.com/";
    string description = "Soooo Cute";
    bytes attribute = new bytes(0);
    uint256[] fusionSourceTokenIds = new uint256[](0);

    function setUp() public {
        polyNftRegistry = new PolyNftRegistry();
        polyNftFactory = new PolyNftFactory(address(polyNftRegistry));

        polyNftErc721 = PolyNftErc721(
            polyNftFactory.create(projectName, name, projectSymbol, projectBaseURI, address(0))
        );
    }

    function test_getOrdersInfoByPolyNftErc721() public {
        vm.startPrank(address(42));

        polyNftErc721.mint(address(42), projectBaseURI, attribute, description, fusionSourceTokenIds);
        polyNftErc721.approve(address(polyNftRegistry), 0);

        PolyNftRegistry.RegisterInputParam memory registerInputParam = PolyNftRegistry.RegisterInputParam({
            polyNftErc721: address(polyNftErc721),
            tokenId: 0,
            fusionCost: 1 ether,
            description: "test"
        });

        polyNftRegistry.register(registerInputParam);

        polyNftRegistry.getOrdersInfoByPolyNftErc721(address(polyNftErc721));
        vm.stopPrank();
    }
}
