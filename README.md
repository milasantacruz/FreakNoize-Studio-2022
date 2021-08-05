## LOAD MODEL DECLARATIVE 
https://github.com/brianzinn/create-react-app-babylonjs/blob/master/src/ScaledModelWithProgress.js

import '@babylonjs/loaders';

<Model
        scaleToDimension
        onLoadProgress
        onModelLoaded
        position={props.center}
        rootUrl={props.rootUrl}
        sceneFilename={props.sceneFilename}
        pluginExtension={props.fileExtension}
        rotation={props.modelRotation}
      />

