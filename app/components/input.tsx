import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

const Input = <T,>({
  label,
  control,
  name,
  rules,
  defaultValue,
  shouldUnregister,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
} & UseControllerProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue,
    shouldUnregister,
    rules,
  });

  return (
    <div>
      {label && (
        <label className="mb-1 block" htmlFor={name}>
          {label}
          {rules?.required && '*'}
        </label>
      )}
      <input
        type="text"
        id={name}
        className={classNames(
          'block border border-slate-500 bg-transparent px-2 py-2 rounded-md w-full',
          error ? 'border-red-500' : 'border-slate-500'
        )}
        {...props}
        {...field}
        value={field.value as string}
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default Input;
