import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/outline';
import { CheckIcon } from '@heroicons/react/solid';
import { Fragment, SelectHTMLAttributes } from 'react';
import {
  useController,
  UseControllerProps,
  ValidationValueMessage,
} from 'react-hook-form';
import { getOptionsLabel } from '../lib/form';

const Select = <T,>({
  label,
  control,
  rules,
  name,
  defaultValue,
  shouldUnregister,
  options,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> &
  UseControllerProps<T> & {
    label?: string;
    options: {
      label: string;
      value: string;
    }[];
  }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
  });

  const value = (field.value as string) || '';
  const maxLength = (rules?.maxLength as ValidationValueMessage)
    ?.value as number;

  return (
    <div>
      {label && (
        <label htmlFor={name}>
          {label}
          {rules?.required && '*'}
        </label>
      )}

      <Listbox value={field.value} onChange={field.onChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full border-slate-500 border cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {getOptionsLabel(field.value as string, options) || 'なし'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {[
                {
                  value: null,
                  label: 'なし',
                },
                ...options,
              ].map((option) => (
                <Listbox.Option
                  key={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-slate-900 text-blue-500' : 'text-slate-200'
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default Select;
