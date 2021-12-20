import React from 'react'
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "./myStyles.scss"
import Section from "../components/section"
import Welcome from "../components/welcomeTitle"
import Caption from '../components/caption'
import ExtrudeLogo from "../components/extrudeLogo"
import Design from "../components/design"
import Scene3 from "../components/scene3"

const IndexPage = () => {

  return(
    <Layout >
      <Seo title="Home" />

      <Section  cls="home columns" bgColor="#219653">
        <Welcome className="column" />
        <ExtrudeLogo className="column" />
      </Section>

      <Section cls="modelado" bgColor="#EEEEEE" >
        <Scene3/> 
        <Caption cCaption="Modelado 3D" color="#219653" txColor="#EEEEEE" />
      </Section>

      <Section cls="impresion" bgColor="#219653" >
        <Caption cCaption="Impresion 3D" color="#EEEEEE" txColor="#219653" />
      </Section>
      
      <Section cls="design" bgColor="#EEEEEE" >
        <Design></Design>
      </Section>
     
    </Layout>
  )
}

export default IndexPage
