import { Switch } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import classNames from 'classnames';
import { MoonIcon } from '@heroicons/react/outline';
import { MoonIcon as MonnIconFill } from '@heroicons/react/solid';

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
        <Switch.Label className="mr-2">
          {isDarkMode ? (
            <MonnIconFill className="w-6 h-6 text-yellow-400" />
          ) : (
            <MoonIcon className="w-6 h-6 text-yellow-500 opacity-50" />
          )}
        </Switch.Label>
        <Switch
          checked={isDarkMode}
          onChange={(isDark: boolean) => setTheme(isDark ? 'dark' : 'light')}
          className={classNames(
            'relative border-none inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 dark:bg-slate-900 bg-slate-400'
          )}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              'pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
              isDarkMode ? 'translate-x-6' : 'translate-x-0'
            )}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};

export default ThemeSwitch;
