// src/components/ModelViewer.js
import React, { useState, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader, useGLTF } from "@react-three/drei";

const ModelViewer = ({ modelUrl, onModelLoaded }) => {
  const { scene, nodes, materials } = useGLTF(modelUrl);
  const [color, setColor] = useState("white");

  useEffect(() => {
    if (scene) {
      onModelLoaded(scene);
    }
  }, [scene, onModelLoaded]);

  const handleClick = (e) => {
    // You can customize this logic to change parts based on the object clicked
    setColor(color === "white" ? "red" : "white");
  };

  return (
    <Suspense fallback={<Loader />}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="model-viewer"
      >
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[10, 10, 10]} />
        <primitive object={scene} onClick={handleClick} />
        <OrbitControls />
      </Canvas>
    </Suspense>
  );
};

useGLTF.preload("/shoe.glb"); // Preload the file for testing

export default ModelViewer;
