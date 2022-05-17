import './App.css';
import React, { useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import recordAction from './recorder-action';
import colorPicker from './color-picker';

const unityContext = new UnityContext({
  loaderUrl: "Build/client.loader.js",
  dataUrl: "Build/client.data.unityweb",
  frameworkUrl: "Build/client.framework.js.unityweb",
  codeUrl: "Build/client.wasm.unityweb",
}); 

function App() {
  const [shapeSize, setShapeSize] = useState(0)
  const maxShapeSize = 100
  const { colorChange } = colorPicker()
  const { startRecord, stopRecord } = recordAction()

  const handleShapeSlider = (event) => {
    setShapeSize(event.target.value);
    const scale = Number(event.target.value);
    unityContext.send('Scaler', 'UpdateObjectScale', scale);
  }

  return (
    <div className="flex justify-between" style={{ height: "100vh", width: "100vw" }}>
      <div className="w-full p-6 sm:w-60 bg-coolGray-900 text-coolGray-100">
        <nav className="space-y-8 text-sm">

          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-coolGray-400">Image</h2>
            <div className="flex flex-col space-y-1">
              <button type="button" className="px-8 py-3 font-semibold rounded hover:bg-coolGray-200 bg-coolGray-100 text-coolGray-800">Webcam Capture</button>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-coolGray-400">Video</h2>
            <div className="flex flex-col space-y-1">
              <button type="button" className="px-8 py-3 font-semibold rounded hover:bg-coolGray-200 bg-coolGray-100 text-coolGray-800">Live Capture</button>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-coolGray-400">Audio</h2>
            <div className="flex flex-col space-y-1">
              <button type="button" className="px-8 py-3 font-semibold rounded hover:bg-coolGray-200 bg-coolGray-100 text-coolGray-800" onClick={startRecord}>Start Record</button>
              <button type="button" className="px-8 py-3 font-semibold rounded hover:bg-coolGray-200 bg-coolGray-100 text-coolGray-800" onClick={stopRecord}>Stop Record</button>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-coolGray-400">Upload media</h2>
            <div className="flex flex-col space-y-1">
              <input type="file" id="media" name="media"
                accept="image/png, image/jpeg, video/mp4, video/mkv, video/*, audio/*" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-coolGray-400">Shape</h2>
            <div className="flex flex-col space-y-1">
              <label htmlFor="range" className="font-bold text-gray-600">Size: {shapeSize}</label>
              <input type="range" name="shape" step="1" min="0" max={maxShapeSize} defaultValue={shapeSize} className="w-full h-2 bg-blue-100 appearance-none" onChange={handleShapeSlider}/>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-coolGray-400">Color Picker</h2>
            <div className="flex flex-col space-y-1">
              <label htmlFor="colorpicker">Select:</label>
              <input type="color" id="colorpicker" name="colorpicker" value="#ff0000" onChange={e => colorChange(e, unityContext)}/>
            </div>
          </div>


        </nav>
      </div>

      <div className="flex items-center justify-center bg-black w-full">
        <Unity className="UnityPlayer w-full h-full" unityContext={unityContext} />
      </div>

      <div style={{ height: "180px", width: "320px" }} className="bg-black absolute top-0 right-0 text-white">
        <span className="h-full w-full flex justify-center items-center">Feed here...</span>
      </div>
    </div>
  );
}

export default App;
