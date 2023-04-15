import { Grid } from "@chakra-ui/react"
import { Header } from "Header"

export function MyList() {
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
