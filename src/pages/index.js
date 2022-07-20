import React, {useState, useEffect} from 'react'
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "./myStyles.scss"
import Section from "../components/section"
import Welcome from "../components/welcomeTitle"
import Galeria from "../components/galeria"
import ChangeTextureScene from "../components/changeTextureScene"
import Redes from "../components/redes"
import Portada from "../components/portada"
import Contacto from "../components/contacto"
// import UIAnimation from "../components/UIAnimation"


const IndexPage = () => {

  const[isCurrent, setCurrent] = useState(undefined)
  
  useEffect(()=>{
    console.log(isCurrent)
  },[isCurrent])

  return(
      <Layout >
        <Seo title="Home" />
          <Portada setCurrent={setCurrent} />
          {
            (()=>{
              switch(isCurrent){
                case "home":
                  return <ChangeTextureScene/>
                case "contacto":
                  return <Contacto/>
                  case "galeria":
                  return <Galeria/>
                default:
                  return <ChangeTextureScene/>
              }
            })()
          }
          <Redes/>
      
     
      </Layout>
  )
}

export default IndexPage
