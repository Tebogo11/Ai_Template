import DarkModeSwitch from "@/confg/darkMode/DarkModeSwitch";
import { useAppSetting } from "@/store/useAppSetting";
import { UserButton } from "@clerk/clerk-react";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import React from "react";

const Header = () => {
  const { theme } = useAppSetting();
  return (
    <div className="flex bg-background dark:bg-darkBackground items-start justify-between md:justify-end py-4 px-0 w-full">
      <div className="flex items-center w-full">
        <label
          htmlFor="my-drawer"
          className="drawer-button cursor-pointer ml-[-5px]"
        >
          <Bars3BottomLeftIcon className="h-8 w-8 text-primary" />
        </label>
        <h2 className="login-outfit text-base-content text-[20px] font-light ml-2 mt-[2px]">
          Outfit
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <DarkModeSwitch />
        </div>

        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "w-30 h-30", // Custom width and height
              userButtonPopoverCard: " text-red-100", // Custom background for the popover card
              userButtonPopoverActionButton: "text-secondary", // Custom text color for action buttons
            },
          }}
        />
      </div>
    </div>
  );
};

export default Header;
