import React from 'react';
import {Link} from "gatsby"
const Menu2 = () => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
             <div className="navbar-brand">
                <a class="navbar-item" href="https://bulma.io">
                <h1>FreakStudio</h1>
                </a>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu">
                <div className="navbar-start"></div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <h3>Diseno</h3>
                    </div>
                    <div className="navbar-item">
                        <Link to="/tresD" ><h3>3D</h3></Link>
                    </div>
                    <div className="navbar-item">
                        <h3>Web</h3>
                    </div>
                    <div className="navbar-item">
                        <h3>contacto</h3>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Menu2;
