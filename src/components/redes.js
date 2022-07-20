import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBehance, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import "./redes.scss"

const Redes = () => {
    return (
        <div className="columns is-mobile redesWrapper">
             <a className="redesIcon column" href="https://www.behance.net/FreakNoizeStudio" ><FontAwesomeIcon icon={faBehance}/></a> 
             <a className="redesIcon column" href="https://www.linkedin.com/in/camilo-moreno-dsgn/"><FontAwesomeIcon icon={faLinkedin}/></a> 
            <a className="redesIcon column" href="https://www.instagram.com/freaknoizr/" ><FontAwesomeIcon  icon={faInstagram}/></a>
        </div>
    );
}

export default Redes;
