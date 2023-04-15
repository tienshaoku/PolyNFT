import { ChakraProvider, theme } from "@chakra-ui/react"

import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { Home } from "./Home"

import { Mint } from "Mint"
import { MyList } from "MyList"
import { Poly } from "Poly"
import { ConnectKitProvider } from "connectkit"
import { useEffect } from "react"
import { WagmiConfig, useAccount } from "wagmi"
import { wagmi } from "./services/Wagmi"

const client = wagmi.getClient()

export const App = () => {
    const { isConnected } = useAccount()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isConnected) {
            navigate("/")
        }
    }, [navigate, isConnected])

    return (
        <ChakraProvider theme={theme}>
            <WagmiConfig client={client}>
                <ConnectKitProvider>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/mint/*" element={<Mint />} />
                        <Route path="/list/*" element={<MyList />} />
                        <Route path="/poly/*" element={<Poly />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </ConnectKitProvider>
            </WagmiConfig>
        </ChakraProvider>
    )
}
