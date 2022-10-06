import React from 'react';
import "./mediaInfo.scss"
import MasInfo from "./+info"
import { useSpring, animated } from 'react-spring'
import Reactmarkdown from "react-markdown"
const MediaInfo = ({titulo, des, pos}) => {
//console.log(des)

const propsL = useSpring({ to: { opacity: 1, x:"0px"}, from: { opacity: 0, x:"-500px"} })
const propsR = useSpring({ to: { opacity: 1, x:"0px"}, from: { opacity: 0, x:"1500px"} })

    return (
        <animated.div style={pos?propsL:propsR} className="infoContent content">
            <h1>{titulo}</h1>
             <Reactmarkdown children={des} />
            <MasInfo/>
        </animated.div >
    );
}

export default MediaInfo;
