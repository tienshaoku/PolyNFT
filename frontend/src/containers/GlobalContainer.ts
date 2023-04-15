import { useState } from "react"
import { createContainer } from "unstated-next"

const GlobalContainer = createContainer(useGlobal)

function useGlobal() {
    const [projectNames, setProjectNames] = useState<any[]>([])

    return {
        projectNames,
        setProjectNames,
    }
}

export { GlobalContainer }
