import { Box, Button, Flex, Grid } from "@chakra-ui/react"
import { Header } from "Header"
import { API_UPLOAD_IMG } from "constants/api"
import { useCallback, useState } from "react"
import { getBase64StringFromDataURL } from "utils"

export function Mint() {
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

    const handleMint = useCallback(async () => {}, [])

    const handleUploadImg = useCallback<React.MouseEventHandler<HTMLButtonElement>>(async () => {
        const reader = new FileReader()
        reader.readAsDataURL(selectedImage as Blob)
        reader.onload = () => {
            const base64Str = getBase64StringFromDataURL(reader.result)
            fetch(API_UPLOAD_IMG, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    payload: base64Str,
                }),
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.errors) {
                        alert(data.errors)
                    } else {
                        setIpfsUrl(data.ipfs)
                    }
                })
        }
        reader.onerror = error => {
            console.log("load img error:")
            console.error(error)
        }
    }, [selectedImage])
    return (
        <>
            <Header />
            <Grid p="16px" pt="40px" justifyContent={"center"} alignItems={"center"} gap="28px" h="80vh">
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
        </>
    )
}
