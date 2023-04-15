import { Grid, Image, Text } from "@chakra-ui/react"
import logo from "assets/logo.png"
import { ConnectKitButton } from "connectkit"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAccount } from "wagmi"

export function Home() {
    const { isConnected } = useAccount()
    const navigate = useNavigate()

    useEffect(() => {
        if (isConnected) {
            navigate("/mint")
        }
    }, [navigate, isConnected])

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
