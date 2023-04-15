import { JsonRpcProvider } from "@ethersproject/providers"
import Big from "big.js"
import { CHAIN_ID, RPC_URL_HTTPS } from "constants/env"
import { ContractReceipt, Signer } from "ethers"
import { big2BigNum, bigNum2Big } from "utils/number"
import { PolyNftRegistry, PolyNftRegistry__factory } from "../typechain"

export interface IOrderInfo {
    polyNftErc721Address: string
    tokenId: Big
    fusionCost: Big
    timestamp: Big
    description: string
}

class PolyNftRegistryClient {
    constructor(private readonly rpcUrl: string) {}
    async getPolyNftRegistry(contractAddr: string, signer?: Signer): Promise<PolyNftRegistry> {
        const provider = new JsonRpcProvider(this.rpcUrl, CHAIN_ID)
        return PolyNftRegistry__factory.connect(contractAddr, signer ? signer : provider)
    }

    async register(orderInfo: IOrderInfo, contractAddr: string, signer?: Signer): Promise<ContractReceipt> {
        const polyNftRegistry = await this.getPolyNftRegistry(contractAddr, signer)

        const tx = await polyNftRegistry.register({
            polyNftErc721: orderInfo.polyNftErc721Address,
            tokenId: big2BigNum(orderInfo.tokenId, 0),
            fusionCost: big2BigNum(orderInfo.fusionCost, 0),
            timestamp: big2BigNum(orderInfo.timestamp, 0),
            description: orderInfo.description,
        })
        return tx.wait()
    }

    async fuse(
        orderInfos: IOrderInfo[],
        tokenURI: string,
        description: string,
        contractAddr: string,
        signer?: Signer,
    ): Promise<ContractReceipt> {
        const polyNftRegistry = await this.getPolyNftRegistry(contractAddr, signer)
        const array = orderInfos.map(val => ({
            polyNftErc721: val.polyNftErc721Address,
            tokenId: big2BigNum(val.tokenId, 0),
            fusionCost: big2BigNum(val.fusionCost, 0),
            timestamp: big2BigNum(val.timestamp, 0),
            description: val.description,
        }))

        const tx = await polyNftRegistry.fuse(array, tokenURI, description)
        return tx.wait()
    }

    async getOrdersByOwner(address: string, contractAddr: string, signer?: Signer): Promise<IOrderInfo[]> {
        const polyNftRegistry = await this.getPolyNftRegistry(contractAddr, signer)
        const array = await polyNftRegistry.callStatic.getOrdersByOwner(address)
        return array.map(
            val =>
                ({
                    polyNftErc721Address: val[0],
                    tokenId: bigNum2Big(val[1], 0),
                    fusionCost: bigNum2Big(val[2], 0),
                    timestamp: bigNum2Big(val[3], 0),
                    description: val[4],
                } as IOrderInfo),
        )
    }

    async getOrdersByErc721(address: string, contractAddr: string, signer?: Signer): Promise<IOrderInfo[]> {
        const polyNftRegistry = await this.getPolyNftRegistry(contractAddr, signer)
        const array = await polyNftRegistry.callStatic.getOrdersByPolyNftErc721(address)
        return array.map(
            val =>
                ({
                    polyNftErc721Address: val[0],
                    tokenId: bigNum2Big(val[1], 0),
                    fusionCost: bigNum2Big(val[2], 0),
                    timestamp: bigNum2Big(val[3], 0),
                    description: val[4],
                } as IOrderInfo),
        )
    }

    async getOwnerByOrderHash(bytes: string, contractAddr: string, signer?: Signer): Promise<string> {
        const polyNftRegistry = await this.getPolyNftRegistry(contractAddr, signer)
        return await polyNftRegistry.callStatic.ownerMapByOrderHash(bytes)
    }

    async getMaxFusionAmount(contractAddr: string, signer?: Signer): Promise<Big> {
        const polyNftRegistry = await this.getPolyNftRegistry(contractAddr, signer)
        return await polyNftRegistry.callStatic.MAX_FUSION_AMOUNT().then(it => new Big(it))
    }

    async getFeeRatio(contractAddr: string, signer?: Signer): Promise<Big> {
        const polyNftRegistry = await this.getPolyNftRegistry(contractAddr, signer)
        return await polyNftRegistry.callStatic.FEE_RATIO().then(it => new Big(it))
    }
}

export const polyNftRegistryClient = new PolyNftRegistryClient(RPC_URL_HTTPS)
