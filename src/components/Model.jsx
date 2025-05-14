import React, { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { SkeletonHelper } from "three";

export default function Model({ arrayBuffer, wireframe }) {
  const [gltf, setGltf] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(draco);

    loader.parse(arrayBuffer, "", (result) => {
      if (wireframe) {
        result.scene.traverse((child) => {
          if (child.isMesh) {
            child.material.wireframe = true;
          }
        });
      }
      setGltf(result);
    });

    return () => draco.dispose();
  }, [arrayBuffer, wireframe]);

  if (!gltf) return null;
  return <primitive object={gltf.scene} />;
}
