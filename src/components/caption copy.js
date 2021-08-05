import React, {useState, useEffect, useRef} from 'react';
import {gsap} from 'gsap';

const Caption = (props) => {

    var cCaption = props.cCaption;
    var bgColor = props.color;
    var txColor = props.txColor;

    var captionRef = useRef(null);
    var captionRef2 = useRef(null);
 
    useEffect(() =>{
        var tl = gsap.timeline({repeat: -1});
        tl.fromTo([captionRef.current], {x:1600}, { x: -1600,ease: "none", duration: 25});
       
        
    }, [])

    useEffect(() =>{
        
        var tl2 = gsap.timeline({repeat: -1});
        tl2.fromTo([captionRef2.current], {x:1600}, { x: -1600,ease: "none", duration: 25});
       
    },[])

    return (
        <div className="caption" style={{backgroundColor:bgColor}}>
          
                <div ref={captionRef} className="caption_wrapper">
                    
                    <h1 style={{color:txColor}} >{cCaption}</h1>
                    <h1 style={{color:txColor}} >{cCaption}</h1>
                    <h1 style={{color:txColor}} >{cCaption}</h1>
                    <h1 style={{color:txColor}} >{cCaption}</h1>
                    <h1 style={{color:txColor}} >{cCaption}</h1>
                    <h1 style={{color:txColor}} >{cCaption}</h1>
                    <h1 style={{color:txColor}} >{cCaption}</h1>
       
                </div>
             
                <div ref={captionRef2} className="caption_wrapper">
                    
                    <h1 style={{color:txColor}} >{cCaption}</h1>
                    <h1 style={{color:txColor}} >{cCaption}</h1>
                    <h1 style={{color:txColor}} >{cCaption}</h1>
                    <h1 style={{color:txColor}} >{cCaption}</h1>
                    <h1 style={{color:txColor}} >{cCaption}</h1>
                    <h1 style={{color:txColor}} >{cCaption}</h1>
                    <h1 style={{color:txColor}} >{cCaption}</h1>
       
                </div>
             
                
            
        </div>
    );
}

export default Caption;
