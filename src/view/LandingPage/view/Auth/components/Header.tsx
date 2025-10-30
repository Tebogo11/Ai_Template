import Flex from "@/components/Core/Flex";
import DarkModeSwitch from "@/confg/darkMode/DarkModeSwitch";
import { useAppSetting } from "@/store/useAppSetting";
import { SignUpButton } from "@clerk/clerk-react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, NavLink } from "react-router";

const Header = () => {
  const { theme } = useAppSetting();
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Pricing", to: "/pricing" },
  ];

  return (
    <div className=" sticky flex justify-between navbar  top-0 left-0 right-0 z-20  bg-base-300/40 backdrop-blur-md">
      <Flex className="flex items-center justify-start gap-4">
        <Link to="/" className="flex items-center gap-2">
          <LazyLoadImage
            src={`/assets/logo/${theme === "light" ? "Logo" : "Logo-white"}.png`}
            alt="Outfit AI"
            className={`h-9 w-auto object-contain transition-transform duration-300 hover:scale-110 `}
          />

          <h1 className={`text-base-content text-lg font-extrabold md:text-xl`}>
            Outfit AI
          </h1>
        </Link>
      </Flex>
      <div className="pl-23.5">
        <ul className="menu menu-horizontal hidden  px-3  md:flex">
          {navLinks.map((link) => (
            <li key={link.to} className="text-sm font-medium">
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `rounded px-3 py-2 transition ${
                    isActive
                      ? "bg-primary text-primary-content shadow-sm"
                      : "text-base-content/80 hover:bg-base-200"
                  } `
                }
              >
                <h2 className="font-bold text-center">{link.label}</h2>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn btn-secondary btn-sm  w-18">
            Login
          </Link>
          <SignUpButton mode="modal">
            <button className="btn btn-outline btn-sm w-18">Sign up</button>
          </SignUpButton>
          <div className="hidden md:block">
            <DarkModeSwitch />
          </div>
        </div>
        <div className="dropdown-end dropdown md:hidden">
          <label tabIndex={0} className="btn btn-circle btn-ghost">
            <Bars3Icon className="h-5 w-5" />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-3 shadow"
          >
            {navLinks.map((link) => (
              <li key={link.to} className="font-bold">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded ${
                      isActive
                        ? "bg-primary text-primary-content"
                        : "hover:bg-base-200"
                    } font-bold`
                  }
                >
                  <span className="font-bold">{link.label}</span>
                </NavLink>
              </li>
            ))}

            <li>
              <div className="flex justify-center ">
                <DarkModeSwitch />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
