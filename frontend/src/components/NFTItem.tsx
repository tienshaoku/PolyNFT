import { AspectRatio, Box, Button, GridItem, GridItemProps, Image } from "@chakra-ui/react"
import { IOrderInfo } from "services/PolyNftRegistry"

export interface NFTItemProps extends GridItemProps {
    id: string
    imageUri: string
    orderData: IOrderInfo
    selected?: boolean
    showButton?: boolean
    isListed?: boolean
}

const NFTItem = ({ id, imageUri, selected, showButton, isListed, ...props }: NFTItemProps) => {
    return (
        <GridItem w="100%" border={selected ? "4px purple solid" : ""} borderRadius={8} padding={1} {...props}>
            <AspectRatio ratio={1}>
                <Box bg="gray.200">
                    <Image src={imageUri} />
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
