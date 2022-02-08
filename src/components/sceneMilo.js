//3AHQE
//https://playground.babylonjs.com/#LL5BIQ#0
//https://playground.babylonjs.com/#6I67BL#2
//https://playground.babylonjs.com/#AHQEIB#17
//https://www.babylonjs-playground.com/#3D23K4#4
import React, { useRef } from 'react';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { FreeCameraDeviceOrientationInput } from '@babylonjs/core/Cameras/freeCamera';
import { Vector3, Color3 } from '@babylonjs/core/Maths/math';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import BabylonScene from 'babylonjs-hook';
//import "@babylonjs/core/Debug/debugLayer"; // Augments the scene with the debug methods
//import "@babylonjs/inspector";
import "@babylonjs/gui/3D/controls/button3D";
import "@babylonjs/loaders/glTF";
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera";
import {GUI3DManager,SpherePanel,HolographicButton} from "@babylonjs/gui/3D"
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import {Scalar, AssetsManager, AnimationPropertiesOverride} from  "@babylonjs/core"

let box;
let babylonLink;
var myPlay = false;
const onSceneReady = async scene => {

  //scene.debugLayer.show();
  const canvas = scene.getEngine().getRenderingCanvas();
 
  ///CAMERA////////////////////////////////
  const camera = new ArcRotateCamera("Camera", 3 * Math.PI / 2, -Math.PI / 2, 10, Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  //camera.target =(0,0,0);
  camera.alpha = 4.71;
  camera.beta = 1.65;
  camera.lowerRadiusLimit = 1;
  camera.upperRadiusLimit = 300;
  camera.wheelPrecision = 5;
  //camera.useFramingBehavior = true;
  
  var light = new HemisphericLight("hemi", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  camera.setTarget(Vector3.Zero());

 

//////Animation Groups////
const Atlas = {
    characters: new Map(),
    animations: new Map(),
    skeletons: new Map(),
}

const assetsManager = new AssetsManager(scene)
const path = "/static/73f1fab5274fe9c2c443b5fd187aa597/"
const fileName = "DanceMulti.glb"
assetsManager.addMeshTask('Very nice task', '', path, fileName)

let convertionMap = {}
let storeMap = {}

 var charsGroup = [];
 var dancerAnimationPairings = {}
 var dancerReadyToPlay = {};
 const animationGroups = []
const cloneCharacter = (name, offset, animationIndex) => {  
    //debugger;
    //console.log(Atlas.characters);
     const characterRootMesh = Atlas.characters.get(name).instantiateHierarchy(null, {doNotInstantiate: true}, (source, clone) => {
         convertionMap[source.uniqueId] = clone.uniqueId
         storeMap[clone.uniqueId] = clone;
        
     })
     characterRootMesh.name = "root-clone-" + offset;
     characterRootMesh.getChildren()[0].name = "mainChar-clone" + offset;
    
    const skeleton = Atlas.skeletons.get(name).clone('Clone-'+offset)
    if (skeleton.overrideMesh) {
       
        skeleton.overrideMesh = characterRootMesh; 
        
    }
     const descendants = characterRootMesh.getDescendants(false)
     for (let i = 0; i < descendants.length; i++) {
         console.log(descendants[i].subMeshes)
         if (descendants[i].subMeshes) {
             descendants[i].skeleton = skeleton;
             descendants[i].metadata = "dancer";
             descendants.name = "descendantClone_"+offset;
            }
        }
    for (let bone of skeleton.bones) {
        if (bone._linkedTransformNode) {
            bone._linkedTransformNode = storeMap[convertionMap[bone._linkedTransformNode.uniqueId]]
            
        }
    }
     const originalAnimationGroups = Atlas.animations.get(name)
     //console.log(Atlas.animations.size)
       originalAnimationGroups.forEach((ag, inx) => {
           const clone = ag.clone(ag.name+'-clone-'+ offset, (oldTarget) => {
               let newTarget = storeMap[convertionMap[oldTarget.uniqueId]]
               
               return newTarget || oldTarget
           })
           animationGroups.push(clone);
         })
     charsGroup.push(characterRootMesh.getChildren()[0]);
     //console.log(animationGroups);
     characterRootMesh.position.x += offset;
     characterRootMesh.rotation = new Vector3(0.0,6,0);
     //animationGroups[0].play(true)
     //animationGroups[animationIndex].play(true);
}
//FILL dancerAnimationPairings
 const playerAnim = (topParent) =>{
      for(var i = 0 ; i < charsGroup.length; i++){
          var current = charsGroup[i];
          var currentAnim = animationGroups[i].name;
          dancerAnimationPairings[current.name] = currentAnim ;
          dancerReadyToPlay[current.name] = 1;
      }

      if(dancerReadyToPlay[topParent.name] === 1){
         
          dancerReadyToPlay[topParent.name] = 0;
          var animToPlay = dancerAnimationPairings[topParent.name];
         
           for(var i = 0; i < animationGroups.length; i++){
               if(animationGroups[i].name === animToPlay){
                   animationGroups[i].play();
               }
           }
      }
     
 }

var indexanim = 1; 
const instanciator = (instance) =>{
    for (let i = 0 ; i < 3; i++){
        //console.log(indexanim)
        cloneCharacter(instance, i, indexanim);
        indexanim += 1;
        if(indexanim >= 5){
            indexanim = 1
            
        }
    }
    console.log(charsGroup);
} 

assetsManager.onFinish = (tasks) => {
    //debugger;
    const task = tasks[0];
    const meshName = fileName.split('.')[0]
    //console.log(meshName);
    if (task.loadedMeshes?.length > 0) {
        const mesh = task.loadedMeshes[0]
        mesh.setEnabled(true)
        Atlas.characters.set(meshName, mesh)
    }
    if (task.loadedSkeletons?.length > 0) {
        const skeleton = task.loadedSkeletons[0]
        Atlas.skeletons.set(meshName, skeleton)
    }
    if (task.loadedAnimationGroups?.length > 0) {
        Atlas.animations.set(meshName, task.loadedAnimationGroups)
    }

    instanciator(meshName)
   
};


assetsManager.load()



  var vrHelper = scene.createDefaultVRExperience({createDeviceOrientationCamera:false, useXR: false});
  //vrHelper.enableTeleportation({floorMeshes: [environment.ground]});

  vrHelper.onAfterEnteringVRObservable.add(()=>{
    if(scene.activeCamera === vrHelper.vrDeviceOrientationCamera){
        FreeCameraDeviceOrientationInput.WaitForOrientationChangeAsync(1000).then(()=>{
            // Successfully received sensor input
        }).catch(()=>{
            alert("Device orientation camera is being used but no sensor is found, prompt user to enable in safari settings");
        })
    }
})
   // Create the 3D UI manager
   var anchor = new TransformNode("TFN");
   var manager = new GUI3DManager(scene);
   var panel = new SpherePanel();
  
   panel.margin = 0.2;
   manager.addControl(panel);
   panel.linkToTransformNode(anchor);
   anchor.scaling = new Vector3(1.5,1,1.2);
   panel.position.z = -1.5;


   // Let's add some buttons!
   var addButton =() => {
       var button = new HolographicButton("orientation");
       panel.addControl(button);
       button.text = "Button #" + panel.children.length;  
   }

   panel.blockLayout = true;
   for (var index = 1; index < 4; index++) {
       addButton();
   }
   panel.blockLayout = false;

   //ON CLICK
   scene.onPointerDown = function(evt, pickResult){
     //  console.log(evt, pickResult);
       if(pickResult.pickedMesh && pickResult.pickedMesh.metadata == "dancer"){
           var topParent;
           if(pickResult.pickedMesh.parent){
               topParent = pickResult.pickedMesh.parent;
            }
            console.log(pickResult.pickedMesh);
            playerAnim(topParent);

          

            

       }
   }
//215 216 360 361 505 506 550 551
}


const onRender = scene => {
 
}

const Scene = () => {
    babylonLink = useRef(null);
    return (
        <>
            <BabylonScene antialias onSceneReady={onSceneReady} onRender={onRender} id='sample-canvas2'>

            </BabylonScene>
        </>
    )
}
export default Scene;