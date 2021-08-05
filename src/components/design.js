import React from 'react';
import AnimationSvg from '../components/animationSvg';
import DesignSvg from '../components/designSvg';

const Design = () => {
    return (
        <div className="gridDesign">
            <div className="designText"><h1>DESIGN</h1></div>
            <div className="imageDesign">
                <DesignSvg/>
            </div>
            <div className="animationText"><h1>ANIMATION</h1></div>
            <div className="imageAnimation">
                <AnimationSvg/>
            </div>
            
            
        </div>
    );
}

export default Design;
