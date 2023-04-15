import { Box, Button, Flex, Grid } from "@chakra-ui/react"
import { Layout } from "Layout"
import { POLY_NFT_FACTORY_ADDR } from "constants/address"
import { useCallback, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ipfsClient } from "services/IPFS"
import { polyNftErc721Client } from "services/PolyNftErc721"
import { polyNftFactoryClient } from "services/PolyNftFactory"
import { getSigner } from "utils/get"
import { useAccount } from "wagmi"

const PROJECT_NAME = "Cute Shark Family"

export function Mint() {
    const { projectName } = useParams()
    const { address } = useAccount()
    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [ipfsUrl, setIpfsUrl] = useState<string>("")

    const handleAddImg = useCallback<React.ChangeEventHandler<HTMLInputElement>>(e => {
        if (e.target.files) {
            console.log(e.target.files[0])
            setSelectedImage(e.target.files[0])
        }
    }, [])

    const handleRemoveImg = useCallback(() => {
        setSelectedImage(null)
    }, [])

    const handleMint = useCallback(async () => {
        if (address && ipfsUrl) {
            try {
                const projectErc721Address = await polyNftFactoryClient.getProjectErc721ByName(
                    PROJECT_NAME,
                    POLY_NFT_FACTORY_ADDR,
                )
                const signer = await getSigner()
                // TODO: dynamic description
                await polyNftErc721Client.mint(
                    address,
                    ipfsUrl,
                    "0x",
                    "Shark drink coffee",
                    projectErc721Address,
                    signer,
                )
                navigate(`/projects/${projectName}/profile`)
            } catch (e) {
                console.log("mint error")
                console.error(e)
            }
        }
    }, [address, ipfsUrl, navigate, projectName])

    const handleUploadImg = useCallback<React.MouseEventHandler<HTMLButtonElement>>(async () => {
        const reader = new FileReader()
        reader.readAsDataURL(selectedImage as Blob)
        reader.onload = async () => {
            const res = await ipfsClient.uploadFile(reader)
            const data = await res.json()
            if (data.errors) {
                alert(data.errors)
            } else {
                setIpfsUrl(data.ipfs)
            }
        }
        reader.onerror = error => {
            console.log("load img error:")
            console.error(error)
        }
    }, [selectedImage])
    return (
        <Layout>
            <Grid bgColor="black" p="16px" pt="120px" justifyContent={"center"} alignItems={"center"} h="100%">
                {!selectedImage && (
                    <Grid
                        w="350px"
                        h="350px"
                        border="3px dashed"
                        borderColor="gray"
                        justifyContent={"center"}
                        alignItems={"center"}
                        color="gray"
                        p="16px"
                    >
                        <Box as="input" type="file" onChange={handleAddImg} width="100px" />
                    </Grid>
                )}
                {selectedImage && (
                    <Box>
                        <img alt="not found" width={"350px"} src={URL.createObjectURL(selectedImage)} />
                    </Box>
                )}
                <Flex gap="28px" justifyContent={"center"}>
                    {!ipfsUrl && (
                        <Button colorScheme="teal" onClick={handleUploadImg} disabled={!!selectedImage}>
                            Upload
                        </Button>
                    )}
                    {!ipfsUrl && (
                        <Button colorScheme="red" onClick={handleRemoveImg} disabled={!selectedImage}>
                            Remove
                        </Button>
                    )}
                    {ipfsUrl && (
                        <Button colorScheme="green" onClick={handleMint}>
                            Mint
                        </Button>
                    )}
                </Flex>
            </Grid>
        </Layout>
    )
}
