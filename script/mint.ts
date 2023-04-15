import { ethers, deployments } from "hardhat"
import { IPolyNftErc721, PolyNftFactory } from "../typechain-types"

function sleep(ms: number): Promise<unknown> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function main() {
    const polyNftFactoryDeployments = await deployments.get("PolyNftFactory")
    const polyNftFactoryInstance = (await ethers.getContractAt(
        "PolyNftFactory",
        polyNftFactoryDeployments.address,
    )) as PolyNftFactory
    const projectName = "Cute Shark Family"

    const erc721Address = await polyNftFactoryInstance.projectMap(projectName)
    const erc721Instance = (await ethers.getContractAt("IPolyNftErc721", erc721Address)) as IPolyNftErc721

    const ipfsArray = [
        "https://ipfs.io/ipfs/QmbPbq16xF4PsowtbSDKa4qcWFManZAnvYbfxhjMPgZ8Jw", // volley ball
        "https://ipfs.io/ipfs/QmW9ukmor2y3SGjMp5VjA5QYvpsJ7n5bMo5etMizHLFCd7", // bubble tea
        "https://ipfs.io/ipfs/QmYhwAmRFCbsUFvySxMC8iT1qqj2kEzbi3ZQVUatuZxUPY", // coffee
    ]

    const description = [
        "Volleyball is a team sport in which two teams of six players are separated by a net. Each team tries to score points by grounding a ball on the other team's court under organized rules.",
        "Bubble tea is a Taiwanese tea-based drink invented in Tainan in the 1980s. It is usually served cold. It is a tea-based drink invented in Tainan in the 1980s. It is usually served cold.",
        "Coffee is a brewed drink prepared from roasted coffee beans, the seeds of berries from certain Coffea species. When coffee berries turn from green to bright red in color – indicating ripeness – they are picked, processed, and dried.",
    ]

    for (let i = 0; i < ipfsArray.length; i++) {
        await erc721Instance.mint(
            "0xf0d342903C88CFfFf0f4c0934520F1bf86C7b2e6",
            ipfsArray[i],
            ethers.constants.HashZero,
            description[i],
            []
        )
        console.log(`Minted ${i}th token`)
        await sleep(10000)
    }
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
