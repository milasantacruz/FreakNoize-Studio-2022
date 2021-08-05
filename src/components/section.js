import React from 'react';
const Section = (props) => {

    var bgColor = props.bgColor;
    var children = props.children;
    var cls = props.cls;
    //console.log(bgColor);

    var styleSection = {
        backgroundColor: bgColor,
    }
    return (
        <div className="mySections" style={styleSection}>
            
                 <main className={cls}>{children}</main>
            
        </div>
    );
}

export default Section;
