import React from 'react';
import { SplitChars,Tween } from 'react-gsap';

const WelcomeTitle = () => {
    return (
        <div className="welcome">
            <Tween
            from={{ x:"-800px" }}
            to={{ x: '0px' }} 
            stagger={0.2} 
            ease=" Back.easeOut.config(1.7)"
            >
                <div>
                    <SplitChars
                        wrapper={ <div className="mySplit" /> }
                        >
                            Diseño,
                    </SplitChars>
                </div>

               <div>
               <SplitChars
                    wrapper={ <div className="mySplit" /> }
                    >
                        Modelado e
                </SplitChars>
               </div>

                <div>
                <SplitChars
                    wrapper={ <div className="mySplit" /> }
                    >
                        Impresion 3D!
                </SplitChars>
                </div>
            </Tween>
        </div>
    );
}

export default WelcomeTitle;
