import { AspectRatio, Box, GridItem, GridItemProps } from "@chakra-ui/react"

export interface NFTItemProps extends GridItemProps {
    id: string
    data?: {
        imageUri?: string
        imagePrompt?: string
    }
    selected?: boolean
}

const NFTItem = ({ id, selected, ...props }: NFTItemProps) => {
    return (
        <GridItem {...props} w="100%" border={selected ? "4px purple solid" : ""} borderRadius={8} padding={1}>
            <AspectRatio ratio={1}>
                <Box bg="pink.500">{/* Render NFT image here */}</Box>
            </AspectRatio>
        </GridItem>
    )
}

export default NFTItem
