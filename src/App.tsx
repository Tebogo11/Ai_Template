import { Authenticated, Unauthenticated } from 'convex/react';
import { useEffect } from 'react';
import { useAppSetting } from './store/useAppSetting';
import { themeChange } from 'theme-change';
import LandingPage from './view/LandingPage';
import Routes from './view/Dashboard/Routes';

export default function App() {
  const { theme } = useAppSetting();
  // const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div
      className="relative flex min-h-[100svh] flex-col md:min-h-screen"
      data-theme={theme === 'light' ? 'outfit' : 'outfit-dark'}
    >
      <main data-theme={theme} className="bg-base-100 flex-1 overflow-auto">
        <Authenticated>
          <Routes />
        </Authenticated>
        <Unauthenticated>
          <LandingPage />
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
