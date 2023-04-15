pragma solidity 0.8.1;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IPolyNftErc721, IERC721 } from "./Interface/IPolyNftErc721.sol";
import { IPolyNftFusionImp } from "./Interface/IPolyNftFusionImp.sol";

contract PolyNftRegistry is Ownable {
    // TODO: need to seperate input and output struct, input doesn't need to include timestamp
    // TODO: need to remove description from OrderIngo
    // TODO: need to seperate register and fuse input param strauct
    /// @param fusionCost default in ETH
    // need timestamp to avoit same order but different time list
    struct OrderInfo {
        address polyNftErc721;
        uint256 tokenId;
        uint256 fusionCost;
        uint256 timestamp;
        string description;
    }

    struct RegisterInputParam {
        address polyNftErc721;
        uint256 tokenId;
        uint256 fusionCost;
        string description;
    }

    struct DeRegisterInputParam {
        address polyNftErc721;
        uint256 tokenId;
    }

    // include IokenInfo of ERC721 contract
    struct GetOrderInfoReturnParam {
        uint256 tokenId;
        string tokenURI;
        bytes attribute;
        string description;
        uint256[] fusionSourceTokenIds;
        address polyNftErc721;
        uint256 fusionCost;
    }

    // fee ratio of platform
    uint24 public constant FEE_RATIO = 0.01e6; // 1% in decimal 6
    uint24 public constant MAX_FUSION_AMOUNT = 10; // TODO: need to add set function (onlyOwner)

    // 721 -> token order
    mapping(address => OrderInfo[]) public orderMapByPolyNftErc721;
    // owner -> token order
    mapping(address => OrderInfo[]) public orderMapByOwner;
    // token order hash -> owner
    mapping(bytes32 => address) public ownerMapByOrderHash;

    function register(RegisterInputParam calldata registerInputArg) external {
        // PNR_NO: not owner
        require(
            IPolyNftErc721(registerInputArg.polyNftErc721).ownerOf(registerInputArg.tokenId) == msg.sender,
            "PNR_NO"
        );

        OrderInfo memory orderInfo = OrderInfo(
            registerInputArg.polyNftErc721,
            registerInputArg.tokenId,
            registerInputArg.fusionCost,
            block.timestamp,
            registerInputArg.description
        );

        IPolyNftErc721(orderInfo.polyNftErc721).transferFrom(msg.sender, address(this), orderInfo.tokenId);
        orderMapByOwner[msg.sender].push(orderInfo);
        orderMapByPolyNftErc721[orderInfo.polyNftErc721].push(orderInfo);

        bytes32 orderInfoHash = keccak256(
            abi.encodePacked(orderInfo.polyNftErc721, orderInfo.tokenId, block.timestamp)
        );
        ownerMapByOrderHash[orderInfoHash] = msg.sender;
    }

    // deregister will implement later
    function deregister(DeRegisterInputParam calldata deRegisterInputArg) external {}

    // will call fuse() of implementation address
    function fuse(
        OrderInfo[] calldata orderInfosArg,
        string calldata tokenURI,
        string calldata description
    ) external payable {
        uint256 orderInfoLength = orderInfosArg.length;

        // PNR_TMO: too much orders
        require(orderInfoLength <= MAX_FUSION_AMOUNT, "PNR_TMO");

        uint256 totalFusionCost;
        bytes[] memory attributes = new bytes[](orderInfoLength);
        uint256[] memory sourceTokenIds = new uint256[](orderInfoLength);

        for (uint256 i = 0; i < orderInfoLength; ++i) {
            totalFusionCost += orderInfosArg[i].fusionCost;
            attributes[i] = IPolyNftErc721(orderInfosArg[i].polyNftErc721).getTokenAttribute(orderInfosArg[i].tokenId);
            sourceTokenIds[i] = orderInfosArg[i].tokenId;

            payable(
                ownerMapByOrderHash[
                    keccak256(
                        abi.encodePacked(orderInfosArg[i].polyNftErc721, orderInfosArg[i].tokenId, block.timestamp)
                    )
                ]
            ).transfer((orderInfosArg[i].fusionCost * (1e6 - FEE_RATIO)) / 1e6);

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

    // this function is for FE, not suggest to use in contract interaction
    function getOrdersInfoByPolyNftErc721(address erc721) external view returns (GetOrderInfoReturnParam[] memory) {
        // return already listed orders info
        uint256 orderInfoLength = orderMapByPolyNftErc721[erc721].length;
        GetOrderInfoReturnParam[] memory orderInfos = new GetOrderInfoReturnParam[](orderInfoLength);

        for (uint256 i = 0; i < orderInfoLength; ++i) {
            OrderInfo memory orderInfo = orderMapByPolyNftErc721[erc721][i];
            orderInfos[i] = GetOrderInfoReturnParam(
                orderInfo.tokenId,
                IPolyNftErc721(orderInfo.polyNftErc721).tokenURI(orderInfo.tokenId),
                IPolyNftErc721(orderInfo.polyNftErc721).getTokenAttribute(orderInfo.tokenId),
                orderInfo.description,
                IPolyNftErc721(orderInfo.polyNftErc721).getFusionSourceTokenIds(orderInfo.tokenId),
                orderInfo.polyNftErc721,
                orderInfo.fusionCost
            );
        }

        return orderInfos;
    }

    function getOrdersByOwner(address ownerArg) external view returns (OrderInfo[] memory) {
        return orderMapByOwner[ownerArg];
    }
}
