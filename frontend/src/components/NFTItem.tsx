import { AspectRatio, Box, Button, GridItem, GridItemProps, Image } from "@chakra-ui/react"

export interface NFTItemProps extends GridItemProps {
    id: string
    data?: {
        imageUri?: string
        imageDescription?: string
    }
    selected?: boolean
    isListed?: boolean
}

const NFTItem = ({ id, data, selected, isListed, ...props }: NFTItemProps) => {
    return (
        <GridItem w="100%" border={selected ? "4px purple solid" : ""} borderRadius={8} padding={1} {...props}>
            <AspectRatio ratio={1}>
                <Box bg="pink.500">
                    <Image src={data?.imageUri} />
                </Box>
            </AspectRatio>
            <Button colorScheme="teal" w="full" mt="8px">
                {isListed ? "Unlist" : "List"}
            </Button>
        </GridItem>
    )
}

export default NFTItem
