// import { useTheme } from "./useTheme";

import Flex from "@/components/Core/Flex";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import {
  MoonIcon as SolidMoon,
  SunIcon as SolidSun,
} from "@heroicons/react/24/solid";
import { useAppSetting } from "@/store/useAppSetting";

const DarkModeSwitch = () => {
  const { theme, setTheme } = useAppSetting();

  return (
    <Flex className=" bg-base-300  rounded-sm cursor-pointer h-fit">
      <button
        onClick={() => setTheme("light")}
        data-set-theme="mytheme"
        data-act-class="ACTIVECLASS"
        className={`btn ${theme === "light" ? "btn-primary" : ""}  m-1 p-[1px] mr-1 rounded-sm cursor-pointer h-5`}
      >
        {theme === "light" ? (
          <SolidSun className="size-4 text-prmary" />
        ) : (
          <SunIcon className="size-4 text-primary" />
        )}
      </button>
      <button
        onClick={() => setTheme("dark")}
        data-set-theme="mytheme-dark"
        data-act-class="ACTIVECLASS"
        className={`btn ${theme === "dark" ? "btn-primary" : ""} m-1 ml-0 p-[1px] rounded-sm cursor-pointer h-5`}
      >
        {theme === "dark" ? (
          <SolidMoon className="size-4 text-base-100" />
        ) : (
          <MoonIcon className="size-4 text-primary" />
        )}
      </button>
    </Flex>
  );
};

export default DarkModeSwitch;
