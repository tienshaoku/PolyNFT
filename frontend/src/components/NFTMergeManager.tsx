import {
    Box,
    Button,
    Flex,
    Input,
    Highlight,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
    Heading,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NFTGrid from "./NFTGrid"
import NFTItem, { NFTItemProps } from "./NFTItem"
import { motion } from "framer-motion"
import Box3D from "./Box3D"

function mockAsyncFunction() {
    return new Promise(resolve => {
        // Simulate an asynchronous operation that takes some time to complete
        setTimeout(() => {
            // Resolve the Promise with the desired data
            resolve("Some data")
        }, 2000)
    })
}

const FLASH_DURATION = 800

enum UIState {
    INIT = "INIT",
    MERGING = "MERGING",
    MERGED = "MERGED",
}

type Props = {
    items: NFTItemProps[]
    maxSelectionAmount?: number
}

const NFTMergeManager = ({ items, maxSelectionAmount = 3 }: Props) => {
    const toast = useToast()

    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const isMergeValid = selectedItems.length > 0 && selectedItems.length <= maxSelectionAmount

    const handleSelect = (id: string) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
        } else {
            const nextSelectedItems = [...selectedItems, id]
            if (nextSelectedItems.length > maxSelectionAmount) {
                toast({
                    title: `Cannot select more than ${maxSelectionAmount} 🥲`,
                    position: "top",
                    status: "info",
                    duration: 2000,
                    isClosable: true,
                })
                return
            }
            setSelectedItems(nextSelectedItems)
        }
    }

    const [prompt, setPrompt] = useState("")
    const handlePromptChange = (event: any) => setPrompt(event.target.value)

    const [newNFTItem, setNewNFTItem] = useState<NFTItemProps>()

    const [uiState, setUIState] = useState(UIState.INIT)
    const [flashShowed, setFlashShowed] = useState(false)
    useEffect(() => {
        if (uiState === UIState.MERGED) {
            const timeoutId = setTimeout(() => setFlashShowed(true), FLASH_DURATION)
            return () => clearTimeout(timeoutId)
        }
    }, [uiState])

    const handlerMergeClick = async () => {
        const sourceNFTItems = items.filter(({ id }) => selectedItems.includes(id))
        console.log({ sourceNFTItems, prompt })
        setUIState(UIState.MERGING)
        try {
            const fusedResult = await fetch("http://localhost:3001/api/v1/fuse/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    urlList: ["https://ipfs.io/ipfs/QmbPbq16xF4PsowtbSDKa4qcWFManZAnvYbfxhjMPgZ8Jw"],
                    prompt,
                }),
            })
            const { ipfs: newNFTImageUri } = await fusedResult.json()
            console.log(newNFTImageUri)

            // TODO: call contract fuse(new img uri, description, data)
            const result = await mockAsyncFunction()
            setNewNFTItem({ id: "newNFT", data: { imageUri: newNFTImageUri, imageDescription: prompt } })

            // TODO: display unboxed new NFT!
            setUIState(UIState.MERGED)
        } catch (error) {
            setUIState(UIState.INIT)
            toast({
                title: `Fuse new NFT failed 😭`,
                position: "top",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const navigate = useNavigate()
    const handleList = () => {
        navigate("/list")
    }

    return (
        <Box>
            <NFTGrid
                itemClickHandler={handleSelect}
                items={items.map(item => ({ ...item, selected: selectedItems.includes(item.id) }))}
                marginBottom={4}
            />
            <Input size={"lg"} marginBottom={4} placeholder="Enter mutation prompt" onChange={handlePromptChange} />
            <Flex justifyContent={"center"}>
                <Button size={"lg"} w="full" colorScheme="blue" onClick={handlerMergeClick} isDisabled={!isMergeValid}>
                    FUSE!
                </Button>
            </Flex>

            <Modal size={"full"} isOpen={uiState !== UIState.INIT} onClose={() => null}>
                <ModalOverlay />
                <ModalContent backgroundColor="gray.900" color={"white"}>
                    <ModalHeader textAlign={"center"} fontSize={"5xl"}>
                        {uiState === UIState.MERGING && (
                            <Highlight
                                query={"NEW NFT"}
                                styles={{ px: "3", py: "1", bg: "yellow.300", rounded: "full" }}
                            >
                                {"HATCHING YOUR NEW NFT..."}
                            </Highlight>
                        )}
                        {uiState === UIState.MERGED && (
                            <Highlight
                                query={"HATCHED"}
                                styles={{ px: "3", py: "1", bg: "yellow.300", rounded: "full" }}
                            >
                                {"NEW NFT HATCHED !🔥🔥"}
                            </Highlight>
                        )}
                    </ModalHeader>
                    <ModalBody>
                        <Flex paddingTop={4} paddingBottom={4} alignItems={"center"} justifyContent={"center"}>
                            {uiState === UIState.MERGING && (
                                <motion.div
                                    animate={{
                                        opacity: [0.9, 1, 0.9, 1, 0.9, 1, 0.9, 1],
                                        scale: [0.9, 1, 0.9, 1, 0.9, 1, 0.9, 1],
                                        x: [0, -10, 5, -5, 10, -5, 5, 0],
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        repeatDelay: 0.3,
                                    }}
                                >
                                    <Box3D />
                                </motion.div>
                            )}

                            {uiState === UIState.MERGED && !flashShowed && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        position: "absolute",
                                        zIndex: 999,
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: "white",
                                    }}
                                />
                            )}

                            {uiState === UIState.MERGED && flashShowed && newNFTItem && (
                                <Box w={"40%"} maxWidth={"500px"}>
                                    <NFTItem {...newNFTItem} />
                                    <Heading mt={4} size={"md"} textAlign={"center"}>
                                        {newNFTItem?.data?.imageDescription}
                                    </Heading>
                                </Box>
                            )}
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        {uiState === UIState.MERGED && (
                            <Button size={"lg"} w={"full"} colorScheme="blue" onClick={handleList}>
                                List It Now
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default NFTMergeManager
