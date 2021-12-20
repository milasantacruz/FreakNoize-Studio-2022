import React from 'react';
import {Engine, Scene} from 'react-babylonjs';
import {Vector3, Color3} from '@babylonjs/core'
import "@babylonjs/loaders/glTF"
import { StandardMaterial } from 'react-babylonjs';
import ModelLoader from '../components/modelLoader'

// start copy from https://www.babylonjs.com/demos/dragndrop/dragdrop.js
const GROUND_SIZE = 2000;
const validateDrag = (targetPosition) => {
  return Math.max(Math.abs(targetPosition.x), Math.abs(targetPosition.z)) <= (GROUND_SIZE / 2) - 10; // should be -15 for torus
}


const onModelLoaded = (model) =>{
 if(model){
  let mesh = model.meshes[1];
  console.log('loaded mesh:', mesh);
 }else{
  console.log('Error Not loaded mesh:');
 }
}

let bb = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoomBox/glTF/";
let headUrl = "/static/05b1ec6cb122d1ef0a3b2bbf5acf9b5f/"

function Scene2() {  
  return (
      <div >
          <Engine  adaptToDeviceRatio={true} antialias={true} engineOptions={{preserveDrawingBuffer:true, stencil:true}}  canvasId="sample-canvas">
            <Scene clearColor={new Color3(0, 0, 0)} >

                  
                <pointLight name='omni' position={new Vector3(0, 50, 0)} />
                <arcRotateCamera name='camera' alpha={0} beta={0} radius={10} target={Vector3.Zero()} setPosition={[new Vector3(20, 200, 400)]}
                  lowerBetaLimit={0.1} upperBetaLimit={(Math.PI / 2) * 0.99} lowerRadiusLimit={150}
                />

              <ModelLoader
                  rootUrl={headUrl}
                  sceneFilename="head.gltf" 
                  scaleTo={50} 
                  center={new Vector3(-150,10,0)}
                  onModelLoaded={onModelLoaded}
                  progressBarColor={Color3.FromInts(255, 165, 0)}
                  
                >
              
                     <pointerDragBehavior dragPlaneNormal={new Vector3(0,1,0)} validateDrag={validateDrag} />
                
              </ModelLoader>

              
                <ground name='ground' width={GROUND_SIZE} height={GROUND_SIZE} subdivisions={1}>
                      <standardMaterial name='groundMat' specularColor={Color3.Black()} />
                </ground>

                <sphere name='red' diameter={50} segments={32} position={new Vector3(-100, 10, 0)}>
                   <standardMaterial name='redMat' diffuseColor={new Color3(0.4, 0.4, 0.4)} specularColor={new Color3(0.4, 0.4, 0.4)} emissiveColor={Color3.Red()} />
                   <pointerDragBehavior dragPlaneNormal={new Vector3(0,1,0)} validateDrag={validateDrag} />
                </sphere>

                <box name='green' size={20} position={new Vector3(0, 11, -100)}>
                  <standardMaterial name='greenMat' diffuseColor={new Color3(0.4, 0.4, 0.4)} specularColor={new Color3(0.4, 0.4, 0.4)} emissiveColor={Color3.Green()} />
                  <pointerDragBehavior dragPlaneNormal={new Vector3(0,1,0)} validateDrag={validateDrag} />
                </box>

                <box name='blue' size={20} position={new Vector3(100, 11, 0)}>
                  <standardMaterial name='greenMat' diffuseColor={new Color3(0.4, 0.4, 0.4)} specularColor={new Color3(0.4, 0.4, 0.4)} emissiveColor={Color3.Blue()} />
                  <pointerDragBehavior dragPlaneNormal={new Vector3(1,1,0)} validateDrag={validateDrag} />
                </box>

                <torus name='torus' diameter={30} thickness={10} tesselation={32} position={new Vector3(0, 10, 100)}>
                  <standardMaterial name='torusMat' diffuseColor={new Color3(0.4, 0.4, 0.4)} specularColor={new Color3(0.4, 0.4, 0.4)} emissiveColor={Color3.Purple()} />
                  <pointerDragBehavior dragPlaneNormal={new Vector3(0,1,0)} validateDrag={validateDrag} />
                </torus>
                </Scene>
          </Engine>
        </div>
  );
}

export default Scene2