/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
export const onClientEntry = () => {
    console.log("from browserClientEntry")
    //callAnalyticsAPI()
  }

  export const onInitialClientRender = () => {
    console.log("from onInitialClientRender")
  }

  export const onPreRouteUpdate = () => {
    console.log("from onPreRouteUpdate")
   
}