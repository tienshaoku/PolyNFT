import { Box } from "@chakra-ui/react"
import { GlobalContainer } from "containers/GlobalContainer"
import { useNavigate } from "react-router-dom"

export function SideBar() {
    const navigate = useNavigate()
    const { projectNames } = GlobalContainer.useContainer()
    const _projectNames = getFakeProjectNames(projectNames)

    return (
        <Box
            h="calc(100vh - 80px)"
            w="260px"
            bgColor="black"
            borderRight="1px solid white"
            pt="40px"
            pl="32px"
            pr="32px"
        >
            {_projectNames.map((p, i) => (
                <Box
                    border="1px solid white"
                    borderRadius={"10px"}
                    key={i}
                    onClick={() => i === 0 && navigate(`/projects/${p}/all`)}
                    p="12px"
                    mb="32px"
                    color={"white"}
                    cursor={"pointer"}
                    _hover={{ boxShadow: "0 0 15px #fff" }}
                >
                    {p}
                </Box>
            ))}
        </Box>
    )
}

function getFakeProjectNames(projectNames: any[]) {
    return [
        ...projectNames,
        "Happy Hedgehogs",
        "Mighty Penguins",
        "Daring Dragons",
        "Brave Bears",
        "Silly Sloths",
        "Magical Mermaids",
        "Funky Werewolf",
        "Party Jellyfish",
        "Dragon Baby",
    ]
}
