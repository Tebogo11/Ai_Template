// import { useTheme } from "./useTheme";

import Flex from '@/components/Core/Flex';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { MoonIcon as SolidMoon, SunIcon as SolidSun } from '@heroicons/react/24/solid';
import { useAppSetting } from '@/store/useAppSetting';

type DarkModeSwitchProps = {
  // Optional props can be added here if needed
  size?: 'medium' | 'large';
};
const DarkModeSwitch = ({ size = 'medium' }: DarkModeSwitchProps) => {
  const { theme, setTheme } = useAppSetting();
  const btnSize = size === 'medium' ? '5' : '8';
  const iconSize = size === 'medium' ? '4' : '5';

  return (
    <Flex className="bg-base-300 h-fit cursor-pointer rounded-sm">
      <button
        onClick={() => setTheme('light')}
        data-set-theme="mytheme"
        data-act-class="ACTIVECLASS"
        className={`btn ${theme === 'light' ? 'btn-primary' : ''} m-1 mr-1 h-${btnSize} w-${btnSize} cursor-pointer rounded-sm p-[1px]`}
      >
        {theme === 'light' ? (
          <SolidSun className={`size-${iconSize} text-base-100`} />
        ) : (
          <SunIcon className={`size-${iconSize} text-primary`} />
        )}
      </button>
      <button
        onClick={() => setTheme('dark')}
        data-set-theme="mytheme-dark"
        data-act-class="ACTIVECLASS"
        className={`btn ${theme === 'dark' ? 'btn-primary' : ''} m-1 ml-0 h-${btnSize} w-${btnSize} cursor-pointer rounded-sm p-[1px]`}
      >
        {theme === 'dark' ? (
          <SolidMoon className={`size-${iconSize} text-base-100`} />
        ) : (
          <MoonIcon className={`size-${iconSize} text-primary`} />
        )}
      </button>
    </Flex>
  );
};

export default DarkModeSwitch;
