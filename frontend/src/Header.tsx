import { Box, Flex, Image, Link } from "@chakra-ui/react"
import logo from "assets/logo.png"
import { ConnectKitButton } from "connectkit"

export function Header() {
    return (
        <Flex
            position="fixed"
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
                <Box cursor={"pointer"} textDecoration={"underline"}>
                    <Link href="/mint">Mint</Link>
                </Box>
                <Box cursor={"pointer"} textDecoration={"underline"}>
                    <Link href="/list">My List</Link>
                </Box>
                <Box cursor={"pointer"} textDecoration={"underline"}>
                    <Link href="/poly">Poly</Link>
                </Box>
            </Flex>
            <ConnectKitButton />
        </Flex>
    )
}
