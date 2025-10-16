import { UserButton } from "@clerk/clerk-react";
import React from "react";
import Home from "./Home";
import Flex from "@/components/Core/Flex";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useAppSetting } from "@/store/useAppSetting";

const Dashboard = () => {
  const { theme } = useAppSetting();
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <Home />
      </div>
      <div className="drawer-side dea">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        >
          <p>close</p>
        </label>
        <div>
          <ul className="menu  text-base-content min-h-screen w-80 bg-base-100">
            {/* Sidebar content here */}
            <Flex
              className="mb-4 items-center justify-between w-full "
              direction="row"
              justify="between"
            >
              <Flex className="flex items-center justify-center  ">
                <img
                  src={`/assets/logo/${theme === "light" ? "Logo" : "Logo-white"}.png`}
                  alt="menu"
                  className="h-10 w-8 object-contain hover:scale-110"
                />
                <h1 className="login-outfit text-base-content text-[20px] font-light ml-2 ">
                  Outfit
                </h1>
              </Flex>
              <div>
                <button className="btn btn-sm btn-neutral  rounded-sm w-8 h-8 p-1">
                  <PlusIcon className="h-10 w-10" />
                </button>
              </div>
            </Flex>
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
