pragma solidity 0.8.18;

interface IPolyNftFusionImp {
    function fusion(bytes[] calldata attributeArray) external returns (bytes memory attribute);
}
