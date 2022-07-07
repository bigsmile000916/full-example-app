import classNames from 'classnames';
import { forwardRef, TextareaHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    currentLength?: number;
    limitLength?: number;
    errors?: FieldErrors;
  }
>(({ className, limitLength, currentLength, label, errors, ...props }, ref) => {
  return (
    <div>
      {label && <label htmlFor={props.name}>{label}</label>}
      <textarea
        id={props.name}
        className={classNames(
          'border bg-transparent border-slate-500 px-2 py-2 rounded-md w-full',
          errors?.[props.name!] && 'border-red-500',
          className
        )}
        {...props}
        ref={ref}
      />{' '}
      {limitLength && (
        <p className="text-sm text-right text-slate-500">
          <span
            className={classNames(
              currentLength && currentLength > limitLength && 'text-red-500'
            )}
          >
            {currentLength || 0}
          </span>{' '}
          / {limitLength}
        </p>
      )}
      {errors && (
        <ErrorMessage
          name={props.name!}
          errors={errors}
          render={({ message }) => <p className="text-red-500">{message}</p>}
        />
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
