///https://github.com/brianzinn/react-babylonjs/tree/master/packages/storybook/stories
import React from 'react';
import BabylonScene from "babylonjs-hook"
import {SceneLoader, 
     HemisphericLight,
     ArcRotateCamera, 
     Vector3,
     Color3,
     AssetsManager,
     ActionManager,
     ExecuteCodeAction,
     InterpolateValueAction,
     PhotoDome,
     Texture,
     Scalar,
     MeshBuilder,
     StandardMaterial,
     Animation
} from '@babylonjs/core';
import {AdvancedDynamicTexture, StackPanel, Button, Control } from "@babylonjs/gui"
//import "@babylonjs/core/Debug/debugLayer"; // Augments the scene with the debug methods
//import "@babylonjs/inspector";
import "@babylonjs/gui/3D/controls/button3D";
import "@babylonjs/loaders/glTF";


const Uianimation = () => {
    const onSceneReady = async scene =>{
        //scene.debugLayer.show();
        const canvas = scene.getEngine().getRenderingCanvas();
        ///CAMERA////////////////////////////////
        const camera = new ArcRotateCamera("Camera", 3 * Math.PI / 2, -Math.PI / 2, 10, Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        //camera.target =(0,0,0);
        camera.alpha = 4.71;
        camera.beta = 1.65;
        camera.lowerRadiusLimit = 2;
        camera.upperRadiusLimit = 10;
        camera.wheelPrecision = 0.01;
        //camera.useFramingBehavior = true;
        
        var light = new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);
        light.intensity = 0.7;
    
        camera.setTarget(Vector3.Zero());

        //BOX
        var meshBox = MeshBuilder.CreateBox("meshBox", {height: 2, width: 6}, scene)
        meshBox.position.x = 5;
         //CREATE MATERIAL TO BOX
        var SM = new StandardMaterial("basicMaterial", scene);
        
        SM.diffuseColor = new Color3(1, 0, 1);
        SM.specularColor = new Color3(0.5, 0.6, 0.87);
        //SM.emissiveColor = new Color3(0.3, 0.50, 0.1);
        //SM.ambientColor = new Color3(0.23, 0.98, 0.53);
       //meshBox.material = SM;

        var SM2 = new StandardMaterial("basicMaterial2") 
        SM2.diffuseColor = new Color3(0.5, 1, 0.2);
        SM2.specularColor = new Color3(0.8, 0.2, 0.2);
        //SM.emissiveColor = new Color3(0.3, 0.50, 0.1);
        //SM.ambientColor = new Color3(0.23, 0.98, 0.53);
        meshBox.material = SM2;

        ///SIMPLE ANIMATION FOR

        var stFrame = 0;
        var endFrame = 10;
        const frameRate = 10;
        const slideX = new Animation("xSlide", "position.x", frameRate, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
        const keyFrames = [];
        keyFrames.push({
          frame: stFrame,
          value: 2
        });

        keyFrames.push({
          frame:endFrame,
          value:-2
        });

        slideX.setKeys(keyFrames);
        meshBox.animations.push(slideX);


        var meshex = [];
        var currentDomeImage = 2;      
        const assetsManager = new AssetsManager(scene);
        const path = "/static/73f1fab5274fe9c2c443b5fd187aa597/"
        const fileName = "DanceMulti.glb"
        assetsManager.addMeshTask('MyTask', '', path, fileName);

        
         // DOME IMAGES
         var domePaths = ["/static/46153f68849f1581bac897919ce1a7f1/bukhara.jpg", "/static/8c740f35c5f6a28d45865ef33d12e284/balls.jpg", "/static/28c41273f8a761e43bb763c5c01eafb9/Nebula02_8k.jpg"];
         var dome = new PhotoDome("dome", domePaths[0], {resolution: 32, size:500});
         dome.imageDome = PhotoDome.MODE_MONOSCOPIC;
    
        function createUI(){

            // Initialize override animations, turn on dance1 by default
            var dance1 = scene.animationGroups.find(a => a.name === 'Animation_01');
            var dance1Param = { name: "dance1", anim: dance1, weight: 0 };
            dance1.play(true);
            dance1.setWeightForAllAnimatables(0);

             var dance2 = scene.animationGroups.find(a => a.name === 'Animation_04');
            var dance2Param = { name: "dance2", anim: dance2, weight: 0 };
            dance2.play(true);
            dance2.setWeightForAllAnimatables(0);

            var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
                "myUI"
            );
            var UIPanel = new StackPanel()
            UIPanel.width = "100%";
		    UIPanel.fontSize = "14px";
            UIPanel.isVertical = false;
            UIPanel.height = "20%";
            UIPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
		    UIPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
		
            advancedTexture.addControl(UIPanel)
            
            // Keep track of the current override animation
            var currentParam = undefined;
            function onBeforeAnimation() {
                // Increment the weight of the current override animation
                if (currentParam) {
                    currentParam.weight = Scalar.Clamp(currentParam.weight + 0.01, 0, 1);
                    currentParam.anim.setWeightForAllAnimatables(currentParam.weight);
                }
                // Decrement the weight of all override animations that aren't current
                if (currentParam !== dance1Param) {
                    dance1Param.weight = Scalar.Clamp(dance1Param.weight - 0.01, 0, 1);
                    dance1Param.anim.setWeightForAllAnimatables(dance1Param.weight);
                }
                if (currentParam !== dance2Param) {
                    dance2Param.weight = Scalar.Clamp(dance2Param.weight - 0.01, 0, 1);
                    dance2Param.anim.setWeightForAllAnimatables(dance2Param.weight);
                }
                // Remove the callback the current animation weight reaches 1 or
                // when all override animations reach 0 when current is undefined
                if ((currentParam && currentParam.weight === 1)
                    || (dance1Param.weight === 0 && dance2Param.weight === 0 )) {
                    scene.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);
                }
            };

            
            var buttonNone = new Button.CreateSimpleButton("btn0", "none");
            buttonNone.paddingTop = "10px";
            buttonNone.width = "100px";
            buttonNone.height = "50px";
            buttonNone.color = "white";
            buttonNone.background = "black";
            buttonNone.onPointerDownObservable.add(function(){
            console.log(currentParam)    
                // Remove current animation
			currentParam = undefined;

			// Restart animation observer
			scene.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);
			scene.onBeforeAnimationsObservable.add(onBeforeAnimation);
            });
            UIPanel.addControl(buttonNone)
             
            var buttonD1 = new Button.CreateSimpleButton("btn1", "D1");
            buttonD1.paddingTop = "10px";
            buttonD1.width = "100px";
            buttonD1.height = "50px";
            buttonD1.color = "white";
            buttonD1.background = "black";
            buttonD1.onPointerDownObservable.add(function(){
             console.log(currentParam)   
            // Do nothing if dance1 is already the current animation
			if (currentParam === dance1Param) {
				return;
			}

			// Restart animation observer with dance1 set to current
			scene.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);	
			currentParam = dance1Param;
			scene.onBeforeAnimationsObservable.add(onBeforeAnimation);
            });
            UIPanel.addControl(buttonD1)

            var buttonD2 = new Button.CreateSimpleButton("btn2", "D2");
            buttonD2.paddingTop = "10px";
            buttonD2.width = "100px";
            buttonD2.height = "50px";
            buttonD2.color = "white";
            buttonD2.background = "black";
            buttonD2.onPointerDownObservable.add(function(){
             console.log(currentParam)   
            // Do nothing if dance1 is already the current animation
			if (currentParam === dance2Param) {
				return;
			}

			// Restart animation observer with dance1 set to current
			scene.onBeforeAnimationsObservable.removeCallback(onBeforeAnimation);	
			currentParam = dance2Param;
			scene.onBeforeAnimationsObservable.add(onBeforeAnimation);
            });
            UIPanel.addControl(buttonD2)

            var buttonNext = new Button.CreateSimpleButton("btn3", "Next");
            buttonNext.paddingTop = "10px";
            buttonNext.width = "100px";
            buttonNext.height = "50px";
            buttonNext.color = "white";
            buttonNext.background = "black";
            buttonNext.onPointerDownObservable.add(function(){
                currentDomeImage += 1;
                if(currentDomeImage > domePaths.length-1){
                    currentDomeImage = 0;
                }
                var cu = domePaths[currentDomeImage];
                dome.photoTexture = new Texture(cu, scene, false, true)
                meshBox.material = SM;
                meshBox.position.x = 0
                scene.beginAnimation(meshBox, stFrame, endFrame, false)
                console.log(domePaths.length, currentDomeImage)
           
            });
            UIPanel.addControl(buttonNext);

            var buttonPrev = new Button.CreateSimpleButton("btn3", "Prev");
            buttonPrev.paddingTop = "10px";
            buttonPrev.width = "100px";
            buttonPrev.height = "50px";
            buttonPrev.color = "white";
            buttonPrev.background = "black";
            buttonPrev.onPointerDownObservable.add(function(){
                currentDomeImage -= 1;
                if(currentDomeImage < 0){
                    currentDomeImage = domePaths.length-1
                }
                var cu = domePaths[currentDomeImage]
               
                dome.photoTexture = new Texture(cu, scene, false, true)
                meshBox.material = SM2;
                meshBox.position.x = 10;
                scene.beginAnimation(meshBox, stFrame, endFrame, true)
            });
            UIPanel.addControl(buttonPrev)

            
        }

        assetsManager.onFinish = (tasks) =>{
            const task = tasks[0];
            //console.log(meshName);
            if (task.loadedMeshes?.length > 0) {
                const mesh = task.loadedMeshes[0]
                mesh.setEnabled(true);
                mesh.rotation = new Vector3(0,6,0)
            }
        createUI()
        
        }
        assetsManager.load();
       
         
    }

    const onRender = () =>{

    }
    
    return (
        <BabylonScene antialias onSceneReady={onSceneReady} onRender={onRender} id='sample-canvas'/>
    );
}

export default Uianimation;
