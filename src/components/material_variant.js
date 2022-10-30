import React from 'react';
import SceneComponent from "babylonjs-hook"
import WebXRDefaultExperience from "@babylonjs/core/"
import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import {Vector3, UniversalCamera, Color3,Mesh,Tools,EquiRectangularCubeTexture, PhotoDome, Texture, PBRMaterial, SceneLoader, MeshBuilder} from '@babylonjs/core';
import "./changetexturescene.scss"
import "@babylonjs/loaders";
import '@babylonjs/loaders/glTF';
import {KHR_materials_variants} from '@babylonjs/loaders/glTf/2.0/Extensions'
const MaterialVariant = () => {

    const onSceneReady = async scene =>{
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

        var model = await SceneLoader.ImportMeshAsync("", "static/f3f1365a96dd5f1228d915309730b55b/", "material_variant.gltf", scene);
        console.log(model.meshes[1])
        model.meshes[1].position = new Vector3(0,0,0)
        var bVariant = KHR_materials_variants.GetAvailableVariants(model.meshes[2])
        console.log(bVariant)
       // var box = new MeshBuilder.CreateBox("box", {size:"2"}, scene)
       // box.position = new Vector3.Zero()

    }
    return (
        <SceneComponent onSceneReady={onSceneReady} className={"sample-canvas"} />
    );
}

export default MaterialVariant;
