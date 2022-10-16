import React,{useEffect} from 'react';
import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import {Vector3, Color3,CubicEase,EasingFunction,Animation,InterpolateValueAction,UniversalCamera, Tools, ActionManager, ExecuteCodeAction,KeyboardEventTypes,AnimationGroup, SetValueAction} from '@babylonjs/core';
import {SceneLoader} from '@babylonjs/core/Loading/sceneLoader'
import SceneComponent from "babylonjs-hook"
import "@babylonjs/loaders";
import '@babylonjs/loaders/glTF';
import "./changetexturescene.scss"

const DemoScene2 = ({dat}) => {
  console.log(dat)
    const onSceneReady = async scene =>{
        //CAMERA
        var camera = new ArcRotateCamera("camera", Tools.ToRadians(-35), Tools.ToRadians(90), 5, new Vector3(0, 0, 0), scene);
        //var camera = new UniversalCamera("camera1", new Vector3(0, 0, 0), scene);
        //camera.lowerRadiusLimit = 10;
        //camera.upperRadiusLimit = 100;
 
        //CANVAS
         const canvas = scene.getEngine().getRenderingCanvas();
        //ATTACH CAMERAS
         
         camera.attachControl(canvas, true);
         //camera.inputs.clear();
         // Enable mouse wheel inputs.
          //camera.inputs.addMouseWheel();
          //camera.rotation.y = 20;
         //light
        var light = new HemisphericLight("light", new Vector3(0,1,0), scene);
        light.intensity = 0.5;
        scene.useRightHandedSystem = true
        var fort = await SceneLoader.ImportMeshAsync("", "/static/51d10a8e0bfc3c1e23c1469dc67d47a8/", "place03.gltf", scene);
       
        var anim1 = scene.animationGroups[0];
        let animationGroupTarget = anim1.targetedAnimations;
        let newAnimationGroup = new AnimationGroup("cameraAnimationGroup");
        newAnimationGroup.addTargetedAnimation(animationGroupTarget[0].animation, camera);
        newAnimationGroup.addTargetedAnimation(animationGroupTarget[1].animation, camera);
        newAnimationGroup.addTargetedAnimation(animationGroupTarget[2].animation, camera);
        console.log(newAnimationGroup)
        anim1.pause();

        var numFramesToPlay = 60;
        scene.onKeyboardObservable.add((kbInfo) => {
             switch (kbInfo.type) {
               case KeyboardEventTypes.KEYDOWN:
                 console.log("KEY DOWN: ", kbInfo.event.key);
                 newAnimationGroup.play();
                 console.log(camera.rotationQuaternion)
                 if(kbInfo.event.key==='a'){
                  console.log('a')
                  newAnimationGroup.goToFrame(numFramesToPlay);
                  numFramesToPlay+=10;
                 }
                 break;
               case KeyboardEventTypes.KEYUP:
                 //console.log("KEY UP: ", kbInfo.event.key);
                 console.log(newAnimationGroup.targetedAnimations[0].animation.runtimeAnimations);
                 newAnimationGroup.pause();
                 break;
             }
          });
    }

    const onRender = scene => {


    }
    return (
        <SceneComponent antialias onSceneReady={onSceneReady}  className={"sample-canvas"} onRender={onRender} />
    );
}

export default DemoScene2;
