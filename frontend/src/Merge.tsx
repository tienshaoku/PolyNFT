import { Container, Heading, Highlight } from "@chakra-ui/react"
import { Header } from "Header"
import { NFTItemProps } from "components/NFTItem"
import NFTMergeManager from "components/NFTMergeManager"
import { POLY_NFT_FACTORY_ADDR, POLY_NFT_REGISTRY_ADDR } from "constants/address"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { polyNftFactoryClient } from "services/PolyNftFactory"
import { polyNftRegistryClient } from "services/PolyNftRegistry"
export function Merge() {
    const { projectName } = useParams()

    const [orderInfos, setOrderInfos] = useState<NFTItemProps[]>([])

    useEffect(() => {
        async function init() {
            if (!projectName) {
                return
            }
            console.log({ POLY_NFT_REGISTRY_ADDR, POLY_NFT_FACTORY_ADDR })
            const projectErc721Address = await polyNftFactoryClient.getProjectErc721ByName(
                projectName,
                POLY_NFT_FACTORY_ADDR,
            )
            console.log({ projectErc721Address })
            const orderTokenInfoList = await polyNftRegistryClient.getOrdersByErc721(
                projectErc721Address,
                POLY_NFT_REGISTRY_ADDR,
            )
            console.log({ orderTokenInfoList })

            setOrderInfos(
                orderTokenInfoList.map(i => ({
                    id: i.tokenId.toString(),
                    imageUri: i.tokenURI,
                    orderData: {
                        polyNftErc721Address: i.polyNftErc721,
                        tokenId: i.tokenId,
                        fusionCost: i.fusionCost,
                        timestamp: i.timestamp,
                        description: i.description,
                    },
                })),
            )
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
                {projectName && <NFTMergeManager items={orderInfos} projectName={projectName} />}
            </Container>
        </>
    )
}
