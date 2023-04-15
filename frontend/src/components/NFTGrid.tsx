import { Grid, GridProps } from "@chakra-ui/react"
import NFTItem, { NFTItemProps } from "./NFTItem"

interface Props extends GridProps {
    items: NFTItemProps[]
    itemClickHandler?: (id: NFTItemProps["id"]) => void
}

const NFTGrid = ({ items, itemClickHandler, ...props }: Props) => {
    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={6} {...props}>
            {items.map(item => (
                <NFTItem key={item.id} {...item} onClick={() => itemClickHandler?.(item.id)} />
            ))}
        </Grid>
    )
}

export default NFTGrid
