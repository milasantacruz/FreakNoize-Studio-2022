import React , {Suspense, useState}from 'react';
import {Model, Box, StandardMaterial, Mesh, useScene } from 'react-babylonjs';
import { Vector3, Matrix, Color3 } from '@babylonjs/core';
import "@babylonjs/loaders";
import '@babylonjs/loaders/glTF';

const ProgressFallback = (props) => (
    <Mesh rotation={props.progressRotation} position={props.center}>
      <Box key="progress" name="boxProgress" height={props.scaleTo / 15} width={props.scaleTo} depth={props.scaleTo / 30} scaling={new Vector3(props.loadProgress, 1, 1)}
        position={new Vector3(props.scaleTo / 2, 0, props.scaleTo / 60)}
        setPivotMatrix={[Matrix.Translation(-props.scaleTo, 0, 0)]}
        setPreTransformMatrix={[Matrix.Translation(-props.scaleTo / 2, 0, 0)]}>
        <standardMaterial diffuseColor={props.progressBarColor} specularColor={Color3.Black()} />
      </Box>
      <Box key="back" name="boxBack" height={props.scaleTo / 15} width={props.scaleTo} depth={props.scaleTo / 30}
        position={new Vector3(0, 0, props.scaleTo / -60)}
      />
    </Mesh>
  )

const ModelLoader = props =>{

    const [loadProgress, setLoadProgress] = useState(0);

    return(
       <Suspense
       fallback={<ProgressFallback progressRotation={props.progressRotation} center={props.center} scaleTo={props.scaleTo} loadProgress={loadProgress} progressBarColor={props.progressBarColor} />}
       >
            <Model
            scaleToDimension={props.scaleTo}
            onLoadProgress={(evt) => {
                let modelLoadProgress = evt.lengthComputable ?
                  evt.loaded / evt.total :
                  evt.loaded / (props.estimatedFileSize * 0.085) /* provided fileSize is not for 'view' manifest, a bad guess often, but generally factor ~0.085 smaller  */
                setLoadProgress(modelLoadProgress);
              }}
              onModelLoaded={(model) => {
                let mesh = model.meshes[1];
                setLoadProgress(1);
                if (props.onModelLoaded) {
                  props.onModelLoaded(model);
                }
              }}
            position={props.position}
            rootUrl={props.rootUrl}
            sceneFilename={props.sceneFilename}
            material={props.material}
            
            />
       </Suspense>
    )
}

export default ModelLoader