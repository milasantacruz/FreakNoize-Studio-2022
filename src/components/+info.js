import React from 'react';
import "./+info.scss"
const Info = ({setCategorias}) => {

    function handleClick(){
        setCategorias(true)
    }
    return (
        <div className="masInfo">
            <button onClick={handleClick} className="button">+info</button>
        </div>
    );
}

export default Info;
