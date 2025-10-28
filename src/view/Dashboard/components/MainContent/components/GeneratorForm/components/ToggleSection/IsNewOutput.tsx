import { useGeneratorSetting } from "@/store/useGeneratorData";
import React, { useState } from "react";

const IsNewOutput = () => {
  const { setIsNewOutfit, is_new_outfit } = useGeneratorSetting();
  return (
    <div className="flex-1 ml-2 min-w-[50%]">
      <h2 className="form-label">
        New outfit? <span className="font-light text-xs">(Edit outfit)</span>
      </h2>
      <div className="flex justify-between space-x-0.5 bg-base-300 p-0.5 rounded-sm ">
        <button
          onClick={() => setIsNewOutfit(false)}
          className={`btn btn-sm border-0 rounded-xs text-[0.8rem] flex-1 ${!is_new_outfit ? "bg-base-100" : "bg-base-300"}`}
        >
          No
        </button>
        <button
          onClick={() => setIsNewOutfit(true)}
          className={`btn btn-sm border-0 rounded-xs text-[0.8rem] flex-1 ${is_new_outfit ? "bg-base-100" : "bg-base-300"}`}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default IsNewOutput;
