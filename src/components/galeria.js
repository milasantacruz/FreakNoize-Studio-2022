import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Controller, Scene } from 'react-scrollmagic'
import { Tween, Timeline } from 'react-gsap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import scrollIconG from "../../content/scrollGalerias.json"
import ScrollGalerias from "./scrollGalerias"

import "./galeria.scss"


const Galeria = () => {
  const data = useStaticQuery(graphql`
    {
      allStrapiGaleriaSeleccion {
        edges {
          node {
            id
            nombre
            image {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED, 
                    placeholder: DOMINANT_COLOR,
                    width: 600
                    )
                }
              }
            }
            video {
              url
            }
          }
        }
      }
    }
  `)

  //console.log(data.allStrapiGaleriaSeleccion)

  var [pulse, setPulse] = useState(true)
  var [active, setActive] = useState(false)
  var videoRef = useRef()

  function handlePlay() {
    setActive(true)
    videoRef.current.play();
  }

  function handleClose() {
    setActive(false)
    document.querySelector('#pinContainer').removeEventListener('wheel', preventScroll);
    videoRef.current.currentTime = 0.2;
  }

  function handleEnter() {
    setPulse(false)
  }

  function handleLeave() {
    setPulse(true)
  }

  function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();

    return false;
  }

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      console.log("esc")
      setActive(false)
    }
  }, []);

  useEffect(() => {

    if (active === true) {
      document.querySelector('#pinContainer').addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener("keydown", escFunction, false);

      return () => {
        document.querySelector('#pinContainer').removeEventListener('wheel', preventScroll);
        document.removeEventListener("keydown", escFunction, false);
      }
    }
  }, [active])

  return (
    <div className="galeriaWrapper">
      <svg style={{ display: "none" }} >
        <def>
          <filter id="glow">
            <feGaussianBlur stdDeviation="5 5" result="glow" />
            <feMerge>

              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </def>
      </svg>
      <ScrollGalerias
        scrollIcon={scrollIconG}
      />
      <Controller>
        <Scene
          triggerHook="onLeave"
          duration="900%"
          pin
        >
          <Timeline
            wrapper={<div id="pinContainer" />}
          >

            {
              data.allStrapiGaleriaSeleccion.edges.map((e, i) => {
                var current = e.node
                var img = getImage(current.image.localFile)
                var hasVideo = false
                var bgInit = i % 2 === 0 ? true : false
                console.log(bgInit)
                if (current.video) {
                  console.log(current.nombre)
                  hasVideo = true;
                } else {
                  hasVideo = false
                }

                return (
                  <Tween
                    key={current.nombre}
                    from={{ x: "500%" }}
                    to={{ x: "-14%" }}
                  >
                    <div key={current.id} className="itemWrapper " style={{ backgroundColor: bgInit ? "black" : "aliceblue" }}>
                      <h1 className="cornerText" >{"#0000" + current.nombre}</h1>
                      {
                        hasVideo ?
                          <div id={current.id} className={active ? "modal is-active" : "modal"}>
                            <div className="modal-background"></div>
                            <div className="modal-content">
                              <video
                                ref={videoRef}
                                className="video-player"
                                loop
                                muted
                                controls
                              >
                                <source
                                  src={current.video.url}
                                />
                              </video>
                            </div>
                            <button onClick={handleClose} className="modal-close is-large" aria-label="close"></button>
                          </div>
                          :
                          <div></div>
                      }
                      <div className="shadowElem">
                        <div
                          className="cardWrapper">
                          <div className="card">
                            <div className="card-image">
                              <GatsbyImage image={img} alt={current.nombre} />
                            </div>
                            <div className="card-footer">
                              <div className="card-footer-item pointer" onClick={hasVideo ? handlePlay : undefined}>
                                <FontAwesomeIcon onMouseEnter={handleEnter} color={hasVideo ? "greenyellow" : "grey"} onMouseLeave={handleLeave} icon={faPlayCircle} beat={hasVideo ? pulse : false} />
                              </div>
                              <div className="card-footer-item">
                                <h1>{"#0000" + current.nombre}</h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tween>
                )
              })
            }

          </Timeline>
        </Scene>
      </Controller>

    </div>
  );
}

export default Galeria;
