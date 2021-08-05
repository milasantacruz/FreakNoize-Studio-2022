import React, {useRef, useEffect, useState} from 'react';
import {gsap} from 'gsap'

const ExtrudeLogo = () => {

    var[circleState, setCircleState] = useState(true);

    var stripes = useRef([]);

    function circleEnter(){
        setCircleState(true);
        console.log("enter")
    }

    function circleLeave(){
        setCircleState(false);
        console.log("leave")
    }

    useEffect(()=>{
        console.log(stripes);

        var tl = gsap.timeline({delay: 1.2});
        tl.fromTo(".thisall", {scale: 0, ease: " elastic.out( 1, 0.3)" } , { scale: 1 , stagger: "0.5" })
        
        var tl2 = gsap.timeline({repeat: -1, yoyo: true});
        tl2.fromTo(stripes.current[2],{opacty: 1}, {opacity: 0,ease: " power2. out", duration: 1})
        


    }, [])

    return (
        <div className="extrude_logo_container">
          
                        <svg className="lgo" viewBox="0 0 916 916">

                            <filter id="shadow3">
                            <feDropShadow dx="-0.8" dy="-0.8" stdDeviation="0"
                                floodColor="pink" floodOpacity="0.5"/>
                            </filter>

                
                            <path
                            className="thisall"
                            ref={elem => {stripes.current[0] = elem}}
                             d="M818.78 916H97.22L0 818.78V97.22L97.22 0h721.56L916 97.22v721.56z"
                             fill="#219653"
                             />
                             <path
                             className="thisall"
                                 d="M799 669.33v-431l-114-114H230L116 238.38v424.09L260.87 807.4h201l70.83-70.83 198.75 1.06z"
                                 strokeLinecap="square"
                                 ref={elem => {stripes.current[1] = elem}}
                                 strokeLinejoin="bevel"
                                 fill="#212121"
                                 stroke="#219653"
                                 strokeWidth={7}
                             />
                             <circle
                             onMouseEnter={circleEnter}
                             onMouseLeave={circleLeave}
                             className="thisall"
                             ref={elem => {stripes.current[2] = elem}}
                                 cx={650}
                                 cy={823.93}
                                 r={50}
                                 strokeMiterlimit={10}
                                 fill="#212121"
                                 stroke="#219653"
                                 strokeWidth={7}
                             />
                             <path
                             className="thisall"
                             ref={elem => {stripes.current[3] = elem}}
                                 d="M458.36 648l194.81-253.29-44.32-90h-301l-44.32 90z"
                                 fill="#e3651b"
                             />
                          
                         </svg>
              
            
        </div>
    );
}

export default ExtrudeLogo;
//<Tween from={{scaleY: "0%", scaleX: "0%"}} to={{scaleY: "100%", scaleX: "100%"}} duration={2} stagger={0.5} />