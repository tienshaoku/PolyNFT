import React, { useEffect, useState } from "react"
import "./style.css"
import { Box, Flex } from "@chakra-ui/react"

const FACE_ANIMATION_LIST = ["front", "left", "top", "right", "bottom", "back"]

type Props = {}

const Box3D = (props: Props) => {
    // .box.show-front  { transform: translateZ( -50px) rotateY(   0deg); }
    // .box.show-back   { transform: translateZ( -50px) rotateY(-180deg); }
    // .box.show-right  { transform: translateZ(-150px) rotateY( -90deg); }
    // .box.show-left   { transform: translateZ(-150px) rotateY(  90deg); }
    // .box.show-top    { transform: translateZ(-100px) rotateX( -90deg); }
    // .box.show-bottom { transform: translateZ(-100px) rotateX(  90deg); }

    const [faceClassList, setFaceClassList] = useState(FACE_ANIMATION_LIST)
    // const faceClass = "right"

    useEffect(() => {
        setTimeout(() => {
            const nextList = faceClassList.slice(1).concat(faceClassList.slice(0, 1))
            setFaceClassList(nextList)
        }, 600)
    }, [faceClassList])

    return (
        <Flex justifyContent={"center"} alignItems={"center"}>
            <Box className="scene" style={{ transform: "scale(0.8)" }}>
                <div className={`box show-${faceClassList[0]}`}>
                    <div className="box__face box__face--front" style={{ fontSize: 80 }}>
                        ???
                    </div>
                    <div className="box__face box__face--back" style={{ fontSize: 80 }}>
                        ???
                    </div>
                    <div className="box__face box__face--right" style={{ fontSize: 80 }}>
                        ???
                    </div>
                    <div className="box__face box__face--left" style={{ fontSize: 80 }}>
                        ???
                    </div>
                    <div className="box__face box__face--top" style={{ fontSize: 80 }}>
                        ???
                    </div>
                    <div className="box__face box__face--bottom" style={{ fontSize: 80 }}>
                        ???
                    </div>
                </div>
            </Box>
        </Flex>
    )
}

export default Box3D
