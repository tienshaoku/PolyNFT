import { ethers, deployments } from "hardhat"
import { PolyNftFactory } from "../typechain-types"

async function main() {
    const polyNftFactoryDeployments = await deployments.get("PolyNftFactory")
    const polyNftFactoryInstance = (await ethers.getContractAt(
        "PolyNftFactory",
        polyNftFactoryDeployments.address,
    )) as PolyNftFactory
    const projectName = "Cute Shark Family"
    const projectSymbol = "CuteShark"
    const baseURI = "https://ipfs.io/ipfs/QmQo69RRpm52hY6vRALSmvMKZrcpZamr1CzyxZ2cZpRrEY"
    const fusionImplementation = ethers.constants.AddressZero

    await polyNftFactoryInstance.create(projectName, projectName, projectSymbol, baseURI, fusionImplementation)
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
