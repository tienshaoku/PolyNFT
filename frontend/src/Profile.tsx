import { Grid } from "@chakra-ui/react"
import { Header } from "Header"

// my profile => registered list, deregistered button
export function Profile() {
    return (
        <>
            <Header />
            <Grid
                bgColor="black"
                h="calc(100vh - 80px)"
                p="24px"
                color="white"
                templateColumns={"repeat(5, 1fr)"}
            ></Grid>
        </>
    )
}
