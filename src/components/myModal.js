import React from 'react';
import "./myModal.scss"
import {Link} from "gatsby"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons"
import { useSpring, animated } from 'react-spring'

const MyModal = ({categorias, setCategorias}) => {
    
    const inL = useSpring({ to: { opacity: 1, x:"0px"}, from: { opacity: 0, x:"-500px"} })
    const inR = useSpring({ to: {opacity: 0, x:"-500px"}, from: { opacity: 1, x:"0px"} })
    
    function handleClose(){
        setCategorias(false)
    }
    return (
        <div className="myModal">
        <ul>
            {
                categorias.map((e,i)=>{
                   // console.log(`/${categorias[i].nombre.split(' ').join('_').toLowerCase()}`)
                    return(
                        <animated.div className="casilla" key={i+e} style={categorias?inL:inR}>
                            <Link to={`/${categorias[i].nombre.split(' ').join('_').toLowerCase()}`}>
                                <li className="has-text-white is-size-1" key={i+e} >
                                        {e.nombre}
                                </li>
                            </Link>
                        </animated.div>
                    )
                })
            }
            <animated.div onClick={handleClose} style={categorias?inL:inR} className="casilla" ><li className="liArrow"><FontAwesomeIcon size={"2x"} icon={faArrowLeftLong}/></li></animated.div>
        </ul>

    </div>
    );
}

export default MyModal;

