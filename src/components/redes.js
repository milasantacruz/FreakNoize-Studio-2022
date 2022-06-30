import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBehance, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import "./redes.scss"

const Redes = () => {
    return (
        <div className="columns ">
            <div className="column redes_wrapper" ><FontAwesomeIcon icon={faBehance}/></div>
            <div className="column redes_wrapper" ><FontAwesomeIcon icon={faLinkedin}/></div>
            <div className="column redes_wrapper" ><FontAwesomeIcon icon={faInstagram}/></div>
        </div>
    );
}

export default Redes;
