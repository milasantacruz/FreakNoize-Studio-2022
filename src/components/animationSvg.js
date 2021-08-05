import React from 'react';
import {Controller, Scene} from 'react-scrollmagic'
import {Tween, Timeline} from 'react-gsap'


const AnimationSvg = () => (
    <div>
        <Controller>
            <Scene
            duration={100}
            reverse={true}
            offset={-400}

            >
                {(progress, event) => {
                     return (
                        <div>
                            <svg viewBox="0 0 742 742" >
                         <defs>
                             <style>
                             {
                                 ".prefix__cls-3{opacity:.32}.prefix__cls-4{fill:#e3651b}.prefix__cls-10,.prefix__cls-8{fill:none;stroke:#ff7900;stroke-miterlimit:10;stroke-width:4px}.prefix__cls-10{stroke-linecap:round}"
                             }
                             </style>
                         </defs>
                 
                         <path
                             d="M659.31 742H82.69L0 659.31V82.69L82.69 0h576.62L742 82.69v576.62z"
                             fill="#219653" opacity="1"
                         />
                         

                         <path
                             d="M587.81 670.5H154.19L71.5 587.81V154.19l82.69-82.69h433.62l82.69 82.69v433.62z"
                             fill="#212121"
                             stroke="#219653"
                             strokeLinecap="square"
                             strokeLinejoin="bevel"
                             strokeWidth={7}
                             
                         />                         
                             <Tween
                             duration={2}
                             stagger={0.5}
                             ease= "Bounce.easeOut" //"elastic.out(1, 0.3)"
                             from={{ 
                                opacity: 5,
                                y: -1000,
                            }}
                             to={{ 
                                 opacity: 0,
                                 y: 0,
                             }}
                             paused
                             playState={
                                (event.type === 'enter' && event.scrollDirection === 'FORWARD' ) ? 'play' : 
                                (event.type === 'enter' && event.scrollDirection === 'REVERSE') ? 'reverse' : null
                             }
                             >

                            

                             <g className="prefix__cls-5">
                                 <ellipse
                                 className="prefix__cls-4"
                                 cx={372.09}
                                 cy={306.19}
                                 rx={54.18}
                                 ry={67.89}
                                 />
                             </g>

                             
                             <g className="prefix__cls-5">
                             <ellipse
                                 className="prefix__cls-4"
                                 cx={372.09}
                                 cy={466.96}
                                 rx={49.7}
                                 ry={77.3}
                             />
                             </g>
                             
                             </Tween>

                            <g>
                                 <circle cx={372.09} cy={572.44} r={54.18} fill="#e3651b" />
                            </g>

                             <path
                                 className="prefix__cls-4"
                                 d="M449.17 600c0 22.34-34.51 29.56-77.08 29.56S295 622.36 295 600s33.42-35.34 76-35.34 78.17 13.02 78.17 35.34z"
                                 opacity={0.88}
                             />
                             <path className="prefix__cls-4" d="M488.39 149.52v460.57" />
                             <path className="prefix__cls-8" d="M488.39 149.52v6" />
                             <path
                                 strokeDasharray="12.12 12.12"
                                 fill="none"
                                 stroke="#ff7900"
                                 strokeMiterlimit={10}
                                 strokeWidth={4}
                                 d="M488.39 167.64v430.39"
                             />
                             <path className="prefix__cls-8" d="M488.39 604.09v6" />
                             <path
                                 className="prefix__cls-10"
                                 d="M470.36 600.74l18.03 15.33 18.42-15.4M469.36 170.85l19.03-21.33 20.42 21.39"
                             />
                            
                     </svg>
                 
                        </div>
                     )
                }}
            </Scene>
        </Controller>
    </div>
)

export default AnimationSvg;
