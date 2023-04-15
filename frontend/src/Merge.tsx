import { Container, Heading, Highlight } from "@chakra-ui/react"
import { Header } from "Header"
import Big from "big.js"
import NFTMergeManager from "components/NFTMergeManager"
import { POLY_NFT_FACTORY_ADDR } from "constants/address"
import { useEffect, useState } from "react"
import { IOrderInfo, polyNftRegistryClient } from "services/PolyNftRegistry"
import { polyNftFactoryClient } from "services/PolyNftFactory"
import { NFTItemProps } from "components/NFTItem"
export function Merge() {
    const projectName = "Cute Shark Family" // TODO: get from params

    const [orderInfos, setOrderInfos] = useState<IOrderInfo[]>([
        {
            polyNftErc721Address: "address",
            tokenId: Big("0"),
            fusionCost: Big(10),
            description: "hihi",
            timestamp: Big(12345677),
        },
        {
            polyNftErc721Address: "address",
            tokenId: Big("1"),
            fusionCost: Big(10),
            description: "hihi",
            timestamp: Big(12345677),
        },
        {
            polyNftErc721Address: "address",
            tokenId: Big("2"),
            fusionCost: Big(10),
            description: "hihi",
            timestamp: Big(12345677),
        },
        {
            polyNftErc721Address: "address",
            tokenId: Big("3"),
            fusionCost: Big(10),
            description: "hihi",
            timestamp: Big(12345677),
        },
        {
            polyNftErc721Address: "address",
            tokenId: Big("4"),
            fusionCost: Big(10),
            description: "hihi",
            timestamp: Big(12345677),
        },
        {
            polyNftErc721Address: "address",
            tokenId: Big("5"),
            fusionCost: Big(10),
            description: "hihi",
            timestamp: Big(12345677),
        },
        {
            polyNftErc721Address: "address",
            tokenId: Big("6"),
            fusionCost: Big(10),
            description: "hihi",
            timestamp: Big(12345677),
        },
        {
            polyNftErc721Address: "address",
            tokenId: Big("7"),
            fusionCost: Big(10),
            description: "hihi",
            timestamp: Big(12345677),
        },
        {
            polyNftErc721Address: "address",
            tokenId: Big("8"),
            fusionCost: Big(10),
            description: "hihi",
            timestamp: Big(12345677),
        },
        {
            polyNftErc721Address: "address",
            tokenId: Big("9"),
            fusionCost: Big(10),
            description: "hihi",
            timestamp: Big(12345677),
        },
        {
            polyNftErc721Address: "address",
            tokenId: Big("10"),
            fusionCost: Big(10),
            description: "hihi",
            timestamp: Big(12345677),
        },
        {
            polyNftErc721Address: "address",
            tokenId: Big("11"),
            fusionCost: Big(10),
            description: "hihi",
            timestamp: Big(12345677),
        },
    ])

    useEffect(() => {
        async function init() {
            const projectErc721Address = await polyNftFactoryClient.getProjectErc721ByName(
                projectName!,
                POLY_NFT_FACTORY_ADDR,
            )
            // const totalSupply = Number(
            //     (await polyNftRegistryClient.getTotalSupply(projectErc721Address, projectErc721Address)).toString(),
            // )

            // TODO: contract will add a new function to return order info with tokenInfo
            // const ordersWithTokenInfoList = await polyNftRegistryClient.getOrders(projectErc721Address)

            // setOrderInfos(ordersWithTokenInfoList)
        }
        init()
    }, [projectName])

    const items: NFTItemProps[] = orderInfos.map(({ tokenId, fusionCost, description }) => ({
        id: tokenId.toString(),
        cost: fusionCost.toString(),
        description,
    }))

    return (
        <>
            <Header />
            <Container>
                <Heading mt={4} mb={8} textAlign={"center"}>
                    <Highlight query={"FUSE!"} styles={{ px: "2", py: "1", bg: "orange.100", rounded: "full" }}>
                        Select an NFT to FUSE!
                    </Highlight>
                </Heading>
                <NFTMergeManager items={items} />
            </Container>
        </>
    )
}
