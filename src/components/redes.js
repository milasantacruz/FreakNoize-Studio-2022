import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBehance, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import "./redes.scss"

const Redes = () => {
    return (
        <div className="columns ">
            <div className="column redes_wrapper" > <a href="https://www.behance.net/FreakNoizeStudio" ><FontAwesomeIcon className="redesIcon" icon={faBehance}/></a> </div>
            <div className="column redes_wrapper" > <a  href="https://www.linkedin.com/in/camilo-moreno-dsgn/"><FontAwesomeIcon className="redesIcon" icon={faLinkedin}/></a> </div>
            <div className="column redes_wrapper" ><a className="redesIcon" href="https://www.instagram.com/freaknoizr/" ><FontAwesomeIcon  icon={faInstagram}/></a></div>
        </div>
    );
}

export default Redes;
