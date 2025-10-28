import Flex from "@/components/Core/Flex";
import DarkModeSwitch from "@/confg/darkMode/DarkModeSwitch";
import { useAppSetting } from "@/store/useAppSetting";
import { SignUpButton } from "@clerk/clerk-react";

const Header = () => {
  const { theme } = useAppSetting();
  return (
    <div className="navbar bg-transparent shadow-none absolute top-0 left-0 right-0 z-10 ">
      <Flex className="flex items-start justify-start  flex-1">
        <img
          src={`/assets/logo/Logo-white.png`}
          alt="menu"
          className={`h-8 w-auto object-contain hover:scale-110 ${theme === "light" ? "max-md:hidden" : "block"}`}
        />
        <img
          src={`/assets/logo/Logo.png`}
          alt="menu"
          className={`h-8 w-auto object-contain hover:scale-110 block ${theme === "light" ? "md:hidden" : "hidden"} `}
        />
        <h1
          className={`${theme === "light" ? "md:text-white" : "text-white"} text-[20px] font-extrabold ml-2 mt-[2px]`}
        >
          Outfit
        </h1>
      </Flex>
      <div className="flex ">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Pricing</a>
          </li>
        </ul>
        <div className="flex items-center">
          <button className="btn btn-sm mr-2 btn-secondary w-18">Login</button>
          <SignUpButton mode="modal">
            <button className="btn btn-sm btn-outline w-18  mr-2">
              Sign up
            </button>
          </SignUpButton>

          <DarkModeSwitch />
        </div>
      </div>
    </div>
  );
};

export default Header;
