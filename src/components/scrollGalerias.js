import React, {useState, useEffect, useRef} from 'react';
import lottie from "lottie-web"
import MediaQuery from 'react-responsive';
const ScrollGalerias = ({setup, scrollIcon}) => {
    useEffect(()=>{
        lottie.loadAnimation({
          container:document.querySelector("#scrollGFile"),
          animationData: scrollIcon,
          renderer: "svg", // "canvas", "html"
          loop: true, // boolean
          autoplay: true, // boolean
        })
      },[])

      console.log(setup)
    return (
      <div>
        <MediaQuery minWidth={767}>
          <div
            style={{
              width: "300px",
              position: "absolute",
              height: "300px",
              left:"42%",
              top: "4%"
            }}
            id="scrollGFile">

          </div>
        </MediaQuery>

        <MediaQuery maxWidth={767}>
          <div
            style={{
              width: "300px",
              position: "absolute",
              height: "300px",
              left:"2%",
              top: "3%"
            }}
            id="scrollGFile">

          </div>
        </MediaQuery>

      </div>
    );
}

export default ScrollGalerias;
