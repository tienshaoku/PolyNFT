import { JsonRpcProvider, getNetwork } from "@ethersproject/providers"
import { RPC_URL_HTTPS } from "constants/env"
import { ContractReceipt, Signer } from "ethers"
import { PolyNftErc721, PolyNftErc721__factory } from "../typechain"
import { big2BigNum, bigNum2Big } from "utils/number"
import Big from "big.js"

class PolyNftErc721Client {
    constructor(private readonly rpcUrl: string) {}
    async getPolyNftErc721(contractAddr: string, signer?: Signer): Promise<PolyNftErc721> {
        const provider = new JsonRpcProvider(this.rpcUrl, getNetwork("optimism-goerli"))
        return PolyNftErc721__factory.connect(contractAddr, signer ? signer : provider)
    }

    async mint(
        to: string,
        tokenURI: string,
        attribute: string,
        description: string,
        contractAddr: string,
        signer?: Signer,
    ): Promise<ContractReceipt> {
        const polyNftErc721 = await this.getPolyNftErc721(contractAddr, signer)
        const tx = await polyNftErc721["mint(address,string,bytes,string,uint256[])"](
            to,
            tokenURI,
            attribute,
            description,
            [],
        )
        return tx.wait()
    }

    async getFactory(contractAddr: string, signer?: Signer): Promise<string> {
        const polyNftErc721 = await this.getPolyNftErc721(contractAddr, signer)
        return await polyNftErc721.callStatic.factory()
    }

    async getRegistry(contractAddr: string, signer?: Signer): Promise<string> {
        const polyNftErc721 = await this.getPolyNftErc721(contractAddr, signer)
        return await polyNftErc721.callStatic.registry()
    }

    async getFusionImplementation(contractAddr: string, signer?: Signer): Promise<string> {
        const polyNftErc721 = await this.getPolyNftErc721(contractAddr, signer)
        return await polyNftErc721.callStatic.fusionImplementation()
    }

    async getAttribute(tokenId: Big, contractAddr: string, signer?: Signer): Promise<string> {
        const polyNftErc721 = await this.getPolyNftErc721(contractAddr, signer)
        return await polyNftErc721.callStatic.attributeMap(big2BigNum(tokenId, 0))
    }

    async getDescription(tokenId: Big, contractAddr: string, signer?: Signer): Promise<string> {
        const polyNftErc721 = await this.getPolyNftErc721(contractAddr, signer)
        return await polyNftErc721.callStatic.descriptionMap(big2BigNum(tokenId, 0))
    }

    async getTokenURI(tokenId: Big, contractAddr: string, signer?: Signer): Promise<string> {
        const polyNftErc721 = await this.getPolyNftErc721(contractAddr, signer)
        return await polyNftErc721.callStatic.tokenURI(big2BigNum(tokenId, 0))
    }

    async getFusionSourceTokenIds(tokenId: Big, contractAddr: string, signer?: Signer): Promise<Big[]> {
        const polyNftErc721 = await this.getPolyNftErc721(contractAddr, signer)
        const array = await polyNftErc721.callStatic.getFusionSourceTokenIds(big2BigNum(tokenId, 0))
        return array.map(val => bigNum2Big(val, 0))
    }

    async getTokenIdsByOwner(address: string, contractAddr: string, signer?: Signer): Promise<Big[]> {
        const polyNftErc721 = await this.getPolyNftErc721(contractAddr, signer)
        const array = await polyNftErc721.callStatic.getTokenIdsByOwner(address)
        return array.map(val => bigNum2Big(val, 0))
    }
}

export const polyNftErc721Client = new PolyNftErc721Client(RPC_URL_HTTPS)
