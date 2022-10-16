import React,{useEffect} from 'react';
import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import {Vector3, Color3,CubicEase,EasingFunction,Animation,InterpolateValueAction,UniversalCamera, Tools, ActionManager, ExecuteCodeAction,KeyboardEventTypes,AnimationGroup, SetValueAction} from '@babylonjs/core';
import {SceneLoader} from '@babylonjs/core/Loading/sceneLoader'
import SceneComponent from "babylonjs-hook"
import "@babylonjs/loaders";
import '@babylonjs/loaders/glTF';
import "./changetexturescene.scss"
const DemoScene3 = () => {
    const onSceneReady = async scene =>{
        //var camera = new UniversalCamera("camera1", new Vector3(0, 0, 0), scene);
        var camera = new ArcRotateCamera("camera", Tools.ToRadians(-120), Tools.ToRadians(1.5), 5, new Vector3(0, 0, 0), scene);
        //camera.inputs.addMouseWheel();
        //CANVAS
         const canvas = scene.getEngine().getRenderingCanvas();
        //ATTACH CAMERAS
         
         camera.attachControl(canvas, true);
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
        console.log(scene.cameras)
        newAnimationGroup.play();
    }
    const onRender = scene => {


    }
    return (
        <SceneComponent antialias onSceneReady={onSceneReady}  className={"sample-canvas"} onRender={onRender} />
    );
}

export default DemoScene3;
