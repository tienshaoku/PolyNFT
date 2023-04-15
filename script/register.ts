import { ethers, deployments } from "hardhat"
import { IPolyNftErc721, PolyNftFactory, PolyNftRegistry } from "../typechain-types"
import { parseEther } from "ethers/lib/utils"

async function main() {
    const polyNftFactoryDeployments = await deployments.get("PolyNftFactory")
    const polyNftFactoryInstance = (await ethers.getContractAt(
        "PolyNftFactory",
        polyNftFactoryDeployments.address,
    )) as PolyNftFactory

    const polyNftRegistryDeployments = await deployments.get("PolyNftRegistry")
    const polyNftRegistryInstance = (await ethers.getContractAt(
        "PolyNftRegistry",
        polyNftRegistryDeployments.address,
    )) as PolyNftRegistry

    const projectName = "Cute Shark Family"

    const erc721Address = await polyNftFactoryInstance.projectMap(projectName)
    const erc721Instance = (await ethers.getContractAt("IPolyNftErc721", erc721Address)) as IPolyNftErc721

    await erc721Instance.approve(polyNftRegistryDeployments.address, 0)
    await polyNftRegistryInstance.register({
        polyNftErc721: "0x7A45ffa6e41c5ACCE672AE2c09558666ACb5fdF2",
        tokenId: 0,
        fusionCost: parseEther("0.001"),
        description: `Register a new project to PolyNFT, tokenId: 0`,
    })

    await erc721Instance.approve(polyNftRegistryDeployments.address, 1)
    await polyNftRegistryInstance.register({
        polyNftErc721: "0x7A45ffa6e41c5ACCE672AE2c09558666ACb5fdF2",
        tokenId: 1,
        fusionCost: parseEther("0.001"),
        description: `Register a new project to PolyNFT, tokenId: 1`,
    })
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
