import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { ethers, deployments } = hre
    const registryDeployments = await deployments.get("PolyNftRegistry")
    const deployer = await ethers.getNamedSigner("polyNftDeployer")
    
    await deployments.deploy("PolyNftFactory", {
        from: deployer.address,
        contract: "PolyNftFactory",
        args: [registryDeployments.address],
        skipIfAlreadyDeployed: true,
        proxy: false,
        log: true
    })
}

func.tags = ["PolyNftFactory"]

export default func
