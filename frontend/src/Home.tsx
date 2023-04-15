import { Grid, Image, Text } from "@chakra-ui/react"
import logo from "assets/logo.png"
import { ConnectKitButton } from "connectkit"

export function Home() {
    return (
        <Grid bgColor={"black"} h="100vh" justifyContent={"center"} alignItems={"center"}>
            <Grid gap="25px">
                <Grid justifyContent={"center"}>
                    <Text fontSize="42px" color="green" fontFamily={"fantasy"}>
                        NFT POLYMERIZATION
                    </Text>
                </Grid>
                <Image src={logo} w="500px" />
                <Grid justifyContent={"center"}>
                    <ConnectKitButton />
                </Grid>
            </Grid>
        </Grid>
    )
}
