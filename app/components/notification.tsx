import { Popover } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/outline';
import React from 'react';

const Notification = () => {
  return (
    <Popover className="relative">
      <Popover.Button className="w-10 h-10 flex items-center justify-center border border-slate-800 rounded-full">
        <BellIcon className="w-5 h-5 text-slate-300" />
      </Popover.Button>

      <Popover.Panel className="absolute mt-2 z-10 right-0 bg-slate-800 p-4 w-72 origin-top-right shadow-lg rounded-md">
        <ul>
          <li>item</li>
          <li>item</li>
          <li>item</li>
        </ul>
      </Popover.Panel>
    </Popover>
  );
};

export default Notification;
