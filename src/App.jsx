// src/App.js
import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import ModelViewer from "./components/ModelViewer";

const App = () => {
  const [modelUrl, setModelUrl] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    setModelUrl(url);
    setModelLoaded(false);
  };

  const handleModelLoaded = () => {
    setModelLoaded(true);
  };

  return (
    <>
      <header>
        <h1>3D Shoe Model Viewer</h1>
      </header>
      <main>
        
        <section style={{ padding: "20px" }} className="wrapper">
          {modelUrl && (
            <>
              {!modelLoaded && <div>Loading Model...</div>}
              <ModelViewer
                modelUrl={modelUrl}
                onModelLoaded={handleModelLoaded}
              />
            </>
          )}
          <FileUploader onDrop={handleFileDrop} />
        </section>
      </main>
    </>
  );
};

export default App;
