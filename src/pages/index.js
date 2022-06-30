import React from 'react'
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "./myStyles.scss"
import Section from "../components/section"
import Welcome from "../components/welcomeTitle"
import Caption from '../components/caption'
import Design from "../components/design"
import PlayPauseScene from "../components/playPauseScene"
import ChangeTextureScene from "../components/changeTextureScene"
import Redes from "../components/redes"
import Icon360 from "../components/icon360"
import LoadGltf from "../components/loadGltf"
import Portada from "../components/portada"
// import UIAnimation from "../components/UIAnimation"
const IndexPage = () => {

  return(
      <Layout >
        <Seo title="Home" />

        {/* <Section  cls="home columns" bgColor="#219653">
          <Welcome className="column" />
          <ExtrudeLogo className="column" />
        </Section> */}

        <Section cls="home2" bgColor="#000000" >
          {/* <Welcome className="column" /> */}
          <Portada/>
          <Icon360/>
          <ChangeTextureScene/>
          <Welcome/>
          <Redes/>
        </Section>

        {/* <Section cls="modelado" bgColor="#EEEEEE" >
          <LoadGltf/>
          <Caption cCaption="Modelado 3D" color="#219653" txColor="#EEEEEE" />
        </Section> */}

        {/* <Section cls="impresion" bgColor="#219653" >
          <PlayPauseScene/>
          <Caption cCaption="Impresion 3D" color="#EEEEEE" txColor="#219653" />
        </Section> */}
      
     
      </Layout>
  )
}

export default IndexPage
