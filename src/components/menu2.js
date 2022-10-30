import React, { useState, useEffect, useCallback } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Form from "./contacto"
import {Link} from "gatsby"
import Modal from "../components/myModal"
import { UseIndexContext } from "../context/landingIndex"
import "./menu2.scss"
const Menu2 = ({ items }) => {

    var { index, setIndex } = UseIndexContext()

    var [click, setClick] = useState(false)

    const escFunction = useCallback((event) => {
        if (event.key === "Escape") {
            console.log("esc")
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

    function handleIndex(e) {
        console.log("sdf")
        setIndex(e)

    }

    useState(()=>{
        console.log(index)
    },[index])

    return (
        <div className="menu-container">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <h1>FreakStudio</h1>
                    </a>

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
                                    {/* <div className="nested navbar-item dropdown">
                                            <div class="dropdown-trigger">
                                                <a aria-haspopup="true" aria-controls="dropdown-menu">
                                                    <span>Dropdown button</span>
                                                    <span className="icon is-small">
                                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                                    </span>
                                                </a>
                                            </div>
                                            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                                <div class="dropdown-content">
                                                    <a href="#" className="dropdown-item">
                                                        Dropdown item
                                                    </a>
                                                    <a className="dropdown-item">
                                                        Other dropdown item
                                                    </a>
                                                    <a href="#" class="dropdown-item">
                                                        Active dropdown item
                                                    </a>
                                                    <a href="#" class="dropdown-item">
                                                        Other dropdown item
                                                    </a>
                                                </div>
                                            </div>
                                        </div> */}
                                    {/* ///////////// */}
                                    <Link to="/" state={{am:0}} onClick={() => handleIndex(0)} className="navbar-item">Diseño3D</Link>
                                    <Link to="/" state={{am:1}} onClick={() => handleIndex(1)} className="navbar-item">AR/VR</Link>
                                    <Link to="/" state={{am:2}} onClick={() => handleIndex(2)} className="navbar-item">Web</Link>
                                    <Link to="/" state={{am:3}} onClick={() => handleIndex(3)} className="navbar-item">Mapping</Link>
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
                                            var currentLink = camelSentence(e);
                                            console.log(currentLink)
                                            return (
                                                <li className="p-1" ><AnchorLink href={`/${e}`} >{currentLink}</AnchorLink></li>
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
