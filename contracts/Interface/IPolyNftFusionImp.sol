pragma solidity 0.8.1;

interface IPolyNftFusionImp {
    function fuse(bytes[] calldata attributeArray) external returns (bytes memory attribute);
}
