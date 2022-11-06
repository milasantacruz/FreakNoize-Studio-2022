import React, { useState, useEffect, useCallback } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Form from "./contacto"
import { StaticImage } from "gatsby-plugin-image"
import {Link} from "gatsby" 
import "./menu2.scss"
import { UseIndexContext } from '../context/landingIndex';
const Menu2 = ({ items }) => {


    var [click, setClick] = useState(false)

    const escFunction = useCallback((event) => {
        if (event.key === "Escape") {
           // console.log("esc")
            setClick(false)
        }
    }, []);

    useEffect(() => {
       

        document.addEventListener("keydown", escFunction, false);

        return () => {

            document.removeEventListener("keydown", escFunction, false);
        }
     
    }, [])

    function handleContacto() {
        setClick(true)
    }

    function handleClose() {
        setClick(false)

    }

    var { index, setIndex } = UseIndexContext();
    function handleIndex(e){
        setIndex(e)
    }
    return (
        <div className="menu-container">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                <Link to="/" >
                    <StaticImage
                    alt="logo-freaknoize"
                    className="logo"
                    src="../images/lofo-fkr-min.png"
                    placeholder="tracedSVG"
                    imgClassName="menuImgWrapper"
                    width={180}
                    />
                </Link>
                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div className="navbar-menu">
                    <div className="navbar-start"></div>
                    <div className="navbar-end">
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                    Servicios
                                </a>
                                <div className="navbar-dropdown">
                                    <Link to="/" state={{am:0}} onClick={()=>handleIndex(0)} className="navbar-item">Diseño3D</Link>
                                    <Link to="/" state={{am:1}} onClick={()=>handleIndex(1)} className="navbar-item">AR/VR</Link>
                                    <Link to="/" state={{am:2}} onClick={()=>handleIndex(2)} className="navbar-item">Web</Link>
                                    <Link to="/" state={{am:3}} onClick={()=>handleIndex(3)} className="navbar-item">Mapping</Link>
                                </div>
                            </div>
                        <div onClick={handleContacto} className="navbar-item">
                            <h3>Contacto</h3>
                        </div>
                    </div >
                </div >
            </nav >

            {
                items ?
                    <div className="level bread mb-3 p-1 pl-4">
                        < nav className="breadcrumb has-arrow-separator" >
                            <ul>
                                {
                                    items ?
                                        items.map((e, i) => {
                                            var camelSentence = function camelSentence(str) {
                                                return  (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
                                                {
                                                    return chr.toUpperCase();
                                                });
                                            }
                                            var currentLink = e.replaceAll('_', " ");
                                           // console.log(e, currentLink)
                                            return (
                                                <li key={e+i} className="p-1" ><AnchorLink href={`/${e}`} >{currentLink}</AnchorLink></li>
                                            )
                                        })
                                        :
                                        <div></div>
                                }
                            </ul>
                        </nav >
                    </div >
                    :
                    <div></div>
            }

            <div className={click ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <div className="modal-card-body">
                        <Form />
                    </div>

                </div>
                <button onClick={handleClose} className="modal-close is-large" aria-label="close"></button>
            </div>

        </div >
    );
}

export default Menu2;
