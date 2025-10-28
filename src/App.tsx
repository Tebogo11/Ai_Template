import { Authenticated, Unauthenticated } from "convex/react";
import { UserButton } from "@clerk/clerk-react";
import { AuthPage } from "./view/Auth/SignInForm";
import Dashboard from "./view/Dashboard";
import { useEffect, useState } from "react";
import { useAppSetting } from "./store/useAppSetting";
import { themeChange } from "theme-change";

export default function App() {
  const { theme } = useAppSetting();
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div
      className="flex flex-col h-screen w-screen relative"
      data-theme={theme === "light" ? "outfit" : "outfit-dark"}
    >
      <main
        data-theme={theme}
        className="flex-1 bg-base-100 overflow-auto min-w-[375px]"
      >
        <Authenticated>
          <Dashboard />
        </Authenticated>
        <Unauthenticated>
          <AuthPage />
        </Unauthenticated>
      </main>

      {/* 🔲 Transparent Grid Overlay */}
      {/* {showGrid && (
        <div
          className="fixed inset-0 z-50 grid grid-cols-12 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(13, 164, 201, 0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(13, 164, 201, 0.8)  1px, transparent 1px)",
            backgroundSize: "calc(100% / 12) 100%, 100% calc(100% / 12)",
          }}
        ></div>
      )} */}

      {/* 🟢 Toggle Button */}
      {/* <button
        onClick={() => setShowGrid(!showGrid)}
        className="fixed bottom-4 right-4 z-50 px-4 py-2 rounded-md bg-primary text-white text-sm shadow-lg hover:bg-primary/80 transition"
      >
        {showGrid ? "Hide Grid" : "Show Grid"}
      </button> */}
    </div>
  );
}
