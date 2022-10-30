import React, {useState, useEffect} from 'react'
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Scroller from "../components/scroller"
import Banner from "../components/banner.js"
import LandingIndexProvider from '../context/landingIndex';
import MediaQuery from 'react-responsive';
import "./main.scss"
//import Changetexturescene from '../components/changeTextureScene'
import Fkr from "../components/fkrScene"
import MaterialVariant from "../components/material_variant"
import Section from "../components/section"
// import UIAnimation from "../components/UIAnimation"


const IndexPage = ({data, location}) => {
 
  // useEffect(()=>{
  //   data.allStrapiServicio.edges.map((e,i)=>{
  //     setElems(old=>[...old,e])
  //   })
   
  // },[])
  //console.log(elems)

  return(
    <LandingIndexProvider>
      <Layout>
          <Seo title="Home" />
          {/* <Changetexturescene /> */}
            {/* <MaterialVariant/> */}
            <Fkr/>
          <MediaQuery maxWidth={992}>
            {
                data.allStrapiServicio.edges.map((e,i) =>{
                // console.log(i)
                  var current=false;
                  if(i%2 !== 0){
                    current=false;
                    //console.log(current);
                  }else{
                    current=true;
                    //console.log(current);
                  }

                  return(
                    
                    <div  key={e.node.titulo} >
                      <Section id="prueba"  data={e} prop1={current} />
                    </div>
                  )
                })
              } 
          </MediaQuery>
          
          <MediaQuery minWidth={992} >
            <Scroller data={data} location={location} />
          </MediaQuery>
        </Layout>
      </LandingIndexProvider>
  )
  


 
}

export default IndexPage



 export const query = graphql`
   {
     allStrapiServicio(sort: {fields: strapi_id, order: ASC}){
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
           categorias {
            id
            nombre  
            step{
              id
            }         
          }

         }
       }
     }
   }
 `
