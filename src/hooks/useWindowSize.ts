import { useEffect, useState } from 'react';

export const MOBILE_WIDTH = 992;

type WindowSize = {
  width: number;
  height: number;
};

const getWindowSize = (): WindowSize => {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

type WindowSizeWithMobile = WindowSize & { isMobile: boolean };

const useWindowSize = (): WindowSizeWithMobile => {
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowSize.width < MOBILE_WIDTH;
  return { ...windowSize, isMobile };
};

export default useWindowSize;
