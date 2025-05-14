// src/components/FileUpload.js
import React from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".glb",
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #ccc",
        padding: "20px",
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      <input {...getInputProps()} />
      <p>Drag & drop your .glb file here, or click to select a file</p>
    </div>
  );
};

export default FileUpload;
