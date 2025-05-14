import React, { useState } from "react";
import DropzoneLoader from "./components/DropzoneLoader";
import ModelViewer from "./components/ModelViewer";
import ControlsPanel from "./components/ControlsPanel";

export default function App() {
  const [arrayBuffer, setArrayBuffer] = useState(null);
  const [options, setOptions] = useState({
    autoRotate: true,
    wireframe: false,
    background: "#191919",
    ambientLight: "#ffffff",
    directionalLight: "#ffffff",
  });

  const handleModelLoaded = (buffer) => {
    setArrayBuffer(buffer);
  };

  return (
    <div style={{ height: "100vh", background: options.background }}>
      <nav>
        <h1 className="title" contenteditable="true">
          <span>
            <span className="text-[22px] font-bold text-[#c8f169]">
              3D Model
            </span>
            <br />
            <span className="text-amber-300">Viewer </span>
            <br />
            <span className="text-[12px]">React Three Fiber</span>
          </span>
        </h1>
      </nav>
      <DropzoneLoader
        onModelLoaded={handleModelLoaded}
        isVisible={!arrayBuffer}
      />
      {arrayBuffer && (
        <>
          <ControlsPanel options={options} setOptions={setOptions} />
          <ModelViewer arrayBuffer={arrayBuffer} options={options} />
        </>
      )}
    </div>
  );
}
