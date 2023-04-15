import { Box, Flex, Image } from "@chakra-ui/react"
import { Layout } from "Layout"
import { Loading } from "components/Loading"
import { POLY_NFT_FACTORY_ADDR } from "constants/address"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IErc721TokenInfo, polyNftErc721Client } from "services/PolyNftErc721"
import { polyNftFactoryClient } from "services/PolyNftFactory"

export function AllToken() {
    const { projectName } = useParams()
    const [tokenInfos, setTokenInfos] = useState<IErc721TokenInfo[]>([])

    useEffect(() => {
        async function init() {
            const tokenAddress = await polyNftFactoryClient.getProjectErc721ByName(projectName!, POLY_NFT_FACTORY_ADDR)
            const tokenInfos = await polyNftErc721Client.getAllTokensInfo(tokenAddress)
            setTokenInfos(tokenInfos)
        }
        init()
    }, [projectName])

    return (
        <Layout>
            {tokenInfos.length === 0 && <Loading />}
            {tokenInfos.length !== 0 && (
                <Flex flexWrap={"wrap"} gap="32px">
                    {tokenInfos.map((info, index) => (
                        <Box key={index} w="400px" border="1px solid" borderRadius={"12px"} p={"16px"}>
                            <Box fontWeight={"bold"} mb="8px">
                                ID: {info.tokenId}
                            </Box>
                            <Image src={info.tokenURI} w="350px" h="350px" />
                            <Box mt="8px" color="gray">
                                {info.description}
                            </Box>
                        </Box>
                    ))}
                </Flex>
            )}
        </Layout>
    )
}
