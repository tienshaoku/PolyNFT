import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { ethers, deployments } = hre
    const deployer = await ethers.getNamedSigner("polyNftDeployer")

    await deployments.deploy("PolyNftRegistry", {
        from: deployer.address,
        contract: "PolyNftRegistry",
        args: [],
        skipIfAlreadyDeployed: true,
        proxy: false,
        log: true
    })
}

func.tags = ["PolyNftRegistry"]

export default func
