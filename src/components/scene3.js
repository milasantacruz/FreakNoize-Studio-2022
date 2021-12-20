import React from 'react';
import {Engine, Scene} from 'react-babylonjs';
import {Vector3, Color3} from '@babylonjs/core';
import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import {MeshBuilder} from '@babylonjs/core/Meshes/meshBuilder';
import {useStaticQuery, graphql} from 'gatsby';
import SceneComponent from 'babylonjs-hook'

let box;
const Scene3 = () => {

    const data = useStaticQuery(graphql`
    {
      file(relativePath: {eq: "shipafter1.png"}) {
        id
        name
      }
    }
  `)

  console.log(data);


  const onSceneReady = scene =>{

    //CAMERA
    var camera = new ArcRotateCamera("camera1", 0,0,10, new Vector3(0,0,0), scene);
    camera.setTarget(Vector3.Zero());
    

    //CANVAS

     const canvas = scene.getEngine().getRenderingCanvas();
     

     //ATTACH CAMERAS
     camera.attachControl(canvas, true);

     //light camera
     var light = new HemisphericLight("light", new Vector3(0,1,0), scene);
     light.intensity = 0.5;

     //CREATE GEOMETRY
    box = MeshBuilder.CreateBox("box", {size: 5}, scene);
    box.position.y = 1;


  }

  const onRender = scene => {
      if(box !== undefined){
          var deltaTimes = scene.getEngine().getDeltaTime();
          const rpm = 10;

          box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimes/ 1000));
      }

  }


    return (
        <>
            <SceneComponent antialias onSceneReady={onSceneReady}  id={"sample-canvas"} onRender={onRender} />
        </>
    );
}

export default Scene3;
