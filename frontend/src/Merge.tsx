import { Container, Heading, Highlight } from "@chakra-ui/react"
import { Header } from "Header"
import { NFTItemProps } from "components/NFTItem"
import NFTMergeManager from "components/NFTMergeManager"
export function Merge() {
    return (
        <>
            <Header />
            <Container pt="120px">
                <Heading mb={8} textAlign={"center"}>
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
                />
            </Container>
        </>
    )
}
