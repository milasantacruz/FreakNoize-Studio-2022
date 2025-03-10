import React, {useState, useEffect, useCallback} from 'react'
import { Link } from "gatsby"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Scroller from "../components/scroller"
import Banner from "../components/banner.js"
import LandingIndexProvider from '../context/landingIndex';
import MediaQuery from 'react-responsive';
import "./main.scss"
import { useSpring, animated } from 'react-spring'
//import Changetexturescene from '../components/changeTextureScene'
import Fkr from "../components/fkrScene"
import MaterialVariant from "../components/material_variant"
import Section from "../components/section"
// import UIAnimation from "../components/UIAnimation"


const IndexPage = ({data, location}) => {

  var [click, setClick] = useState(false)

 
  // useEffect(()=>{
  //   data.allStrapiServicio.edges.map((e,i)=>{
  //     setElems(old=>[...old,e])
  //   })
   
  // },[])
  //console.log(elems)
  var[loc, setLoc] = useState(0)
  useState(()=>{

    if(location.state){
      console.log(location.state.am, loc)
      setClick(true)
      setLoc(location.state.am);
      console.log(location.state.am, loc)
     }
     
  },[location])

  
 
  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
        console.log("esc")
    }

   
}, []);

  useEffect(() => {
    
    document.addEventListener("keydown", escFunction, false);

    return () => {

        document.removeEventListener("keydown", escFunction, false);
    }
}, [])

const enter = useSpring({ to: { opacity: 1, x:"0px"}, from: { opacity: 0, x:"-500px"} })
const leave = useSpring({ to: { opacity: 0, x:"-500px"}, from: { opacity: 1, x:"0px"} })

  return(
    <LandingIndexProvider>
      <div className="loaderWrapper">
        {
          click?
          <Layout>
          <Seo title="Home" />
          {/* <Changetexturescene /> */}
            {/* <MaterialVariant/> */}
            
          <MediaQuery maxWidth={992}>
            {
                data.allStrapiServicio.edges.map((e,i) =>{
                console.log(i)
                  var current=false;
                  if(i%2 !== 0){
                    current=false;
                    //console.log(current);
                  }else{
                    current=true;
                    //console.log(current);
                  }
                  var id=e.node.titulo.split(' ').join('_').toLowerCase()
                  console.log(id)
                  return(
                    
                    <div  key={e.node.titulo} >
                      <Section id={id} data={e} prop1={current} />
                    </div>
                  )
                })
              } 
          </MediaQuery>
          
          <MediaQuery minWidth={992} >
            <Scroller data={data} location={loc}/>
          </MediaQuery>
        </Layout>
        :
        <div>
          <MediaQuery minWidth={992}><Fkr setClick={setClick}/></MediaQuery>
          <MediaQuery maxWidth={992}></MediaQuery>
        </div>
        
        }
         
      </div>
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
