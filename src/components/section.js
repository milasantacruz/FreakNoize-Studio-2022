import React, { useState, useEffect } from 'react';
import "./section.scss"
import MediaInfo from "./mediaInfo"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
const Section = ({ data, prop1 }) => {

    //console.log(data.node.categorias)
    var img = getImage(data.node.imagenes[0].localFile)


    //INTERSECCION
    // console.log(data.node.categorias)
    var [intersec, setIntersec] = useState(false)

    useEffect(() => {
       // console.log(data.node.categorias[0].nombre)
        if (window.innerWidth >= 992) {
            let callback = (entries, observer) => {
                entries.forEach(entry => {
                    // from MDN:
                    /* Each entry describes an intersection change for one observed
                     target element:
                       entry.boundingClientRect
                       entry.intersectionRatio
                       entry.intersectionRect
                       entry.isIntersecting
                       entry.rootBounds
                       entry.target
                       entry.time
                    entry.target.innerHTML = entry.isIntersecting ? 'I am in view!' : 'I am not in view';
                    //do whatever you want to do when the div goes out of or comes into the viewport*/
                    entry.isIntersecting ? setIntersec(true) : setIntersec(false)
                });
            };
            const divs = document.querySelectorAll('.columns');
            const observer = new IntersectionObserver(callback);
            divs.forEach(div => {
                observer.observe(div);
            });
        } else {
            setIntersec(true)
        }


    }, [])
    useState(() => {
       // console.log(intersec)
    }, [intersec])

    if (prop1) {
        return (
            <div className="section100 section">
                {
                    intersec ?
                        <div></div>
                        :
                        <div className="columns">
                            <div className="column">
                                <GatsbyImage className="hue" image={img} alt={data.node.titulo} />
                            </div>
                            <div className="column infoColumn">
                                <MediaInfo
                                    nodo={data.node}
                                    des={data.node.descripcion.data.descripcion}
                                    pos={prop1}
                                />
                            </div>

                        </div>
                }
            </div>
        );

    } else {
        return (

            <div className="section100 section">
                <div className="columns">
                    <div className="column infoColumn">
                        {
                            intersec ?
                                <div></div>
                                :
                                <MediaInfo
                                    nodo={data.node}
                                    des={data.node.descripcion.data.descripcion}
                                    pos={prop1}
                                />
                        }
                    </div>
                    <div className="column">
                        {
                            intersec ?
                                <div></div> :
                                <GatsbyImage className="hue" image={img} alt={data.node.titulo} />

                        }
                    </div>
                </div>
            </div>
        );

    }
}

export default Section;
