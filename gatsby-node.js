/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')
exports.createPages = async({ graphql,actions, reporter })=>{
    const {createPage} = actions;
    const result = await graphql(`
    {
      steps : allStrapiStep {
        edges {
          node {
            id
            titulo
            introduccion {
              data {
                introduccion
              }
            }
            imagen {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED, 
                    placeholder: DOMINANT_COLOR
                    transformOptions: {fit: FILL}
                    )
                }
              }
            }
            paso {
              titulo
              contenido {
                data {
                  contenido
                }
              }
            }
          }
        }
      }
    }
  `)

  //handle errors

  if(result.errors){
    reporter.panicOnBuild('Error running graphQL')
    return
  }

  //creamos las paginas
  const stepsTemplate = path.resolve(`src/templates/stepsA.js`)
  result.data.steps.edges.forEach(({node}) =>{
    const pathId = node.id
    const path =`/${node.titulo.split(' ').join('_').toLowerCase()}/`
    console.log(path)
    createPage({
        path:path,
        component:stepsTemplate,
        context:{
            step: node,
            stepId: pathId,
        }
    })
  })
}