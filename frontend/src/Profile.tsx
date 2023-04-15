import { Grid } from "@chakra-ui/react"
import { Layout } from "Layout"
import NFTGrid from "components/NFTGrid"
import { NFTItemProps } from "components/NFTItem"
import { POLY_NFT_REGISTRY_ADDR } from "constants/address"
import { useEffect, useState } from "react"
import { polyNftRegistryClient } from "services/PolyNftRegistry"
import { useAccount } from "wagmi"

// my profile => registered list, deregistered button
export function Profile() {
    const { address } = useAccount()
    const [registeredOrders, setRegisteredOrders] = useState<any[]>()
    const [nftItems, setNftItems] = useState<NFTItemProps[]>([])
    const [nftItemsSelected, setNftItemsSelected] = useState<string[]>([])
    useEffect(() => {
        async function init() {
            if (address) {
                const _registeredOrders = await polyNftRegistryClient.getOrdersByOwner(address, POLY_NFT_REGISTRY_ADDR)
                setRegisteredOrders(_registeredOrders)
                setNftItems(
                    _registeredOrders.map(v => ({
                        id: v.tokenId.toString(),
                        data: {
                            imageUri: "",
                            imageDescription: "",
                        },
                        selected: false,
                    })),
                )
                // TODO get registered ids then set into selectedItems
            }
        }
        init()
    }, [address])

    const handleSelect = () => {}
    return (
        <Layout>
            <Grid bgColor="black" h="100%" w="100%" p="24px" color="white" templateColumns={"repeat(5, 1fr)"}>
                <NFTGrid
                    itemClickHandler={handleSelect}
                    items={nftItems.map(item => ({ ...item, selected: nftItemsSelected.includes(item.id) }))}
                    marginBottom={4}
                />
            </Grid>
        </Layout>
    )
}
