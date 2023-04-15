import { Box, Flex, Image } from "@chakra-ui/react"
import logo from "assets/logo.png"
import { ConnectKitButton } from "connectkit"
import { useNavigate, useParams } from "react-router-dom"

export function Header() {
    const { projectName } = useParams()
    const navigate = useNavigate()
    return (
        <Flex
            bgColor="white"
            h="60px"
            w="100%"
            justifyContent={"space-between"}
            alignItems={"center"}
            px="10px"
            py="40px"
        >
            <Flex>
                <Image src={logo} w="60px" />
            </Flex>
            <Flex color="black" gap="36px" fontWeight={"bold"}>
                <Box
                    cursor={"pointer"}
                    textDecoration={"underline"}
                    onClick={() => navigate(`/projects/${projectName}/all`)}
                >
                    All Tokens
                </Box>
                <Box
                    cursor={"pointer"}
                    textDecoration={"underline"}
                    onClick={() => navigate(`/projects/${projectName}/profile`)}
                >
                    Profile
                </Box>
                <Box
                    cursor={"pointer"}
                    textDecoration={"underline"}
                    onClick={() => navigate(`/projects/${projectName}/mint`)}
                >
                    Mint
                </Box>
                <Box
                    cursor={"pointer"}
                    textDecoration={"underline"}
                    onClick={() => navigate(`/projects/${projectName}/merge`)}
                >
                    Merge
                </Box>
            </Flex>
            <ConnectKitButton />
        </Flex>
    )
}
