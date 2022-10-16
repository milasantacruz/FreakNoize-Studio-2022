import React from 'react';
import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import {Vector3, Color3,CubicEase,EasingFunction,Animation,InterpolateValueAction,UniversalCamera, Tools, ActionManager, ExecuteCodeAction,KeyboardEventTypes,AnimationGroup, SetValueAction} from '@babylonjs/core';
import {SceneLoader} from '@babylonjs/core/Loading/sceneLoader'
import SceneComponent from "babylonjs-hook"
import "@babylonjs/loaders";
import '@babylonjs/loaders/glTF';
import "./changetexturescene.scss"
//https://forum.babylonjs.com/t/animate-camera-following-a-path-with-curves/32130
//https://forum.babylonjs.com/t/how-to-create-animated-paths-to-a-specific-areas-resolved/2938
//https://doc.babylonjs.com/features/featuresDeepDive/scene/interactWithScenes
const DemoScene = () => {

    const onSceneReady = async scene =>{
       //CAMERA
       //var camera = new ArcRotateCamera("camera", Tools.ToRadians(-35), Tools.ToRadians(90), 10, new Vector3(0, 0, 0), scene);
       var camera = new UniversalCamera("camera1", new Vector3(0, 5, -10), scene);
       camera.lowerRadiusLimit = 10;
       camera.upperRadiusLimit = 100;

       //CANVAS
        const canvas = scene.getEngine().getRenderingCanvas();
       //ATTACH CAMERAS
        
        camera.attachControl(canvas, true);
        // Enable mouse wheel inputs.
         //camera.inputs.addMouseWheel();
        //light
        var light = new HemisphericLight("light", new Vector3(0,1,0), scene);
        light.intensity = 0.5;
        scene.useRightHandedSystem = true
        var fort = await SceneLoader.ImportMeshAsync("", "/static/5ff356687954167a195c3c7dfa7b76b8/", "follow03.gltf", scene);
        console.log(fort.meshes)
        fort.meshes.map((e,i)=>{
            var currentMesh = fort.meshes[i];
            if(i > 1){
                var posRel = new Vector3(currentMesh.position.x,currentMesh.position.y+5,currentMesh.position.z)
                currentMesh.actionManager = new ActionManager(scene);
                currentMesh.actionManager.registerAction(
                         new InterpolateValueAction(
                             ActionManager.OnPickTrigger,
                              camera,
                             'position',
                             posRel,
                             1000
                         )
                     )
                currentMesh.actionManager.registerAction(
                    new ExecuteCodeAction(
                        ActionManager.OnPickTrigger,
                        function(){
                            camera.setTarget(new Vector3(currentMesh.position.x,currentMesh.position.y,-currentMesh.position.z))
                        }
                        

                    )
                )
            }else{
                console.log("B")
            }

            
        })
        
        //var anim1 = scene.animationGroups[0];
        //let animationGroupTarget = anim1.targetedAnimations;
        //let newAnimationGroup = new AnimationGroup("cameraAnimationGroup");
        //newAnimationGroup.addTargetedAnimation(animationGroupTarget[0].animation, camera);
        //newAnimationGroup.addTargetedAnimation(animationGroupTarget[1].animation, camera);
        //newAnimationGroup.addTargetedAnimation(animationGroupTarget[2].animation, camera);
        //console.log(scene.animationGroups)
        //anim1.pause();
        //console.log(camera.rotationQuaternion);

        ////////
        //fort.meshes[0].name = "pirateFort"
        //scene.getMeshByName("sea").material.needDepthPrePass = true;
        //scene.getLightByName("Sun").intensity = 12;


        // Keyboard events
        /*var inputMap ={};
        scene.actionManager = new ActionManager(scene);
        scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
            console.dir(inputMap)
        }));
        scene.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
            console.dir(inputMap)
        }));*/

        //with observables

        /*scene.onKeyboardObservable.add((kbInfo) => {
             switch (kbInfo.type) {
               case KeyboardEventTypes.KEYDOWN:
                 console.log("KEY DOWN: ", kbInfo.event.key);
                 scene.animationGroups[0].play();
                 scene.animationGroups[1].play();
                 camera.position.y = -camera.position.y;
                 camera.rotationQuaternion._y = -camera.rotationQuaternion._y;
                 console.log(camera.rotationQuaternion._y)
                //  let frame = 0;
                //  setInterval(() =>{
                //     scene.animationGroups[1].goToFrame(frame);
                //     camera.position.x = -camera.position.x;
                //     camera.rotationQuaternion._y = -camera.rotationQuaternion._y;
                //     console.log(camera.rotationQuaternion._y)
                //     frame++;
                //     if(frame == 250) {
                //         frame = 0;
                //     }
                //  },400)

                 break;
               case KeyboardEventTypes.KEYUP:
                 console.log("KEY UP: ", kbInfo.event.key);
                 break;
             }
          });*/

    }

    const onRender = scene => {


    }

    return (
        <SceneComponent antialias onSceneReady={onSceneReady}  className={"sample-canvas"} onRender={onRender} />
    );
}

export default DemoScene;
