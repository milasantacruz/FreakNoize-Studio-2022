import React from 'react';

const DesignSvg = () => {


  return(
    <div>
          <svg viewBox="0 0 742 742">
                  
                  <path
                    d="M659.31 742H82.69L0 659.31V82.69L82.69 0h576.62L742 82.69v576.62z"
                    fill="#219653"
                    />
                    <path
                        d="M587.81 670.5H154.19L71.5 587.81V154.19l82.69-82.69h433.62l82.69 82.69v433.62z"
                        strokeLinejoin="bevel"
                        strokeLinecap="square"
                        stroke="#219653"
                        fill="#212121"
                        strokeWidth={7}
                      />
                      <path
                        d="M179.59 511.06c237.88 0 237.88-276.71 0-276.71"
                        strokeWidth={39}
                        fill="none"
                        strokeLinejoin="bevel"
                        strokeLinecap="square"
                        stroke="#219653"
                      />
                      <circle
                        cx={486.5}
                        cy={304.5}
                        r={68.5}
                        strokeWidth={27}
                        strokeMiterlimit={10}
                        fill="none"
                        stroke="#219653"
                      />

                      <g transform="translate(400, 420) scale(1.5)" >
                      <path fill="#e3651b">
                      <animate 
                        attributeName="d" 
                        dur="4000ms" 
                        repeatCount="indefinite"
                        keyTimes="0;
                                  .0625;
                                  .3125;
                                  .395833333;
                                  .645833333;
                                  .833333333;
                                  1"
                        calcMode="spline" 
                        keySplines="0,0,1,1;
                                    .42,0,1,1;
                                    0,0,.58,1;
                                    .42,0,.58,1;
                                    .42,0,.58,1;
                                    .42,0,.58,1"
                            
                        values="M 0,0 C 50,0 50,0 100,0 100,50 100,50 100,100
                                50,100 50,100 0,100 0,50 0,50 0,0 Z;
                                      
                                M 0,0 C 50,0 50,0 100,0 100,50 100,50 100,100
                                50,100 50,100 0,100 0,50 0,50 0,0 Z; 

                                M 50,0 C 75,50 75,50 100,100 50,100 50,100 0,100
                                12.5,75 12.5,75 25,50 37.5,25 37.5,25 50,0 Z;

                                M 50,0 C 75,50 75,50 100,100 50,100 50,100 0,100
                                12.5,75 12.5,75 25,50 37.5,25 37.5,25 50,0 Z;

                                M 100,50 C 100,77.6 77.6,100 50,100 22.4,100 0,77.6
                                0,50 0,22.4 22.4,0 50,0 77.6,0 100,22.4 100,50 Z;
                                      
                                M 100,50 C 100,77.6 77.6,100 50,100 22.4,100 0,77.6 
                                0,50 0,22.4 22.4,0, 50,0 77.6,0 100,22.4 100,50 Z;
                                      
                                M 100,100 C 50,100 50,100 0,100 0,50 0,50 0,0
                                50,0 50,0 100,0 100,50 100,50 100,100 Z;"/>
                      </path>

                      </g>
                      <path
                        strokeLinecap="round"
                        strokeWidth={39}
                        fill="none"
                        strokeLinejoin="bevel"
                        stroke="#219653"
                        d="M205.09 238.6v268.65"
                      />

                  
                      <path
                        className="pathD"
                        strokeWidth={20}
                        fill="#e3651b"
                        strokeMiterlimit={10}
                        stroke="#219653"
                        d="M391.72 216.5l181.94 181.94"
                      />
                </svg>
        
    </div>
  )
}

export default DesignSvg;
