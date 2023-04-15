import { JsonRpcProvider, getNetwork } from "@ethersproject/providers"
import { RPC_URL_HTTPS } from "constants/env"
import { Signer } from "ethers"
import { PolyNftRegistry, PolyNftRegistry__factory } from "../../../typechain-types"

class PolyNftRegistryClient {
    constructor(private readonly rpcUrl: string) {}
    async getPolyNftRegistry(contractAddr: string, signer?: Signer): Promise<PolyNftRegistry> {
        const provider = new JsonRpcProvider(this.rpcUrl, getNetwork("optimism-goerli"))
        return PolyNftRegistry__factory.connect(contractAddr, signer ? signer : provider)
    }
}

export const polyNftRegistryClient = new PolyNftRegistryClient(RPC_URL_HTTPS)
