import React, {useState,useEffect,useRef} from 'react';
import animation from "../../content/bg01.json"
import ChangeTexScene from "./changeTextureScene"
import Lottie from "lottie-react"
import "./banner.scss"
const Banner = ({setStart}) => {

    // useEffect(()=>{
    //     lottie.loadAnimation({
    //       container:document.querySelector("#animation"),
    //       animationData: Animation,
    //       renderer: "svg", // "canvas", "html"
    //       loop: true, // boolean
    //       autoplay: true, // boolean
    //     })
    //   },[])
    return (
        <div id="animation">
            <ChangeTexScene/>
            <button onClick={setStart} className="button is-black">Enter</button>
        </div>
    );
}

export default Banner;
