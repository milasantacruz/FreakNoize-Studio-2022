import React from 'react';
import "./mediaInfo.scss"
import MasInfo from "./+info"
import { useSpring, animated } from 'react-spring'
import Reactmarkdown from "react-markdown"

const MediaInfo = ({nodo, des, pos}) => {
//console.log(nodo.categorias)

const propsR = useSpring({ to: { opacity: 1, x:"0px"}, from: { opacity: 0, x:"-500px"} })
const propsL = useSpring({ to: { opacity: 1, x:"0px"}, from: { opacity: 0, x:"1500px"} })

    return (
        <animated.div style={pos?propsL:propsR} className="infoContent content">
            <h1 className="title">{nodo.titulo}</h1>
             <Reactmarkdown children={des} />
            <MasInfo categorias={nodo.categorias} />
        </animated.div >
    );
}

export default MediaInfo;
