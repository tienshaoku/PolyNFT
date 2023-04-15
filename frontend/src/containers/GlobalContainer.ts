import { useState } from "react"
import { createContainer } from "unstated-next"

const GlobalContainer = createContainer(useGlobal)

function useGlobal() {
    const [projectNames, setProjectNames] = useState<any[]>([])
    const [erc721Address, setErc721Address] = useState<string>("")

    return {
        projectNames,
        setProjectNames,
        erc721Address,
        setErc721Address,
    }
}

export { GlobalContainer }
