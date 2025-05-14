
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
            <span>Business intelligence</span>
            <br />
            <span>built around</span>
            <br />
            <span>data teams</span>
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
