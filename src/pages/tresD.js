import React, {useState, useEffect} from 'react';
import Demo from "../components/demoScene3"
import {Controller, Scene} from 'react-scrollmagic'
const TresD = () => {

    var [dat, setDat] = useState(0);
    useEffect(()=>{
        //console.log(dat)
    },[dat])
    return (
        <div>
            <Controller>
                <Scene
                duration="80%"
                triggerHook="onLeave"
                indicators={true}
                >
                    {(progress,event) =>{
                        //console.log(progress,event)
                        setDat(progress)
                        return(
                            <div className="blaa" style={{height:"100vh", width:"100vw"}} ></div>
                        )
                    }}
                     
                </Scene>
                <Demo dat={dat}/> 
            </Controller>           
        </div>
    );
}

export default TresD;
