import React, {useState, useEffect} from 'react';
import SceneComponent from "babylonjs-hook"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComputerMouse} from '@fortawesome/free-solid-svg-icons';
//import WebXRDefaultExperience from "@babylonjs/core/"
import {HemisphericLight,DirectionalLight} from '@babylonjs/core/Lights'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import {Vector3,Color3,SceneLoader,MeshBuilder, Animation, Quaternion} from '@babylonjs/core';
import "./changetexturescene.scss"
//import "@babylonjs/inspector"
import "@babylonjs/loaders";
import '@babylonjs/loaders/glTF';
import { DefaultRenderingPipeline,StandardMaterial,CubeTexture,Texture } from '@babylonjs/core';
const FkrScene = ({setClick}) => {

var[count, setCount] = useState(0)
useEffect(()=>{
    window.addEventListener("wheel", event => {
       // console.info(count)
        if(event.deltaY > 0){
           // console.log("-")
            setInterval(()=>{
                setClick(true)
            },1000)
        }

    });

  
},[])


    var camera;
    const onSceneReady = async scene =>{
       
        // scene.debugLayer.show();
        camera = new ArcRotateCamera("Camera", 0, 0, 0, new Vector3(0, 0, 0), scene);

        // Positions the camera overwriting alpha, beta, radius
        camera.setPosition(new Vector3(45, 28, 80));
        //CANVAS
         const canvas = scene.getEngine().getRenderingCanvas();
        //ATTACH CAMERAS
         
        camera.attachControl(canvas, true);
       
        scene.useRightHandedSystem = true
        //scene.clearColor = new Color3(0, 0, 0);
        //Light direction is directly down
        var light = new HemisphericLight("hemiLight", new Vector3(-1, 1, 0), scene);
	    light.diffuse = new Color3(0.05, 0.05, 0.05);
	
        var light2 = new DirectionalLight("DirectionalLight", new Vector3(0, -1, 0), scene);
        light2.diffuse = new Color3(1, 1, 1);
        light2.specular = new Color3(1, 0, 0);
        light2.intensity = 8;
        light2.position = new Vector3(0,1,0);

        //Light direction is directly top
        var light3 = new DirectionalLight("DirectionalLight", new Vector3(0, 1, 0), scene);
        light3.diffuse = new Color3(0, 0, 1);
        light3.specular = new Color3(1, 1, 1);
        light3.intensity = 8;
        light3.position = new Vector3(0,1,0);

       
        var model = await SceneLoader.ImportMeshAsync("", "/static/58e5fc3daaddb25ec457ac4c3bff6117/", "FreakNoizeStudio.gltf", scene);
       // console.log(model.meshes[1])

        var skybox = MeshBuilder.CreateBox("skyBox", {size:1000}, scene);
        var skyboxMaterial = new StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skybox.material = skyboxMaterial;
              

        var pipe = new DefaultRenderingPipeline(
            "defaultPipeline",
            true,
            scene,
            [camera]
        );
        pipe.bloomEnabled = true;
        pipe.bloomThreshold = 0.1;
        pipe.bloomWeight = 0.3;
        pipe.bloomKernel = 64;
        pipe.bloomScale = 0.5;


        //ANIMATIONCAMERA
        camera.rotationQuaternion = new Quaternion();
        var animationCamera = (x,y,z) => {
            let framerate = 20;

            let animateRotation = new Animation("animRotation","rotationQuaternion",framerate,Animation.ANIMATIONTYPE_QUATERNION,Animation.ANIMATIONLOOPMODE_CONSTANT);
            let keyframeRotation = [];
            keyframeRotation.push({frame:0,value:camera.rotationQuaternion.clone()});
            keyframeRotation.push({frame:20,value:Quaternion.FromEulerAngles(x, y, z)});
            animateRotation.setKeys(keyframeRotation);
    
            camera.animations = [animateRotation];
            scene.beginAnimation(camera,0,20,false,2);
            
        }

    }

    const onRender = scene => {
       // camera.rotationQuaternion = new Quaternion();
        if (camera !== undefined) {
            var deltaTimeInMillis = scene.getEngine().getDeltaTime();
        
            const rpm = 0.5;
            //camera.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
            var m = ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000))
            camera.alpha += m
          }

    }

    return (
                <div>
                    <h1 className="continue title">
                        <FontAwesomeIcon beat={true} size={"xs"} icon={faComputerMouse} />
                    </h1>
                    <SceneComponent onRender={onRender} onSceneReady={onSceneReady} className={"sample-canvas"} />
                </div>
    );
}

export default FkrScene;
