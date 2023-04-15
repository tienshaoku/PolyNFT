import { Box, Grid } from "@chakra-ui/react"
import { Layout } from "Layout"
import { Loading } from "components/Loading"
import NFTGrid from "components/NFTGrid"
import { NFTItemProps } from "components/NFTItem"
import { POLY_NFT_FACTORY_ADDR, POLY_NFT_REGISTRY_ADDR } from "constants/address"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { polyNftErc721Client } from "services/PolyNftErc721"
import { polyNftFactoryClient } from "services/PolyNftFactory"
import { polyNftRegistryClient } from "services/PolyNftRegistry"
import { useAccount } from "wagmi"

// my profile => registered list, deregistered button
export function Profile() {
    const { address } = useAccount()
    const { projectName } = useParams()
    const [unregisteredNftItems, setUnregisteredNftItems] = useState<NFTItemProps[]>([])
    const [registeredNftItems, setRegisteredNftItems] = useState<NFTItemProps[]>([])
    useEffect(() => {
        async function init() {
            if (address) {
                const tokenAddress = await polyNftFactoryClient.getProjectErc721ByName(
                    projectName!,
                    POLY_NFT_FACTORY_ADDR,
                )
                const _unregisteredNftItems = await polyNftErc721Client.getAllTokenInfoByOwner(address, tokenAddress)
                console.log("debug:", "_allTokenInfoByOwner:", _unregisteredNftItems)
                const _registeredNftItems = await polyNftRegistryClient.getOrdersByOwner(
                    address,
                    POLY_NFT_REGISTRY_ADDR,
                )
                const _registeredNftItemsUri = await Promise.all(
                    _registeredNftItems.map(r => polyNftErc721Client.getTokenURI(r.tokenId, r.polyNftErc721Address)),
                )
                setUnregisteredNftItems(
                    _unregisteredNftItems.map((v, i) => ({
                        id: v.tokenId.toString(),
                        data: {
                            imageUri: v.tokenURI,
                            imageDescription: v.description,
                        },
                        showButton: true,
                        isListed: false,
                    })),
                )
                setRegisteredNftItems(
                    _registeredNftItems.map((v, i) => ({
                        id: v.tokenId.toString(),
                        data: {
                            imageUri: _registeredNftItemsUri[i],
                            imageDescription: v.description,
                        },
                        showButton: true,
                        isListed: true,
                    })),
                )
            }
        }
        init()
    }, [address, projectName])

    const handleSelect = () => {}
    return (
        <Layout>
            <Grid gap="32px" h="100%">
                {(unregisteredNftItems.length === 0 || registeredNftItems.length === 0) && <Loading />}
                {unregisteredNftItems.length !== 0 && (
                    <Box>
                        <Box fontWeight={"bold"} fontSize={"20px"} mb="16px">
                            UNLISTED:
                        </Box>
                        <NFTGrid itemClickHandler={handleSelect} items={unregisteredNftItems} marginBottom={4} />
                    </Box>
                )}
                {registeredNftItems.length !== 0 && (
                    <Box>
                        <Box fontWeight={"bold"} fontSize={"20px"} mb="16px">
                            LISTED:
                        </Box>
                        <NFTGrid itemClickHandler={handleSelect} items={registeredNftItems} marginBottom={4} />
                    </Box>
                )}
            </Grid>
        </Layout>
    )
}
