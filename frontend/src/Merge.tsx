import { Container, Heading, Highlight } from "@chakra-ui/react"
import { Header } from "Header"
import NFTMergeManager from "components/NFTMergeManager"
import { POLY_NFT_REGISTRY_ADDR } from "constants/address"
import { useEffect, useState } from "react"
import { IOrderTokenInfo, polyNftRegistryClient } from "services/PolyNftRegistry"
import { polyNftFactoryClient } from "services/PolyNftFactory"
import { NFTItemProps } from "components/NFTItem"
export function Merge() {
    const projectName = "Cute Shark Family" // TODO: get from params

    const [orderInfos, setOrderInfos] = useState<NFTItemProps[]>([{ id: "1" }, { id: "2" }])

    useEffect(() => {
        async function init() {
            const projectErc721Address = await polyNftFactoryClient.getProjectErc721ByName(
                projectName,
                POLY_NFT_REGISTRY_ADDR,
            )
            console.log({ projectErc721Address })
            const orderTokenInfoList = await polyNftRegistryClient.getOrdersByErc721(
                projectErc721Address,
                POLY_NFT_REGISTRY_ADDR,
            )
            console.log({ orderTokenInfoList })

            // TODO: contract will add a new function to return order info with tokenInfo
            // const ordersWithTokenInfoList = await polyNftRegistryClient.getOrders(projectErc721Address)
            setOrderInfos(orderTokenInfoList.map(i => ({ id: i.tokenId.toString() })))
        }
        init()
    }, [projectName])

    return (
        <>
            <Header />
            <Container>
                <Heading mt={4} mb={8} textAlign={"center"}>
                    <Highlight query={"FUSE!"} styles={{ px: "2", py: "1", bg: "orange.100", rounded: "full" }}>
                        Select an NFT to FUSE!
                    </Highlight>
                </Heading>
                <NFTMergeManager items={orderInfos} />
            </Container>
        </>
    )
}
