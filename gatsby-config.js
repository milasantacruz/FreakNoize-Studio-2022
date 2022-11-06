require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

 const strapiConfig = {
   apiURL: process.env.STRAPI_API_URL,
   accessToken: process.env.STRAPI_TOKEN,
   collectionTypes: [{
    singularName:`servicio`,
    queryParams:{
      populate:{
        titulo:'*',
        descripcion:{
          populate:{
            data: "*"
          }
        },
        imagenes:'*',
        video:'*',
        categorias:'*'
      }
    }
   },{
    singularName:'step',
    queryParams:{
      populate:{
        titulo:'*',
        introduccion:'*',
        imagen:'*',
        paso:{
          populate:{
            titulo:"*",
            contenido:"*"
          }
        }
      }
    }
   },`proyecto`, `categoria`],
   singleTypes: [],
 };


module.exports = {
  siteMetadata: {
    title: `FreakNoize Studio`,
    description: `FreakNoize Studio.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Roboto\:100, 300, 500`, 
          `Bakbak+One\: 400` ,
          `Philosopher\: 400`      
        ],
        display: 'swap'
      }
    },
      {
        resolve: `gatsby-source-strapi`,
        options: strapiConfig,
      },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo_min.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
