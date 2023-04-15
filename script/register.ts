import { ethers, deployments } from "hardhat"
import { PolyNftFactory } from "../typechain-types"

async function main() {
    const polyNftRegistryDeployments = await deployments.get("PolyNftRegistry")
    const polyNftRegistryInstance = (await ethers.getContractAt(
        "PolyNftRegistry",
        polyNftRegistryDeployments.address,
    )) as PolyNftFactory

    const ipfsArray = [
        "https://ipfs.io/ipfs/QmbPbq16xF4PsowtbSDKa4qcWFManZAnvYbfxhjMPgZ8Jw", // volley ball
        "https://ipfs.io/ipfs/QmW9ukmor2y3SGjMp5VjA5QYvpsJ7n5bMo5etMizHLFCd7", // bubble tea 
        "https://ipfs.io/ipfs/QmYhwAmRFCbsUFvySxMC8iT1qqj2kEzbi3ZQVUatuZxUPY", // coffee
        "https://ipfs.io/ipfs/QmXkLzs3jo9APcUtzAWsG1gy7AmfN8r7L68uei3Ap1An2w", // diamond
        "https://ipfs.io/ipfs/QmaH619MN8JBymMh1FtyGeLUQvBf3ZWUTy3pNsLCga3fyH", // head phone + bubble tea
    ]

    // await polyNftRegistryInstance.create(projectName, projectName, projectSymbol, baseURI, fusionImplementation)
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
