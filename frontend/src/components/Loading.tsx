import { Grid, Spinner } from "@chakra-ui/react"

export function Loading() {
    return (
        <Grid justifyContent={"center"} alignItems={"center"} w="100%" h="100%">
            <Spinner />
        </Grid>
    )
}
