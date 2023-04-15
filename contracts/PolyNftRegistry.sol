pragma solidity 0.8.18;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IPolyNftErc721, IERC721 } from "./interface/IPolyNftErc721.sol";
import { IPolyNftFusionImp } from "./interface/IPolyNftFusionImp.sol";

// default price is in ETH
contract PolyNftRegistry is Ownable {
    struct OrderInfo {
        address polyNftErc721;
        uint256 tokenId;
        uint256 price;
        uint256 timestamp;
        string prompt;
    }

    // fee ratio to platform
    uint24 internal constant _FEE_RATIO = 0.01e6; // 1% in decimal 6


    mapping(address => OrderInfo[]) public polyNftErc721OrderMap;
    mapping(address => OrderInfo[]) public orderMap;
    mapping(bytes32 => address) public orderInfoHashMap;

    function register(OrderInfo calldata orderInfoArg) external {
        // PNR_NO: not owner
        require(IPolyNftErc721(orderInfoArg.polyNftErc721).ownerOf(orderInfoArg.tokenId) == msg.sender, "PNR_NO");
        IPolyNftErc721(orderInfoArg.polyNftErc721).transferFrom(msg.sender, address(this), orderInfoArg.tokenId);
        orderMap[msg.sender].push(orderInfoArg);

        bytes32 orderInfoHash = keccak256(
            abi.encodePacked(orderInfoArg.polyNftErc721, orderInfoArg.tokenId, block.timestamp)
        );
        orderInfoHashMap[orderInfoHash] = msg.sender;
    }

    // deregister
    function deregister(OrderInfo calldata orderInfoArg) external {}

    // will call fustion() of implementation address
    function fusion(OrderInfo[] calldata orderInfosArg, string calldata prompt) external payable {
        uint256 orderInfoLength = orderInfosArg.length;
        uint256 totalPrice;
        bytes[] memory attributes = new bytes[](orderInfoLength);

        for (uint256 i = 0; i < orderInfoLength; ++i) {
            totalPrice += orderInfosArg[i].price;
            attributes[i] = IPolyNftErc721(orderInfosArg[i].polyNftErc721).getTokenAttribute(orderInfosArg[i].tokenId);
            payable(
                orderInfoHashMap[
                    keccak256(
                        abi.encodePacked(orderInfosArg[i].polyNftErc721, orderInfosArg[i].tokenId, block.timestamp)
                    )
                ]
            ).transfer((orderInfosArg[i].price * (1e6 - _FEE_RATIO)) / 1e6);

            // check all of the polyNftErc721 is the same
            if (i > 0) {
                // PNR_NS: not the same
                require(orderInfosArg[i].polyNftErc721 == orderInfosArg[i - 1].polyNftErc721, "PNR_NS");
            }
        }

        // PNR_NEP: not enoungh price
        require(msg.value >= totalPrice, "PNR_NEP");

        // call the implemnation address
        address polyNftErc721 = orderInfosArg[0].polyNftErc721;
        address fusionImp = IPolyNftErc721(polyNftErc721).getFustionImplentation();
        bytes memory fusionAttribute = IPolyNftFusionImp(fusionImp).fusion(attributes);

        // mint fusion NFT
        IPolyNftErc721(polyNftErc721).mint(msg.sender, fusionAttribute, prompt);
    }
}
