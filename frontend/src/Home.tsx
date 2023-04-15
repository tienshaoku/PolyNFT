import { Button, Grid, Image, Text } from "@chakra-ui/react"
import logo from "assets/logo.png"
import { ConnectKitButton } from "connectkit"
import { POLY_NFT_FACTORY_ADDR } from "constants/address"
import { GlobalContainer } from "containers/GlobalContainer"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { polyNftFactoryClient } from "services/PolyNftFactory"
import { useAccount } from "wagmi"

export function Home() {
    const navigate = useNavigate()
    const { address } = useAccount()
    const { projectNames, setProjectNames } = GlobalContainer.useContainer()
    useEffect(() => {
        async function fetchProjectNames() {
            const projectNames = await polyNftFactoryClient.getProjectsRegistered(POLY_NFT_FACTORY_ADDR)
            setProjectNames(projectNames)
        }
        fetchProjectNames()
    })
    return (
        <Grid bgColor={"black"} h="100vh" justifyContent={"center"} alignItems={"center"}>
            <Grid gap="25px">
                <Grid justifyContent={"center"}>
                    <Text fontSize="42px" color="white" fontFamily={"serif"} letterSpacing={"8px"}>
                        NFT
                    </Text>
                    <Text fontSize="42px" color="white" fontFamily={"serif"} letterSpacing={"8px"}>
                        POLYMERIZATION
                    </Text>
                </Grid>
                <Image src={logo} w="500px" />
                <Grid justifyContent={"center"} mt="25px">
                    {!address && <ConnectKitButton />}
                    {address && (
                        <Button
                            colorScheme="yellow"
                            onClick={() => navigate(`/projects/${projectNames[0]}/all`)}
                            size="lg"
                            isLoading={projectNames.length === 0}
                        >
                            Start Journey
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Grid>
    )
}
