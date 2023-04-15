pragma solidity 0.8.1;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IPolyNftErc721, IERC721 } from "./Interface/IPolyNftErc721.sol";
import { IPolyNftFusionImp } from "./Interface/IPolyNftFusionImp.sol";

contract PolyNftRegistry is Ownable {
    /// @param fusionCost default in ETH
    struct OrderInfo {
        address polyNftErc721;
        uint256 tokenId;
        uint256 fusionCost;
        uint256 timestamp;
        string description;
    }

    // fee ratio of platform
    uint24 internal constant _FEE_RATIO = 0.01e6; // 1% in decimal 6
    uint24 internal constant _MAX_FUSE_AMOUNT = 10; // TODO: need to add set function (onlyOwner)

    // 721 -> token order list
    mapping(address => OrderInfo[]) public polyNftErc721OrderMap;
    // owner -> token order
    mapping(address => OrderInfo[]) public orderMap;
    // token order hash -> owner
    mapping(bytes32 => address) public orderInfoHashMap;

    function register(OrderInfo calldata orderInfoArg) external {
        // PNR_NO: not owner
        require(IPolyNftErc721(orderInfoArg.polyNftErc721).ownerOf(orderInfoArg.tokenId) == msg.sender, "PNR_NO");
        IPolyNftErc721(orderInfoArg.polyNftErc721).transferFrom(msg.sender, address(this), orderInfoArg.tokenId);
        orderMap[msg.sender].push(orderInfoArg);
        polyNftErc721OrderMap[orderInfoArg.polyNftErc721].push(orderInfoArg);

        bytes32 orderInfoHash = keccak256(
            abi.encodePacked(orderInfoArg.polyNftErc721, orderInfoArg.tokenId, block.timestamp)
        );
        orderInfoHashMap[orderInfoHash] = msg.sender;
    }

    // deregister will implement later
    function deregister(OrderInfo calldata orderInfoArg) external {}

    // will call fuse() of implementation address
    function fuse(
        OrderInfo[] calldata orderInfosArg,
        bytes calldata tokenURI,
        string calldata description
    ) external payable {
        uint256 orderInfoLength = orderInfosArg.length;

        // PNR_TMO: too much orders
        require(orderInfoLength <= _MAX_FUSE_AMOUNT, "PNR_TMO");

        uint256 totalFusionCost;
        bytes[] memory attributes = new bytes[](orderInfoLength);
        uint256[] memory sourceTokenIds = new uint256[](orderInfoLength);

        for (uint256 i = 0; i < orderInfoLength; ++i) {
            totalFusionCost += orderInfosArg[i].fusionCost;
            attributes[i] = IPolyNftErc721(orderInfosArg[i].polyNftErc721).getTokenAttribute(orderInfosArg[i].tokenId);
            sourceTokenIds[i] = orderInfosArg[i].tokenId;
            payable(
                orderInfoHashMap[
                    keccak256(
                        abi.encodePacked(orderInfosArg[i].polyNftErc721, orderInfosArg[i].tokenId, block.timestamp)
                    )
                ]
            ).transfer((orderInfosArg[i].fusionCost * (1e6 - _FEE_RATIO)) / 1e6);

            // check all of the polyNftErc721 is the same
            if (i > 0) {
                // PNR_NS: not the same
                require(orderInfosArg[i].polyNftErc721 == orderInfosArg[i - 1].polyNftErc721, "PNR_NS");
            }
        }

        // PNR_NEP: not enoungh fusionCost
        require(msg.value >= totalFusionCost, "PNR_NEP");

        // call the implemnation address
        address polyNftErc721 = orderInfosArg[0].polyNftErc721;
        address fusionImp = IPolyNftErc721(polyNftErc721).getFusionImplementation();
        bytes memory fusionAttribute;

        if (fusionImp != address(0)) {
            fusionAttribute = IPolyNftFusionImp(fusionImp).fuse(attributes);
        }

        // mint fusion NFT
        IPolyNftErc721(polyNftErc721).mint(msg.sender, tokenURI, fusionAttribute, description, sourceTokenIds);
    }
}
