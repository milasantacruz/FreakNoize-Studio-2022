//https://playground.babylonjs.com/#GANAJL#1
import React from 'react';
import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import {Vector3, Color3, AnimationGroup} from '@babylonjs/core';
import {SceneLoader} from '@babylonjs/core/Loading/sceneLoader'
import SceneComponent from "babylonjs-hook"
import "@babylonjs/inspector"
import "@babylonjs/loaders";
import '@babylonjs/loaders/glTF';

var dancer;
const Playpausescene = () => {
    const onSceneReady = async scene =>{
         //debugLayer
    scene.debugLayer.show();
       //CAMERA
       var camera = new ArcRotateCamera("camera1", 0,0,10, new Vector3(0,0,0), scene);
       camera.setTarget(Vector3.Zero());
       camera.lowerRadiusLimit = 3;
       camera.upperRadiusLimit = 100;
       
       //CANVAS
        const canvas = scene.getEngine().getRenderingCanvas();
       //ATTACH CAMERAS
        camera.attachControl(canvas, true);
   
        //light camera
        var light = new HemisphericLight("light", new Vector3(0,1,0), scene);
        light.intensity = 0.5;
        //scene.ambientColor = new Color3(0.5, 0.2, 1);
        
    //para usar importMeshAsync es necesario convertir OnSceneReady en una funcion asincrona
    var danceLoader = await SceneLoader.ImportMeshAsync("", "/static/4bf8427cef34f72d49420fc738e1d1bb/", "dance.gltf", scene);
    dancer = danceLoader.meshes[0].getChildren()[0];
    dancer.position.z = 0;
    //remove the top level root node
    dancer.setParent(null);
    danceLoader.meshes[0].dispose();

     //set the metadata of each mesh to filter on later
     var dancerMeshes = dancer.getChildMeshes();
    
     for (var i = 0; i < dancerMeshes.length; i++) {
       dancerMeshes[i].metadata = "dancer";
      //console.log(dancerMeshes);
   }

    var importedAnimGroups = danceLoader.animationGroups;
    for (var i = 0; i < importedAnimGroups.length; i++) {
        importedAnimGroups[i].stop();
    }
    var playState = false;
    scene.onPointerDown = function(evt, pickResult){
        console.log(evt, pickResult);
        
        if(pickResult.pickedMesh && pickResult.pickedMesh.metadata === "dancer"){
            
            playState = !playState;
            console.log(playState);
            if(playState == true){
                importedAnimGroups[0].play(true);
            }else{
                importedAnimGroups[0].pause();
            }
        }
    }
    }
    const onRender = scene => {
      
 
   }
 
    return (
        <>
             <SceneComponent antialias onSceneReady={onSceneReady}  id={"sample-canvas"} onRender={onRender} />
        </>
    );
}

export default Playpausescene;
