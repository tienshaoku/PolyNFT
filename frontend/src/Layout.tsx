import { Box, Grid } from "@chakra-ui/react"
import { Header } from "Header"
import { SideBar } from "SideBar"

type LayoutProps = {
    children?: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header />
            <Grid h="calc(100vh - 80px" templateColumns={"auto 1fr"}>
                <SideBar />
                <Box p={"24px"} bgColor="black">
                    {children}
                </Box>
            </Grid>
        </>
    )
}
