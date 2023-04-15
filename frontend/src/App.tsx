import { ChakraProvider, theme } from "@chakra-ui/react"

import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { Home } from "./Home"

import { AllToken } from "AllToken"
import { Merge } from "Merge"
import { Mint } from "Mint"
import { Profile } from "Profile"
import { ConnectKitProvider } from "connectkit"
import { GlobalContainer } from "containers/GlobalContainer"
import { useEffect } from "react"
import { WagmiConfig, useAccount } from "wagmi"
import { wagmi } from "./services/Wagmi"

const client = wagmi.getClient()

export const App = () => {
    const { isConnected } = useAccount()
    const { projectNames } = GlobalContainer.useContainer()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isConnected || projectNames.length === 0) {
            navigate("/")
        }
    }, [navigate, isConnected, projectNames])

    return (
        <ChakraProvider theme={theme}>
            <WagmiConfig client={client}>
                <ConnectKitProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects/:projectName">
                            <Route path="/projects/:projectName/all/*" element={<AllToken />} />
                            <Route path="/projects/:projectName/profile/*" element={<Profile />} />
                            <Route path="/projects/:projectName/mint/*" element={<Mint />} />
                            <Route path="/projects/:projectName/merge/*" element={<Merge />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </ConnectKitProvider>
            </WagmiConfig>
        </ChakraProvider>
    )
}
