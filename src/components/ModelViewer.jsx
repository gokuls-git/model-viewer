import React, { useEffect, useState, useRef, useCallback } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { SketchPicker } from "react-color";
import Loader from "./Loader";

const SelectableModel = ({
  gltf,
  onSelect,
  selectedPart,
  onColorChange,
  wireframe,
}) => {
  const { camera, gl } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const handlePointerDown = useCallback(
    (event) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObject(gltf.scene, true);

      if (intersects.length > 0) {
        const selectedObject = intersects[0].object;
        onSelect({
          object: selectedObject,
          screenX: event.clientX,
          screenY: event.clientY,
        });

        // Change color and apply wireframe if selected
        if (selectedPart && selectedObject === selectedPart) {
          onColorChange(selectedObject, 0x00ff00); // Default color (green)
          selectedObject.material.wireframe = wireframe; // Apply wireframe
        }
      }
    },
    [
      camera,
      gl.domElement,
      gltf,
      onSelect,
      selectedPart,
      onColorChange,
      wireframe,
    ]
  );

  useEffect(() => {
    gl.domElement.addEventListener("pointerdown", handlePointerDown);
    return () => {
      gl.domElement.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [handlePointerDown, gl.domElement]);

  return <primitive object={gltf.scene} />;
};

const ModelViewer = ({ arrayBuffer, options }) => {
  const [gltf, setGltf] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selectedPart, setSelectedPart] = useState(null); // Track selected part
  const [color, setColor] = useState("#00ff00"); // Default color in hex format
  const [wireframe, setWireframe] = useState(false); // State to toggle wireframe

  useEffect(() => {
    if (!arrayBuffer) return;

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);

    // Simulate loading time of 1.2 seconds
    const loadingTimer = setTimeout(() => {
      loader.parse(
        arrayBuffer,
        "",
        (result) => {
          setGltf(result);
          setLoadingProgress(100);
        },
        (error) => console.error("Model load error:", error)
      );
    }, 1200); // 1.2 seconds delay before starting to load the model

    // Optional: set initial progress during the waiting period
    const progressTimer = setTimeout(() => {
      setLoadingProgress(50); // Show 50% progress after 1 second
    }, 1000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(progressTimer);
      dracoLoader.dispose();
    };
  }, [arrayBuffer]);

  const handleSelect = (info) => {
    setSelectedInfo(info);
    setSelectedPart(info.object); // Set selected part
  };

  const handleColorChange = (newColor) => {
    if (selectedPart) {
      // Ensure the material is independent for the selected part
      if (!selectedPart.material.isMaterial)
        selectedPart.material = new THREE.MeshStandardMaterial();
      selectedPart.material = selectedPart.material.clone(); // Clone the material to avoid modifying the original shared material

      selectedPart.material.color.set(newColor.hex); // Change the color of the selected part
      selectedPart.material.needsUpdate = true; // Mark material as needing update
    }
    setColor(newColor.hex); // Update the color state to reflect the color picker value
  };

  const toggleWireframe = () => {
    setWireframe(!wireframe); // Toggle wireframe state
    if (selectedPart) {
      selectedPart.material.wireframe = !selectedPart.material.wireframe; // Toggle wireframe on the selected part
      selectedPart.material.needsUpdate = true; // Update material
    }
  };

  const closePopup = () => setSelectedInfo(null);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {loadingProgress < 100 && <Loader progress={loadingProgress} />}

      {selectedInfo && (
        <div
          style={{
            position: "absolute",
            top: selectedInfo.screenY,
            left: selectedInfo.screenX,
            backgroundColor: "#ffffffee",
            color: "#000",
            padding: "12px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
            maxWidth: "250px",
            transform: "translate(-50%, -120%)",
          }}
        >
          <strong>{selectedInfo.object.name || "Part"}</strong>
          <p style={{ margin: "8px 0" }}>
            This is a sample description of the selected part.
          </p>
          <button
            onClick={closePopup}
            style={{
              backgroundColor: "#333",
              color: "#fff",
              padding: "4px 10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Close
          </button>

          {/* Color Picker */}
          <div style={{ marginTop: "10px" }}>
            <SketchPicker color={color} onChangeComplete={handleColorChange} />
          </div>

          {/* Wireframe Toggle Button */}
          <button
            onClick={toggleWireframe}
            style={{
              backgroundColor: "#333",
              color: "#fff",
              padding: "4px 10px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              marginTop: "10px",
            }}
          >
            Toggle Wireframe
          </button>
        </div>
      )}

      {gltf && (
        <Canvas>
          <ambientLight color={options.ambientLight} intensity={0.6} />
          <directionalLight
            color={options.directionalLight}
            position={[10, 10, 5]}
          />
          <OrbitControls autoRotate={options.autoRotate} />
          <SelectableModel
            gltf={gltf}
            onSelect={handleSelect}
            selectedPart={selectedPart}
            onColorChange={handleColorChange}
            wireframe={wireframe} // Pass wireframe state
          />
        </Canvas>
      )}
    </div>
  );
};

export default ModelViewer;
