import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function DropzoneLoader({ onModelLoaded, isVisible }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => onModelLoaded(reader.result);
      reader.readAsArrayBuffer(file);
    },
    [onModelLoaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "model/gltf-binary": [".glb"],
      "model/gltf+json": [".gltf"],
    },
  });

  if (!isVisible) return null;

  return (
    <div
      {...getRootProps()}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#121212",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        flexDirection: "column",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop your GLB/GLTF model here...</p>
      ) : (
        <p>Click or drag-and-drop a model file here to view it in 3D</p>
      )}
    </div>
  );
}
