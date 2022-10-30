import React,{useEffect} from 'react';
import {HemisphericLight} from '@babylonjs/core/Lights/hemisphericLight'
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import {Vector3, PointerEventTypes,Color3,CubicEase,VideoTexture,StandardMaterial,EasingFunction,Animation,InterpolateValueAction,UniversalCamera, Tools, ActionManager, ExecuteCodeAction,KeyboardEventTypes,AnimationGroup, SetValueAction} from '@babylonjs/core';
import {SceneLoader} from '@babylonjs/core/Loading/sceneLoader'
import SceneComponent from "babylonjs-hook"
import "@babylonjs/loaders";
import '@babylonjs/loaders/glTF';
import "./changetexturescene.scss"
const DemoScene3 = ({dat}) => {
    //console.log(dat)
    const onSceneReady = async scene =>{
        var camera = new UniversalCamera("camera1", new Vector3(0, 0, 0), scene);
        camera.rotation.y=4.5;
        //var camera = new ArcRotateCamera("camera", Tools.ToRadians(-120), Tools.ToRadians(1.5), 5, new Vector3(0, 0, 0), scene);
        //camera.inputs.addMouseWheel();
        //CANVAS
         const canvas = scene.getEngine().getRenderingCanvas();
        //ATTACH CAMERAS
         
        camera.attachControl(canvas, true);
        var light = new HemisphericLight("light", new Vector3(0,1,0), scene);
        light.intensity = 0.5;
        scene.useRightHandedSystem = true
        
        var fort = await SceneLoader.ImportMeshAsync("", "/static/7f71b038bf5226bcde4521fd20e92593/", "newPlace.gltf", scene);
        camera.parent = scene.getMeshByName('Sphere');
        var anim1 = scene.animationGroups[1]
        camera.radius = 0;
        camera.alpha = 0.2;
        camera.beta = 1.6;
        anim1.speedRatio = 0.1;
        anim1.pause();
        console.log(scene.getMeshByName('Sphere'));
        for(var mesh of fort.meshes){
            console.log(mesh.name)
        }

         //MATERIALS
        //IVDEO MATERIAL
         var vitMat = new VideoTexture("video", "/static/a1a772f8263c9d215ace9578f02a8026/Wth.mp4", scene,  false,
         false,
         VideoTexture.TRILINEAR_SAMPLINGMODE,
         {
             autoPlay:false,
             autoUpdateTexture:true,
             loop:true
         });
        // anim1.goToFrame(dat);
       // console.log(scene.getMaterialByName('img1').albedoTexture)
       // console.log(scene.textures)
       // console.log(scene.getMeshByName('Cube_primitive3').material)
        var mat = new StandardMaterial("mat", scene)
        mat.diffuseTexture = vitMat;
        scene.getMeshByName('Cube_primitive3').material = mat

        //MOUSE ACTIONS
        console.log(anim1.to)
        var numFramesToPlay = 0;
        scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
              case KeyboardEventTypes.KEYDOWN:
                console.log("KEY DOWN: ", kbInfo.event.key);
                anim1.play(true);

                switch(kbInfo.event.key){
                    case 'd':
                        console.log('d')
                        anim1.goToFrame(numFramesToPlay);
                        numFramesToPlay+=0.05;
                        break
                    case 'a':
                        console.log('a')
                        anim1.goToFrame(numFramesToPlay);
                        numFramesToPlay-=0.05;
                        break
                    case 'p':
                        vitMat.video.play();
                        break
                }
                

                break;
              case KeyboardEventTypes.KEYUP:
                //console.log("KEY UP: ", kbInfo.event.key);
                console.log(anim1.targetedAnimations[0].animation.runtimeAnimations);
                anim1.pause();
                break;
            }
         });
         scene.onPrePointerObservable.add(function(pointerInfo, eventState){

             // console.log(pointerInfo);
            var event = pointerInfo.event;
            var delta = 0;
            if (event.wheelDelta) {
                delta = event.wheelDelta;
            }
            else if (event.detail) {
                delta = -event.detail;
            }
            if (delta) {
                
            }
            console.log(dat);
            
         },PointerEventTypes.POINTERWHEEL, false)

         /*scene.actionManager = new ActionManager(scene);
         scene.actionManager.registerAction(
            new ExecuteCodeAction(
                {
                    trigger: ActionManager.OnEveryFrameTrigger
                },
                function(){
                    console.log(dat)
                    anim1.goToFrame(dat);
                }
            )
         )

         scene.registerBeforeRender(function () {  console.log("before")})*/



        
    }
    const onRender = scene => {

        
    }
    return (
        <SceneComponent antialias onSceneReady={onSceneReady}  className={"sample-canvas"} onRender={onRender} />
    );
}

export default DemoScene3;
