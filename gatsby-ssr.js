/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
// import Loader from "./src/components/fkrScene"
export const onRenderBody = ({
    setPreBodyComponents,
    setBodyAttributes,
}) => {
    setPreBodyComponents([
    //   <Loader key={"loader"+123} />
    ])

    
    setBodyAttributes({
        className:"preloader_active"
    })
  }
  
  export const onPreRenderHTML = ({
    getHeadComponents
  })=>{
    //const headComponents = getHeadComponents()
    //console.log("headComps: "+headComponents)
  }