import './App.css';
import React from "react";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "Build/client.loader.js",
  dataUrl: "Build/client.data.unityweb",
  frameworkUrl: "Build/client.framework.js.unityweb",
  codeUrl: "Build/client.wasm.unityweb",
});


function App() {
  return (
    <div className="flex justify-between" style={{ height: "100vh", width: "100vw" }}>
      <div className="w-full p-6 sm:w-60 dark:bg-coolGray-900 dark:text-coolGray-100">
        <nav className="space-y-8 text-sm">

          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-coolGray-400">Image</h2>
            <div className="flex flex-col space-y-1">
              <button type="button" className="px-8 py-3 font-semibold rounded hover:bg-coolGray-200 dark:bg-coolGray-100 dark:text-coolGray-800">Webcam Capture</button>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-coolGray-400">Video</h2>
            <div className="flex flex-col space-y-1">
              <button type="button" className="px-8 py-3 font-semibold rounded hover:bg-coolGray-200 dark:bg-coolGray-100 dark:text-coolGray-800">Live Capture</button>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-coolGray-400">Audio</h2>
            <div className="flex flex-col space-y-1">
              <button type="button" className="px-8 py-3 font-semibold rounded hover:bg-coolGray-200 dark:bg-coolGray-100 dark:text-coolGray-800">Record</button>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-coolGray-400">Upload media</h2>
            <div className="flex flex-col space-y-1">
              <input type="file" id="media" name="media"
                accept="image/png, image/jpeg, video/mp4, video/mkv, video/*, audio/*" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-coolGray-400">Color Picker</h2>
            <div className="flex flex-col space-y-1">
              <label for="favcolor">Select:</label>
              <input type="color" id="favcolor" name="favcolor" value="#ff0000" />
            </div>
          </div>
        </nav>
      </div>

      <div className="flex items-center justify-center bg-black w-full">
        <Unity className="UnityPlayer w-full h-full" unityContext={unityContext} />
      </div>

      <div style={{height: "180px", width:"320px"}} className="bg-black absolute top-0 right-0 text-white">
        <span className="h-full w-full flex justify-center items-center">Feed here...</span>
      </div>
    </div>
  );
}

export default App;
