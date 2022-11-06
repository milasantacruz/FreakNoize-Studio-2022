/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import React,{useEffect} from 'react'
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import LandingIndexProvider from "../context/landingIndex"
import Menu from "./menu2"
import "./layout.css"


const Layout = ({ children, items , elems}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
 useEffect(()=>{
 // console.log(items)
 },[items])
  return (
    <LandingIndexProvider>
        <header> <Menu items={items} elems={elems} /> </header>
        <main>{children}</main>
    </LandingIndexProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
