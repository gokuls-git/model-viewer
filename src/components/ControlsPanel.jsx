import React from "react";

export default function ControlsPanel({ options, setOptions }) {
  const handleChange = (key, value) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div
      style={{ padding: "1rem", color: "white", background: "transparent" }}
      className="max-w-[300px] flex flex-col absolute top-[10.5%] right-0 text-[13px] z-[999999]"
    >
      <div className=" flex items-center bg-[#5f5f5f] p-[7px] rounded-[5px] [transition:0.2s_all_ease-in-out] my-0.5 hover:bg-[#6161619e]">
        <label>
          Auto Rotate:
          <input
            className=""
            type="checkbox"
            checked={options.autoRotate}
            onChange={(e) => handleChange("autoRotate", e.target.checked)}
          />
        </label>{" "}
      </div>
      <div className=" flex items-center bg-[#5f5f5f] p-[7px] rounded-[5px] [transition:0.2s_all_ease-in-out] my-0.5 hover:bg-[#6161619e]">
        <label>
          Wireframe:
          <input
            className=""
            type="checkbox"
            checked={options.wireframe}
            onChange={(e) => handleChange("wireframe", e.target.checked)}
          />
        </label>{" "}
      </div>
      <div className=" flex items-center bg-[#5f5f5f] p-[7px] rounded-[5px] [transition:0.2s_all_ease-in-out] my-0.5 hover:bg-[#6161619e]">
        <label>
          Background:
          <input
            className=""
            type="color"
            value={options.background || "#191919"}
            onChange={(e) => handleChange("background", e.target.value)}
          />
        </label>{" "}
      </div>

      <div className=" flex items-center bg-[#5f5f5f] p-[7px] rounded-[5px] [transition:0.2s_all_ease-in-out] my-0.5 hover:bg-[#6161619e]">
        <label>
          Ambient Light:
          <input
            className=""
            type="color"
            value={options.ambientLight}
            onChange={(e) => handleChange("ambientLight", e.target.value)}
          />
        </label>{" "}
      </div>

      <div className=" flex items-center bg-[#5f5f5f] p-[7px] rounded-[5px] [transition:0.2s_all_ease-in-out] my-0.5 hover:bg-[#6161619e]">
        <label>
          Directional Light:
          <input
            className=""
            type="color"
            value={options.directionalLight}
            onChange={(e) => handleChange("directionalLight", e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}
