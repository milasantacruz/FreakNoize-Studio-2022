/*import React from 'react';
import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import SceneComponent from "babylonjs-hook"
import {SceneLoader} from '@babylonjs/core/Loading/sceneLoader'
import "@babylonjs/loaders";
import '@babylonjs/loaders/glTF';
import { Vector3 } from '@babylonjs/core';
import { useStaticQuery, graphql } from "gatsby"

const LoadGltf = () => {


    const data = useStaticQuery(graphql`
    {
      allStrapiGaleria {
        edges {
          node {
            id
            nombre
            modelo {
              id
              url
            }
          }
        }
      }
    }
  `)

 
  
  let text = data.allStrapiGaleria.edges[0].node.modelo[0].url;
  const myArrayHttp = text.split("//")[0];
  const myArray = text.split("//")[1];
  const myArray2 = myArray.split("/",5);
  const gName = myArray.split("/")[5]
  const joined = myArray2.join("/")
  const complete = myArrayHttp + "//" + joined
  console.log(myArray.split("/")[5])
  console.log(myArray)
  console.log(myArray2)
  console.log(joined)
  console.log(complete)

    const onSceneReady = async scene =>{

        var camera = new ArcRotateCamera("camera1", 0,0,10, new Vector3(0,0,0), scene)
        camera.lowerRadiusLimit = 6;
        camera.upperRadiusLimit = 6;
        camera.setTarget(Vector3.Zero());
        
        //CANVAS
         const canvas = scene.getEngine().getRenderingCanvas();
        //ATTACH CAMERAS
         camera.attachControl(canvas, true);
    
         //light camera
         var light = new HemisphericLight("light", new Vector3(0,1,0), scene);
         light.intensity = 0.5;
         //var danceLoader = await SceneLoader.ImportMeshAsync("", complete+"/", gName, scene);
         var danceLoader = await SceneLoader.ImportMeshAsync("", "/static/0ed2827b4ade03aa73140e59c51f51b3/", "Iyelema_B.gltf", scene);
    
    }

   
    return (
        <>
             <SceneComponent antialias onSceneReady={onSceneReady}  id={"sample-canvas"}  />
        </>
    );
}

export default LoadGltf;*/
