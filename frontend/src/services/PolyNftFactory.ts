import { JsonRpcProvider } from "@ethersproject/providers"
import { CHAIN_ID, RPC_URL_HTTPS } from "constants/env"
import { ContractReceipt, Signer, ethers } from "ethers"
import { PolyNftFactory, PolyNftFactory__factory } from "../typechain"

class PolyNftFactoryClient {
    constructor(private readonly rpcUrl: string) {}
    async getPolyNftFactory(contractAddr: string, signer?: Signer): Promise<PolyNftFactory> {
        const provider = new JsonRpcProvider(this.rpcUrl, CHAIN_ID)
        return PolyNftFactory__factory.connect(contractAddr, signer ? signer : provider)
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

    async getProjectsRegistered(contractAddr: string, signer?: Signer): Promise<string[]> {
        const polyNftFactory = await this.getPolyNftFactory(contractAddr, signer)
        return await polyNftFactory.callStatic.getProjects()
    }

    async getProjectErc721ByName(name: string, contractAddr: string, signer?: Signer): Promise<string> {
        const polyNftFactory = await this.getPolyNftFactory(contractAddr, signer)
        return await polyNftFactory.callStatic.projectMap(name)
    }
}

export const polyNftFactoryClient = new PolyNftFactoryClient(RPC_URL_HTTPS)
