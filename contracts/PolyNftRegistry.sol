pragma solidity 0.8.18;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IPolyNftErc721 } from "./interface/IPolyNftErc721.sol";

// default price is in ETH
contract PolyNftRegistry is Ownable {
    uint24 internal constant _FEE_RATIO = 0.01e6; // 1% in decimal 6

    struct OrderInfo {
        address polyNftErc721;
        uint256 tokenId;
        uint256 price;
        uint256 timeDuration;
    }

    mapping(address => OrderInfo[]) public orderMap;
    mapping(bytes32 => address) public orderInfoHashMap;

    function register(OrderInfo calldata orderInfoArg) external {
        // PNR_NO: not owner
        require(IPolyNftErc721(orderInfoArg.polyNftErc721).ownerOf(orderInfoArg.tokenId) == msg.sender, "PNR_NO");
        IPolyNftErc721(orderInfoArg.polyNftErc721).transferFrom(msg.sender, address(this), orderInfoArg.tokenId);
        orderMap[msg.sender].push(orderInfoArg);

        bytes32 orderInfoHash = keccak256(
            abi.encodePacked(
                orderInfoArg.polyNftErc721,
                orderInfoArg.tokenId,
                block.timestamp
            )
        );
        orderInfoHashMap[orderInfoHash] = msg.sender;
    }

    // deregister
    function deregister(OrderInfo calldata orderInfoArg) external {}

    // will call fustion() of implementation address
    function fusion(OrderInfo[] calldata orderInfosArg) external payable {
        uint256 orderInfoLength = orderInfosArg.length;
        uint256 totalPrice;
        bytes[] memory attributes = new bytes[](orderInfoLength);

        for (uint256 i = 0; i < orderInfoLength; ++i) {
            totalPrice += orderInfosArg[i].price;
            attributes[i] = IPolyNftErc721(orderInfosArg[i].polyNftErc721).getTokenAttribute(orderInfosArg[i].tokenId);
        }

        // PNR_NEP: not enoungh price
        require(msg.value >= totalPrice, "PNR_NEP");

        // TODO: need to refactor
        // distribute profit here, use fixed rate now
        for (uint256 i = 0; i < orderInfoLength; ++i) {
            payable(orderInfoHashMap[keccak256(
                abi.encodePacked(
                    orderInfosArg[i].polyNftErc721,
                    orderInfosArg[i].tokenId,
                    block.timestamp
                )
            )]).transfer(orderInfosArg[i].price *  _FEE_RATIO / 1e6);
        }

        // call the implemnation address
    }
}
