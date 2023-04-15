pragma solidity 0.8.1;

interface IPolyNftFusionImp {
    function fusion(bytes[] calldata attributeArray) external returns (bytes memory attribute);
}
