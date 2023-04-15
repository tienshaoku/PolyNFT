import { Container, Heading, Highlight, ColorModeScript, useColorMode } from "@chakra-ui/react"
import { NFTItemProps } from "components/NFTItem"
import NFTMergeManager from "components/NFTMergeManager"
export function Merge() {
    const handleUnboxSuccess = (newItem: NFTItemProps) => {
        // TODO: hide grid
        // TODO: switch background theme to dark
        // TODO: render shaking box
        console.log("hey")
    }

    const { toggleColorMode } = useColorMode()

    return (
        <Container>
            <ColorModeScript />
            <Heading my={8} textAlign={"center"}>
                <Highlight query={"MERGE!"} styles={{ px: "2", py: "1", bg: "orange.100", rounded: "full" }}>
                    Select up to 3 NFTs to MERGE!
                </Highlight>
            </Heading>
            <NFTMergeManager
                items={[
                    { id: "0" },
                    { id: "1" },
                    { id: "2" },
                    { id: "3" },
                    { id: "4" },
                    { id: "5" },
                    { id: "6" },
                    { id: "7" },
                    { id: "8" },
                    { id: "9" },
                    { id: "10" },
                    { id: "11" },
                ]}
                onUnboxSuccess={handleUnboxSuccess}
            />
        </Container>
    )
}
