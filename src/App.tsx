import { Authenticated, Unauthenticated } from 'convex/react';
import { useEffect } from 'react';
import { useAppSetting } from './store/useAppSetting';
import { themeChange } from 'theme-change';
import LandingPage from './view/LandingPage';
import Routes from './view/Dashboard/Routes';

export default function App() {
  const { theme } = useAppSetting();

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
    </div>
  );
}
