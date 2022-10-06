import React, {useState, useEffect} from 'react'
import { Link } from "gatsby"
import ReactPageScroller from 'react-page-scroller';
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "./main.scss"
//import Changetexturescene from '../components/changeTextureScene'
import Section from "../components/section"
// import UIAnimation from "../components/UIAnimation"


const IndexPage = ({data}) => {


console.log(data)
  return(
    <Layout>
        <Seo title="Home" />
         {/* <Changetexturescene /> */}
        
         <ReactPageScroller
         renderAllPagesOnFirstRender="false"
         >
          {
           data.allStrapiServicio.edges.map((e,i) =>{
             //console.log(i)
             var current=false;
             if(i%2 !== 0){
               current=false;
               //console.log(current);
             }else{
               current=true;
               //console.log(current);
             }

             return(
               <Section key={e.node.titulo} data={e} prop1={current} />
             )
           })
         } 
       </ReactPageScroller>
       </Layout>
  )
}

export default IndexPage



 export const query = graphql`
   {
     allStrapiServicio {
       edges {
         node {
           id
           titulo
           descripcion {
             data {
               descripcion
             }
           }
           imagenes {
             localFile {
               childImageSharp {
                 gatsbyImageData(height: 500, width: 500, layout: CONSTRAINED)
               }
             }
           }
           video {
             id
             localFile {
               publicURL
             }
           }
         }
       }
     }
   }
 `
