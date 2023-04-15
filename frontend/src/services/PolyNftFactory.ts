import { JsonRpcProvider, getNetwork } from "@ethersproject/providers"
import { RPC_URL_HTTPS } from "constants/env"
import { ContractReceipt, Signer, ethers } from "ethers"
import { PolyNftFactory, PolyNftFactory__factory } from "../typechain"
import { bigNum2Big } from "../utils/number"

class PolyNftFactoryClient {
    constructor(private readonly rpcUrl: string) {}
    async getPolyNftFactory(contractAddr: string, signer?: Signer): Promise<PolyNftFactory> {
        const provider = new JsonRpcProvider(this.rpcUrl, getNetwork("optimism-goerli"))
        return PolyNftFactory__factory.connect(contractAddr, signer ? signer : provider)
    }

    async getProjectNames(contractAddr: string, signer?: Signer): Promise<string[]> {
        const polyNftFactory = await this.getPolyNftFactory(contractAddr, signer)
        let projectCount = await polyNftFactory.callStatic.projectCount().then(it => bigNum2Big(it, 0).toNumber())
        let projects: string[] = []
        for (let i = 0; i < projectCount; i++) {
            const project = await polyNftFactory.callStatic.project(i)
            projects.push(project)
        }
        return projects
    }

    async createERC721(
        projectName: string,
        erc721Name: string,
        symbol: string,
        tokenURI: string,
        contractAddr: string,
        fusionImplementation: string = ethers.constants.AddressZero,
        signer?: Signer,
    ): Promise<ContractReceipt> {
        const polyNftFactory = await this.getPolyNftFactory(contractAddr, signer)
        const tx = await polyNftFactory.create(projectName, erc721Name, symbol, tokenURI, fusionImplementation)
        return tx.wait()
    }
}

export const polyNftFactoryClient = new PolyNftFactoryClient(RPC_URL_HTTPS)
