import { Button, Grid } from "@chakra-ui/react"
import { Header } from "Header"
import { POLY_NFT_FACTORY_ADDR } from "constants/address"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { polyNftFactoryClient } from "services/PolyNftFactory"

export function ProjectList() {
    const navigate = useNavigate()
    const [projects, setProjects] = useState<any[]>([])

    useEffect(() => {
        async function fetchProjects() {
            const projectNames = await polyNftFactoryClient.getProjectsRegistered(POLY_NFT_FACTORY_ADDR)
            setProjects(projectNames)
        }
        fetchProjects()
    })

    return (
        <>
            <Header />
            <Grid bgColor="black" h="calc(100vh - 80px)" p="24px" color="white" templateColumns={"1fr 1fr 1fr"}>
                {projects.map((name: string, index: number) => (
                    <Grid justifyContent="center" key={index}>
                        <Button onClick={() => navigate(`/project/${name}`)}>{name}</Button>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
