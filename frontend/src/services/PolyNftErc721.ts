import { JsonRpcProvider, getNetwork } from "@ethersproject/providers"
import { RPC_URL_HTTPS } from "constants/env"
import { Signer } from "ethers"
import { PolyNftErc721, PolyNftErc721__factory } from "../typechain"

class PolyNftErc721Client {
    constructor(private readonly rpcUrl: string) {}
    async getPolyNftErc721(contractAddr: string, signer?: Signer): Promise<PolyNftErc721> {
        const provider = new JsonRpcProvider(this.rpcUrl, getNetwork("optimism-goerli"))
        return PolyNftErc721__factory.connect(contractAddr, signer ? signer : provider)
    }
}

export const polyNftErc721Client = new PolyNftErc721Client(RPC_URL_HTTPS)
