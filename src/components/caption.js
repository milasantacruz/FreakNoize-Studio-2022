import React, {useState, useEffect} from 'react';

const Caption = (props) => {

    var [cCaption, setcCaption] = useState([]);
    var bgColor = props.color;
    var txColor = props.txColor;

    function fill(){
        for(var i = 0 ; i < 20; i ++){
            setcCaption(prev=>[props.cCaption+"  ", ...prev])
        }
        console.log("fillll");
    }

    useEffect(()=>{
        
        fill();

        console.log(cCaption);
        
    },[])

    
    return (
        <div className="caption" style={{backgroundColor:bgColor}}>
          
          <svg>
            <text
            style={{fill : txColor }}
            >
                {cCaption.map(elem => elem)}
                <animateMotion 
                dur="16s"
                repeatCount="indefinite" 
                path="M 1800 100 H-1800 " />
            </text>
           </svg>
 
                    
        </div>
    );
}

export default Caption;
