import React, {useState, useEffect} from 'react';
import {graphql} from "gatsby"
import Layout from "../components/layout"
import Reactmarkdown from "react-markdown"
import LandingIndexProvider from "../context/landingIndex"
//import BreadcrumbProvider from "../context/breadcrumbProvider"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import "./stepsA.scss"

const StepsA = ({data}) => {

    const step = data.strapiStep
    //console.log(step)
    var image = getImage(step.imagen[0].localFile);
    var[items, setItems] = useState([step.titulo.split(' ').join('_').toLowerCase()])

   
    useEffect(()=>{
        console.log(step.paso)
       if(step.paso.length>0){
        step.paso.map((e, i)=>{
            var curr = e.titulo.split(' ').join('_').toLowerCase();
           console.log(curr)
           setItems(items => [...items, curr])
           //console.log(items)
        })
       }

    },[])

  
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
                        step.paso.length>0?
                        step.paso.map((e, i)=>{
                            var curr = e.titulo.split(' ').join('_').toLowerCase()
                            //console.log(curr)
                            return(
                                <div id={curr} key={e.titulo+i} className="content">
                                    <h1 className="title">{e.titulo}</h1>
                                    {/* <p>{e.contenido.data.contenido}</p> */}
                                    <Reactmarkdown className="intro" children={e.contenido.data.contenido} />
                                </div>
                            )
                        })
                        :
                        <div></div>
                    }
                </div>
                </div>
            </Layout>
            </LandingIndexProvider>
    );
}



export const query = graphql`
    query Step($stepId: String){
        strapiStep(id:{eq:$stepId}){
            id
          titulo
          introduccion {
            data {
              introduccion
            }
          }
          imagen {
            localFile {
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED, 
                  placeholder: DOMINANT_COLOR
                  transformOptions: {fit: FILL}
                  )
              }
            }
          }
          paso {
            titulo
            contenido {
              data {
                contenido
              }
            }
          }

        }
    }
`

export default StepsA;