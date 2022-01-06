import React from 'react';
import {Engine, Scene} from 'react-babylonjs';
import {Vector3, Color3} from '@babylonjs/core';
import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import {MeshBuilder} from '@babylonjs/core/Meshes/meshBuilder';
import {SceneLoader} from '@babylonjs/core/Loading/sceneLoader'
import {StandardMaterial, Ray, RayHelper, ShadowGenerator} from "@babylonjs/core"
import {PBRMetallicRoughnessMaterial} from "@babylonjs/core"
import {AssetsManager} from '@babylonjs/core/Misc/assetsManager'
import {TransformNode} from "@babylonjs/core"
import {useStaticQuery, graphql} from 'gatsby';
import SceneComponent from 'babylonjs-hook';
import "@babylonjs/inspector"
import "@babylonjs/loaders";
import '@babylonjs/loaders/glTF';

let box;
var currentMesh ;
let CoT;
var pbr;
const Scene3 = () => {

  const data = useStaticQuery(graphql`
  {
    allFile(filter: {relativePath: {eq: "head.gltf"}}) {
      edges {
        node {
          id
          relativePath
          publicURL
        }
      }
    }
  }
`)

  console.log(data.allFile.edges[0].node.publicURL);
  var nodo = data.allFile.edges[0].node.publicURL;


  const onSceneReady =  async scene =>{

    //debugLayer
    scene.debugLayer.show();
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
     //scene.ambientColor = new Color3(0.5, 0.2, 1);

     //CREATE GEOMETRY BOX
     box = MeshBuilder.CreateBox("box", {size: 5}, scene);
     box.position.y = 10;
     
      //CREATE MATERIAL TO BOX
      var SM = new StandardMaterial("myBasicMaterial", scene);
    
      SM.diffuseColor = new Color3(1, 0, 1);
      SM.specularColor = new Color3(0.5, 0.6, 0.87);
      //SM.emissiveColor = new Color3(0.3, 0.50, 0.1);
      //SM.ambientColor = new Color3(0.23, 0.98, 0.53);
      box.material = SM;

  //AssetManager
    //  var aManager = new AssetsManager(scene);
    //  var newTask = aManager.addMeshTask("loadMeshes", "/static/4bf8427cef34f72d49420fc738e1d1bb/", "dance.gltf")
    //  aManager.loadAsync(); // !note
    
    //  newTask.onError = function (task, message, exception) {
    //    console.log(message, exception);
    //  }
    
    //  aManager.onProgress = function(remind, total){
    //    console.log(remind, total);
    //  }
    
    
    //  newTask.onSuccess = function(task){
    //    //console.log("exitos")
    //    currentMesh = task.loadedMeshes[0];
    //    currentMesh.position = Vector3.Zero(); 
    //  }

    
    //PBR
    pbr = new PBRMetallicRoughnessMaterial("pbr", scene);
    pbr.baseColor = new Color3(1.0, 0.766, 0.336);
    pbr.emissiveColor = new Color3(1.0, 0.70, 1.6);
    pbr.metallic = 1.0;
    pbr.roughness = 0.0;

    //SCENELOADER  /Append: apende todo a la escene / importMesh carga meshes y las apende a la escena / Load: carga todo y crea una nueva escena
    var sLoader = SceneLoader.ImportMesh("", "/static/05b1ec6cb122d1ef0a3b2bbf5acf9b5f/", "head.gltf", scene, 
    function(meshes){
      //do something
      currentMesh = meshes[0];
      //parentTransform 
      CoT = new TransformNode("parentTransform", scene);
      currentMesh.parent = CoT;
      //Offset
      currentMesh.position.z = 10;
      currentMesh.position.y = 50;
     var myMesh =  scene.getMeshByName("barba")
     myMesh.material = pbr;
   
      
    });

    //BOX RAYCASTER
    var ray = new Ray();
    var rayHelper = new RayHelper(ray);
    
    var localMeshDirection = new Vector3(0, 0, 1);
    var localMeshOrigin = new Vector3(0, 0, .4);
    var length = 30;
    
    rayHelper.attachToMesh(box, localMeshDirection, localMeshOrigin, length);
    rayHelper.show(scene);
  

  }

  const onRender = scene => {
       if(box !== undefined){
           var deltaTimes = scene.getEngine().getDeltaTime();
           const rpm = 15;

           box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimes/ 1000));
       }

       if(CoT !== undefined){
        //  var deltaTimes = scene.getEngine().getDeltaTime();
        //  const rpm = 15;

        //  CoT.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimes/ 1000));
     }

  }


    return (
        <>
            <SceneComponent antialias onSceneReady={onSceneReady}  id={"sample-canvas"} onRender={onRender} />
        </>
    );
}

export default Scene3;
