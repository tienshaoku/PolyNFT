import { Box, Button, Flex, useToast } from "@chakra-ui/react"
import { useState } from "react"
import NFTGrid from "./NFTGrid"
import { NFTItemProps } from "./NFTItem"

type Props = {
    items: NFTItemProps[]
    maxSelectionAmount?: number
    onUnboxSuccess?: (data: NFTItemProps) => void
}

const NFTMergeManager = ({ items, maxSelectionAmount = 3, onUnboxSuccess: onUnbox }: Props) => {
    const toast = useToast()

    const [selectedItems, setSelectedItems] = useState<string[]>([])

    const handleSelect = (id: string) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
        } else {
            const nextSelectedItems = [...selectedItems, id]
            if (nextSelectedItems.length > maxSelectionAmount) {
                toast({
                    title: `Cannot select more than ${maxSelectionAmount} 🥲`,
                    position: "top",
                    status: "info",
                    duration: 2000,
                    isClosable: true,
                })
                return
            }
            setSelectedItems(nextSelectedItems)
        }
    }
    const handlerMergeClick = () => {
        const sourceNFTItems = items.filter(({ id }) => selectedItems.includes(id))
        console.log(sourceNFTItems)
        // TODO: render shaking box animation
        // TODO: call image generator
        // TODO: receive image base64
        // TODO: call IPFS uploader backend, receive uri
        // TODO: call contract fuse(new img uri, description, data)
        // TODO: display unboxed new NFT!
        onUnbox?.(items.find(({ id }) => id === selectedItems[0])!)
    }

    return (
        <Box>
            <NFTGrid
                itemClickHandler={handleSelect}
                items={items.map(item => ({ ...item, selected: selectedItems.includes(item.id) }))}
                marginBottom={4}
            />
            <Flex justifyContent={"center"}>
                <Button size={"lg"} type="button" w="full" colorScheme="blue" onClick={handlerMergeClick}>
                    Merge!
                </Button>
            </Flex>
        </Box>
    )
}

export default NFTMergeManager
