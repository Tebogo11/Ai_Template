import { useAppSetting } from "@/store/useAppSetting";
import React from "react";

const SideBar = () => {
  const { theme } = useAppSetting();
  return (
    <div className="p-2 px-3 border-r-1 border-[#24242425] dark:border-[#ffffff25]">
      <label htmlFor="my-drawer" className="drawer-button cursor-pointer">
        <img
          src={`/assets/logo/${theme === "light" ? "Logo" : "Logo-white"}.png`}
          alt="menu"
          className="h-10 w-8 hover:scale-110 object-contain"
        />
      </label>
    </div>
  );
};

export default SideBar;
