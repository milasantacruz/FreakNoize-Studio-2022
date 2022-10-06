import React from 'react';
import SceneComponent from "babylonjs-hook";
import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import {Vector3, Color3,Mesh, EquiRectangularCubeTexture, PhotoDome, Texture, PBRMaterial} from '@babylonjs/core';
//import "@babylonjs/inspector"
import Icon360 from "./old/icon360"
import "@babylonjs/loaders"
import "@babylonjs/loaders/glTF"
import "./changetexturescene.scss"

const Changetexturescene = () => {
    const onSceneReady = async scene =>{
        //scene.debugLayer.show();
        //CAMERA
       var camera = new ArcRotateCamera("camera1", 0,0,10, new Vector3(0,0,0), scene);
       camera.setTarget(Vector3.Zero());
       camera.lowerRadiusLimit = 3;
       camera.upperRadiusLimit = 100;
       //scene.environmentTexture = HDRCubeTexture("/static/98e627c3972d380cccd5763adbde0925/Nebula01_4K.hdr", scene, 128, false, true, false, true);
        //CANVAS
        const canvas = scene.getEngine().getRenderingCanvas();
       //ATTACH CAMERAS
        camera.attachControl(canvas, true);
   
        //light camera
        var light = new HemisphericLight("light", new Vector3(0,1,0), scene);
        light.intensity = 0.5;
        // DOME IMAGES
        var dome = new PhotoDome("dome", "/static/28c41273f8a761e43bb763c5c01eafb9/Nebula02_8k.jpg", {resolution: 32, size:500});
        dome.imageDome = PhotoDome.MODE_MONOSCOPIC;
        var sphere = Mesh.CreateSphere("sphere", 16, 2, scene);
        var pbr = new PBRMaterial("pbr", scene);
        pbr.microSurface = 0.96;
        pbr.reflectivityColor = new Color3(0.85, 0.85, 0.85);
        pbr.albedoColor = new Color3(0.01, 0.01, 0.01);
        sphere.material = pbr;


    }
    return (
        <div style={{ 
            position:"relative",
            height:"100%"
             }} >
            <Icon360/>
            <SceneComponent antialias onSceneReady={onSceneReady} className={"sample-canvas" }  />
        </div>
    );
}

export default Changetexturescene;
