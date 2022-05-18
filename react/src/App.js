import './App.css';
import React, {useState, useEffect} from "react";

import Unity, { UnityContext } from "react-unity-webgl";
import recordAction from './recorder-action';
import colorPicker from './color-picker';
import Webcam from "react-webcam";
import axios from 'axios';


const buildURL = "client/Build";

const unityContext = new UnityContext({
  loaderUrl: buildURL + "/client.loader.js",
  dataUrl: buildURL + "/client.data.unityweb",
  frameworkUrl: buildURL + "/client.framework.js.unityweb",
  codeUrl: buildURL + "/client.wasm.unityweb",
});


function App() {
  const webcamRef = React.useRef(null);
  const [shapeSize, setShapeSize] = useState(0)
  const [colorValue, setColorValue] = useState('#0018EE')
  const [imageSource, setImageSource] = useState();
  const [imageBlob, setImageBlob] = useState();
  const maxShapeSize = 100
  const { colorChange } = colorPicker()
  const { startRecord, stopRecord } = recordAction()

  const handleShapeSlider = (event) => {
    setShapeSize(event.target.value);
    const scale = Number(event.target.value);
    unityContext.send('Scaler', 'UpdateObjectScale', scale);
  }

  const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
  };

  useEffect(() => {
    fetch(imageSource)
    .then(res => res.blob())
    .then(data => setImageBlob(data))
  }, [imageSource]);

  const postData = (data) => {
      const url = "http://localhost:8000/upload-photo"
      const formData = new FormData();
      formData.append("myphoto.png", data);
        
      axios.post(url, formData, {
        headers: {'content-type': 'multipart/form-data'}
      })
      .then(res => {
        unityContext.send("Script", "DisplayImage");
        console.warn(res.data);
      })

  }

  useEffect(() => {
    postData(imageBlob);
    imageBlob && console.log("Sending Captured Image")
    unityContext.send("Script", "DisplayImage");
  }, [imageBlob]);

  const capture = React.useCallback(() => {
    const imageSource = webcamRef.current.getScreenshot();
    setImageSource(imageSource);
  }, [webcamRef, setImageSource]);

  const Webcamera = () => (
    <Webcam
      audio={false}
      height={180}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={320}
      videoConstraints={videoConstraints}
    />
  );

  return (
    <div className="flex justify-between" style={{ height: "100vh", width: "100vw" }}>
      <div className="w-full p-6 sm:w-60 bg-coolGray-900 text-coolGray-100">
        <nav className="space-y-8 text-sm">

          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-coolGray-400">Image</h2>
            <div className="flex flex-col space-y-1">
              <button
                type="button" 
                className="px-8 py-3 font-semibold rounded hover:bg-coolGray-200 bg-coolGray-100 text-coolGray-800"
                onClick={capture}
              >
                Image Capture
              </button>
              {/* <button onClick={createPost}>Create Post</button> */}
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
              <input type="color" id="colorpicker" name="colorpicker" value={colorValue} onChange={e => colorChange(e, unityContext, setColorValue)}/>
            </div>
          </div>


        </nav>
      </div>

      <div className="flex items-center justify-center bg-black w-full">
        <Unity className="UnityPlayer w-full h-full" unityContext={unityContext} />
      </div>

      <div style={{ height: "180px", width: "320px" }} className="bg-black absolute top-0 right-0 text-white">
        <Webcamera />
      </div>
    </div>
  );
}

export default App;
