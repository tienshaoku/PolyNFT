import { Box, Grid } from "@chakra-ui/react"
import { Header } from "Header"
import Big from "big.js"
import { POLY_NFT_FACTORY_ADDR } from "constants/address"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { IErc721TokenInfo, polyNftErc721Client } from "services/PolyNftErc721"
import { polyNftFactoryClient } from "services/PolyNftFactory"

export function ProjectListDetail() {
    const { projectName } = useParams()
    const [tokenInfos, setTokenInfos] = useState<IErc721TokenInfo[]>([])

    useEffect(() => {
        async function init() {
            const projectErc721Address = await polyNftFactoryClient.getProjectErc721ByName(
                projectName!,
                POLY_NFT_FACTORY_ADDR,
            )
            const totalSupply = Number(
                (await polyNftErc721Client.getTotalSupply(projectErc721Address, projectErc721Address)).toString(),
            )
            console.log("debug:", "totalSupply:", totalSupply)

            const tokenInfoArray: IErc721TokenInfo[] = []

            for (let i = 0; i < totalSupply; i++) {
                const tokenInfo = await polyNftErc721Client.getTokenInfo(Big(i), projectErc721Address)
                tokenInfoArray.push(tokenInfo)
            }
            setTokenInfos(tokenInfoArray)
        }
        init()
    }, [projectName])

    return (
        <>
            <Header />
            <Grid bgColor="black" h="calc(100vh - 80px)" p="24px" color="white">
                {tokenInfos.map((info, index) => (
                    <Box key={index}>
                        {info.description}
                        {info.tokenId}
                        {info.tokenURI}
                        {info.attribute}
                        {info.fusionSourceTokenIds}
                    </Box>
                ))}
            </Grid>
        </>
    )
}
