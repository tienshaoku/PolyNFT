import { JsonRpcProvider } from "@ethersproject/providers"
import Big from "big.js"
import { CHAIN_ID, RPC_URL_HTTPS } from "constants/env"
import { ContractReceipt, Signer } from "ethers"
import { big2BigNum, bigNum2Big } from "utils/number"
import { PolyNftErc721, PolyNftErc721__factory } from "../typechain"

export interface IErc721TokenInfo {
    tokenId: string
    tokenURI: string
    attribute: string
    description: string
    fusionSourceTokenIds: string[]
}

class PolyNftErc721Client {
    constructor(private readonly rpcUrl: string) {}
    async getPolyNftErc721(contractAddr: string, signer?: Signer): Promise<PolyNftErc721> {
        const provider = new JsonRpcProvider(this.rpcUrl, CHAIN_ID)
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

    async getTotalSupply(nftProjectAddr: string, signer?: Signer): Promise<Big> {
        const polyNftErc721 = await this.getPolyNftErc721(nftProjectAddr, signer)
        return bigNum2Big(await polyNftErc721.callStatic.totalSupply(), 0)
    }

    // TODO: need to implement getTokenInfo in contract
    async getTokenInfo(tokenId: Big, contractAddr: string, signer?: Signer): Promise<IErc721TokenInfo> {
        const tokenURI = await this.getTokenURI(tokenId, contractAddr, signer)
        const attribute = await this.getAttribute(tokenId, contractAddr, signer)
        const description = await this.getDescription(tokenId, contractAddr, signer)
        const fusionSourceTokenIds = await this.getFusionSourceTokenIds(tokenId, contractAddr, signer)
        return {
            tokenId: tokenId.toString(),
            tokenURI,
            attribute,
            description,
            fusionSourceTokenIds: fusionSourceTokenIds.map(val => val.toString()),
        }
    }

    async getAllTokensInfo(contractAddr: string, signer?: Signer): Promise<IErc721TokenInfo[]> {
        const polyNftErc721 = await this.getPolyNftErc721(contractAddr, signer)
        const rawAllTokensInfo = await polyNftErc721.callStatic.getAllTokensIndo()
        return rawAllTokensInfo.map(info => ({
            tokenId: info.tokenId.toString(),
            tokenURI: info.tokenURI,
            attribute: info.attribute,
            description: info.description,
            fusionSourceTokenIds: info.fusionSourceTokenIds.map(v => v.toString()),
        }))
    }
}

export const polyNftErc721Client = new PolyNftErc721Client(RPC_URL_HTTPS)
