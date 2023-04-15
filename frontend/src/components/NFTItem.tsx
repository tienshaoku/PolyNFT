import { AspectRatio, Box, Button, GridItem, GridItemProps, Image } from "@chakra-ui/react"

export interface NFTItemProps extends GridItemProps {
    id: string
    data?: {
        imageUri?: string
        imageDescription?: string
    }
    selected?: boolean
    showButton?: boolean
    isListed?: boolean
}

const NFTItem = ({ id, data, selected, showButton, isListed, ...props }: NFTItemProps) => {
    return (
        <GridItem w="100%" border={selected ? "4px purple solid" : ""} borderRadius={8} padding={1} {...props}>
            <AspectRatio ratio={1}>
                <Box bg="gray.200">
                    <Image src={data?.imageUri} />
                </Box>
            </AspectRatio>
            {showButton && (
                <Button colorScheme="teal" w="full" mt="8px">
                    {isListed ? "Delist" : "List"}
                </Button>
            )}
        </GridItem>
    )
}

export default NFTItem
