import React from 'react';
import "./+info.scss"
import {Link} from "gatsby"
const Info = ({categorias}) => {
    console.log(window.location.host)
    //console.log(categorias)
    return (
        <div className="masInfo">
            {/* <button onClick={handleClick} className="button">+info</button> */}
            <ul className="list has-hoverable-list-items">
               {
                categorias.map((e,i) => {
                    var l = `/${e.nombre.split(' ').join('_').toLowerCase()}`
                    return(
                        <Link key={e.nombre+i}  to={l}>
                            <div className="list-item">
                                <div className="list-item-title has-text-white">
                                    {e.nombre}
                                </div>
                            </div>
                        </Link>
                    )
                })
               }
            </ul>
        </div>
    );
}

export default Info;
