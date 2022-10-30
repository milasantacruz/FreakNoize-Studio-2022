import React, {useState, useEffect} from 'react';
import Layout from "../components/layout"
import Reactmarkdown from "react-markdown"
import LandingIndexProvider from "../context/landingIndex"
//import BreadcrumbProvider from "../context/breadcrumbProvider"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import "./stepsA.scss"

const StepsA = ({pageContext}) => {

    const {step} = pageContext
    console.log(step)
    var image = getImage(step.imagen[0].localFile);
    var[items, setItems] = useState([step.titulo.split(' ').join('_').toLowerCase()])

   
    useEffect(()=>{
        step.paso.map((e, i)=>{
            var curr = e.titulo.split(' ').join('_').toLowerCase()
           setItems(items => [...items, curr])
        })

        //console.log(items)
    },[])

    useEffect(()=>{
    },[items])


    return (
            <LandingIndexProvider>
                <Layout  items={items}>
                <div className='stepContainer container ' >
                <div className="columns is-centered">
                    <div className="column is-12 has-text-centered">
                        <GatsbyImage imgClassName="imgStep" className="stepBanner" image={image} alt={step.titulo}/>
                    </div>
                </div>
                <div className="section">
                    <div className="content" id={step.titulo.split(' ').join('_').toLowerCase()}>
                        <h1 className="title is-1">{step.titulo}</h1>
                        {/* <p>{step.introduccion.data.introduccion}</p> */}
                        <Reactmarkdown className="intro" children={step.introduccion.data.introduccion} />
                    </div>
                    {
                        step.paso.map((e, i)=>{
                            var curr = e.titulo.split(' ').join('_').toLowerCase()
                            console.log(curr)
                            return(
                                <div id={curr} key={e.titulo+i} className="content">
                                    <h1 className="title">{e.titulo}</h1>
                                    {/* <p>{e.contenido.data.contenido}</p> */}
                                    <Reactmarkdown className="intro" children={e.contenido.data.contenido} />
                                </div>
                            )
                        })
                    }
                </div>
                </div>
            </Layout>
            </LandingIndexProvider>
    );
}

export default StepsA;
