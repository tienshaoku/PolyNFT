import { Box, Flex, Grid, Image } from "@chakra-ui/react"
import logo from "assets/logo.png"

export function Header() {
    return (
        <Grid>
            <Flex>
                <Image src={logo} w="40px" />
                <Box>NFT POLYMERIZATION</Box>
            </Flex>
        </Grid>
    )
}
