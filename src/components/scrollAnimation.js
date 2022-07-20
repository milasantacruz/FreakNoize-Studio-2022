import React, {useState, useEffect, useRef} from 'react';
import lottie from "lottie-web"
import MediaQuery from 'react-responsive';

const ScrollAnimation = ({setup, scrollIcon,offset,setoffset}) => {
    useEffect(()=>{
        lottie.loadAnimation({
          container:document.querySelector("#scrollFile"),
          animationData: scrollIcon,
          renderer: "svg", // "canvas", "html"
          loop: true, // boolean
          autoplay: true, // boolean
        })
      },[])

      function handleClick(){
        setoffset(offset)
        console.log("gel")
      }

      console.log(setup)
    return (
      <div>
        <MediaQuery minWidth={767}>
         <div
          onClick={handleClick}
          style={{
          width: "100px",
          bottom: "4%",
          position: "absolute",
          left: offset? "94.2%":"46.8%",
          cursor:"pointer"
        }}
        id="scrollFile">

       </div>
      </MediaQuery>
      <MediaQuery maxWidth={767}>
        <div
            onClick={handleClick}
            style={{
            width: "90px",
            bottom: "1%",
            position: "absolute",
            left: offset? "75.8%":"34.8%",
            cursor:"pointer"
          }}
          id="scrollFile">

        </div>
      </MediaQuery>
      </div>
      
      
    );
}

export default ScrollAnimation;
