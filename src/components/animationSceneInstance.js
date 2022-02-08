//https://playground.babylonjs.com/#GANAJL#1
import React from 'react';
import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import {Vector3, Color3, AnimationGroup, Tools} from '@babylonjs/core';
import {SceneLoader} from '@babylonjs/core/Loading/sceneLoader'
import SceneComponent from "babylonjs-hook"
import "@babylonjs/inspector"
import "@babylonjs/loaders";
import '@babylonjs/loaders/glTF';
//https://playground.babylonjs.com/#S7E00P#49
var dancer;
const AnimationsceneInstance = () => {
    const onSceneReady = async scene =>{
         //debugLayer
  //  scene.debugLayer.show();
  
       //CAMERA
       var camera = new ArcRotateCamera("camera", Tools.ToRadians(-35), Tools.ToRadians(90), 25, new Vector3(0, 2, 0), scene);
       camera.lowerRadiusLimit = 10;
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
   
    //DANCER
    dancer = danceLoader.meshes[0].getChildren()[0];
    //console.log(danceLoader.meshes[0]);
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

  const importedAnimGroups = danceLoader.animationGroups;
  //console.log(importedAnimGroups);
   //loop through all imported animation groups and copy the animation curve data to an array.
   var animations = [];
     for (var i = 0; i < importedAnimGroups[0].targetedAnimations.length; i++) {
      //  console.log(importedAnimGroups[0].targetedAnimations.length);
        importedAnimGroups[0].stop();
        animations.push(importedAnimGroups[0].targetedAnimations[i].animation);
        importedAnimGroups[i].dispose();
      }
     // console.log(animations)
     //create a new animation group and add targeted animations based on copied curve data from the "animations" array.
     var danceAnimGroup = new AnimationGroup("danceAnimGroup");
     danceAnimGroup.addTargetedAnimation(animations[0], dancer);
    //  danceAnimGroup.addTargetedAnimation(animations[0], dancer.getChildMeshes()[1]);

    //array for holding the dancer and "paired" animation group
    var dancerAnimationPairings = {};
    //array for holding readyToPlay status for the cannons
    var dancerReadyToPlay = {};

    //create 10 dancer clones, each with unique position/rotation data.
    //also create 10 new animation groups with targeted animations applied to the newly cloned meshes
    for (var i = 0; i < 2; i++) {
        var dancerClone = dancer.clone("dancerClone" + i);
        //console.log(dancer.meshes.length);
        dancerClone.scaling = new Vector3(2, 2, 2);
        dancerClone.rotation = new Vector3(0,90,0);
        dancerClone.position.z = 0;
        dancerClone.position.x = i * 2;

        var dancerAnimGroupClone = new AnimationGroup("dancerAnimGroupClone" + i);
        dancerAnimGroupClone.addTargetedAnimation(danceAnimGroup.targetedAnimations[0].animation, dancerClone.getChildMeshes()[0]);
        dancerAnimGroupClone.addTargetedAnimation(danceAnimGroup.targetedAnimations[0].animation, dancerClone.getChildMeshes()[1]);
        //console.log(danceAnimGroup.targetedAnimations)
        //store a key/value pair of each clone name and the name of the associated animation group name.
        dancerAnimationPairings[dancerClone.name] = dancerAnimGroupClone.name;
     // console.log(dancerAnimationPairings)
        //store key/value pair for the dancer name and it's readyToPlay status as 1;
        dancerReadyToPlay[dancerClone.name] = 1;
    }
    
   // console.log(dancerReadyToPlay);
    //dispose of the original cannon, animation group, and particle system
    dancer.dispose();
    danceAnimGroup.dispose();

    //logic of what happens on a click
    scene.onPointerDown = function(evt, pickResult){
    //console.log(evt, pickResult);
          //check if a mesh was picked and if that mesh has specific metadata
          if (pickResult.pickedMesh && pickResult.pickedMesh.metadata === "dancer") {
             
              var topParent;
              if(pickResult.pickedMesh.parent){
                topParent = pickResult.pickedMesh.parent;
              }
              
              //console.log(topParent.name)
              //wrap all 'play' elements into a check to make sure the cannon can be played.
              if(dancerReadyToPlay[topParent.name] === 1){
                //set the readyToPlay status to 0
                dancerReadyToPlay[topParent.name] = 0;
                //loop through all of the animation groups in the scene and play the correct group based on the top level parent of the picked mesh.
                var animationToPlay = dancerAnimationPairings[topParent.name];
                console.log(dancerAnimationPairings);
                for (var i = 0; i < scene.animationGroups.length; i++) {
                    if (scene.animationGroups[i].name === animationToPlay) {
                        scene.animationGroups[i].play();
                        //after the animation has finished, set the readyToPlay status for this cannon to 1;
                        scene.animationGroups[i].onAnimationGroupEndObservable.addOnce(() => {
                            dancerReadyToPlay[topParent.name] = 1;
                        });
                    }
                }
              }
              //scene.animationGroups[0].play();
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

export default AnimationsceneInstance;
