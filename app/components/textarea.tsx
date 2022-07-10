import classNames from 'classnames';
import { TextareaHTMLAttributes } from 'react';
import {
  useController,
  UseControllerProps,
  ValidationValueMessage,
} from 'react-hook-form';

const TextArea = <T,>({
  className,
  label,
  control,
  rules,
  name,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> &
  UseControllerProps<T> & {
    label?: string;
  }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
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
      <textarea
        id={name}
        className={classNames(
          'border bg-transparent border-slate-500 px-2 py-2 rounded-md w-full',
          error && 'border-red-500',
          className
        )}
        {...props}
        {...field}
        value={value}
      />
      {rules?.maxLength && (
        <p className="text-sm text-right text-slate-500">
          <span
            className={classNames(value.length > maxLength && 'text-red-500')}
          >
            {value.length || 0}
          </span>
          / {maxLength}
        </p>
      )}
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default TextArea;
