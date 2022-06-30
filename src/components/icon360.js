import React, {useState, useEffect, useRef} from 'react';
import lottie from "lottie-web"
import IconLottie from "../../content/56881-nuvo360.json"
import gsap from "gsap"
const Icon360 = () => {

    useEffect(()=>{
        lottie.loadAnimation({
          container:document.querySelector("#lottieFile"),
          animationData: IconLottie,
          renderer: "svg", // "canvas", "html"
          loop: true, // boolean
          autoplay: true, // boolean
        })
      },[])

      var el = useRef()
      var tl = useRef()
      useEffect(()=>{
        tl.current = gsap.timeline({delay:5})
        tl.current.to(el.current, {opacity:"100%"})
      },[])

      
    return (
       <div
       ref={elem=>{el.current = elem}}
       style={{
            opacity: "0%",
            width: "80px",
            bottom: "3%",
            position: "absolute",
            left: "48%",
       }}
        id="lottieFile">

       </div>
    );
}

export default Icon360;
