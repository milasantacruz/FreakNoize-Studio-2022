import React from 'react';
import SceneComponent from "babylonjs-hook"
import WebXRDefaultExperience from "@babylonjs/core/"
import {HemisphericLight,DirectionalLight} from '@babylonjs/core/Lights'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import {Vector3,Color3,SceneLoader,MeshBuilder} from '@babylonjs/core';
import "./changetexturescene.scss"
import "@babylonjs/inspector"
import "@babylonjs/loaders";
import '@babylonjs/loaders/glTF';
const FkrScene = () => {
    const onSceneReady = async scene =>{
       
        scene.debugLayer.show();
        var camera = new ArcRotateCamera("Camera", 0, 0, 10, new Vector3(0, 0, 0), scene);

        // Positions the camera overwriting alpha, beta, radius
        camera.setPosition(new Vector3(0, 0, 20));
        //CANVAS
         const canvas = scene.getEngine().getRenderingCanvas();
        //ATTACH CAMERAS
         
        camera.attachControl(canvas, true);
        var light = new HemisphericLight("light", new Vector3(0,1,0), scene);
        light.intensity = 0.5;
        scene.useRightHandedSystem = true

        //Light direction is directly down
        var light2 = new DirectionalLight("DirectionalLight", new Vector3(1, -1, 0), scene);
        light2.diffuse = new Color3(1, 0, 0);
        light2.specular = new Color3(0, 1, 0);
        light2.intensity = 5;
        light2.position = new Vector3(0,11,0);

        var model = await SceneLoader.ImportMeshAsync("", "/static/5c1ecb25a02edcfe8c02387526017cf6/", "FreakNoizeStudio.gltf", scene);
        console.log(model.meshes[1])

       // var sphere = MeshBuilder.CreateSphere("sphere", {}, scene);	
      
    }
    return (
        <SceneComponent onSceneReady={onSceneReady} className={"sample-canvas"} />
    );
}

export default FkrScene;
