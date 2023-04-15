import {
    Box,
    Button,
    Flex,
    Highlight,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import NFTGrid from "./NFTGrid"
import { NFTItemProps } from "./NFTItem"
import { motion } from "framer-motion"
import Box3D from "./Box3D"

type Props = {
    items: NFTItemProps[]
    maxSelectionAmount?: number
    onUnboxSuccess?: (data: NFTItemProps) => void
}

const NFTMergeManager = ({ items, maxSelectionAmount = 3, onUnboxSuccess }: Props) => {
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

    const [isMerging, setIsMerging] = useState(false)

    const handlerMergeClick = () => {
        const sourceNFTItems = items.filter(({ id }) => selectedItems.includes(id))
        console.log(sourceNFTItems)
        setIsMerging(true)
        // TODO: render shaking box animation
        // TODO: call image generator
        // TODO: receive image base64
        // TODO: call IPFS uploader backend, receive uri
        // TODO: call contract fuse(new img uri, description, data)
        // TODO: display unboxed new NFT!
        // onUnboxSuccess?.(items.find(({ id }) => id === selectedItems[0])!)
        // setIsMerging(false)
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
            <Flex justifyContent={"center"}>
                <Button size={"lg"} w="full" colorScheme="blue" onClick={handlerMergeClick} isDisabled={!isMergeValid}>
                    Merge!
                </Button>
            </Flex>

            <Modal size={"full"} isOpen={isMerging} onClose={() => null}>
                <ModalOverlay />
                <ModalContent backgroundColor="gray.900" color={"white"}>
                    <ModalHeader textAlign={"center"} fontSize={"5xl"}>
                        <Highlight query={"NEW NFT"} styles={{ px: "3", py: "1", bg: "yellow.300", rounded: "full" }}>
                            {"HATCHING YOUR NEW NFT..."}
                        </Highlight>
                    </ModalHeader>
                    <ModalBody>
                        {isMerging && (
                            <motion.div
                                animate={{
                                    opacity: [0.8, 1, 0.8, 1, 0.8, 1, 0.8, 1],
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
                    </ModalBody>
                    <ModalFooter>
                        {
                            <Button size={"lg"} w={"full"} colorScheme="blue" onClick={handleList}>
                                List It Now
                            </Button>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default NFTMergeManager
