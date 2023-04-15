import { ChakraProvider, theme } from "@chakra-ui/react"

import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "./Home"

export const App = () => (
    <ChakraProvider theme={theme}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </ChakraProvider>
)
