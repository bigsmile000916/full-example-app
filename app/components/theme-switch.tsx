import { Switch } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import classNames from 'classnames';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkMode = resolvedTheme === 'dark';

  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className="mr-4">Dark Mode</Switch.Label>
        <Switch
          checked={isDarkMode}
          onChange={(isDark: boolean) => setTheme(isDark ? 'dark' : 'light')}
          className={classNames(
            'relative border-none inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75',
            isDarkMode ? 'bg-teal-900' : 'bg-teal-700'
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              'pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
              isDarkMode ? 'translate-x-9' : 'translate-x-0'
            )}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};

export default ThemeSwitch;
