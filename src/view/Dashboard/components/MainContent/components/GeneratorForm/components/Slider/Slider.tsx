import { useGeneratorSetting } from "@/store/useGeneratorData";
import React from "react";

const Slider = () => {
  const { setStyleIntensity, styleIntensity, setFormality, formality } =
    useGeneratorSetting();
  return (
    <div className="w-full mt-5">
      <div>
        <h2 className="form-label">Style Intensity</h2>
        <input
          type="range"
          min={0}
          max="100"
          value={styleIntensity}
          onChange={(e) => setStyleIntensity(e.target.value)}
          className="range h-[25px] text-[#464545] [--range-bg:#333333] [--range-thumb:#e2c9a6] [--range-fill:0] w-full cursor-grabbing"
        />
        <div className="flex justify-between px-2.5 mt-2 text-xs">
          <h2 className="form-slider-option mt-[-5px]">Casual</h2>
          <h2 className="form-slider-option mt-[-5px]">High Fashion</h2>
        </div>
      </div>
      <div>
        <h2 className="form-label">Formality</h2>
        <input
          type="range"
          min={0}
          max="100"
          value={formality}
          onChange={(e) => setFormality(e.target.value)}
          className="range h-[25px] text-[#464545] [--range-bg:#333333] [--range-thumb:#e2c9a6] [--range-fill:0] w-full cursor-grabbing"
        />
        <div className="flex justify-between px-2.5 mt-2 text-xs">
          <h2 className="form-slider-option mt-[-5px]">Streetwear</h2>
          <h2 className="form-slider-option mt-[-5px]">Formalwear</h2>
        </div>
      </div>
    </div>
  );
};

export default Slider;
