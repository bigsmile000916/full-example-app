import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldErrors } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    errors?: FieldErrors;
  }
>(({ className, label, errors, ...props }, ref) => {
  return (
    <div>
      {label && <label htmlFor={props.name}>{label}</label>}
      <input
        type="text"
        id={props.name}
        className={classNames(
          'border bg-transparent border-slate-500 px-2 py-2 rounded-md',
          className
        )}
        {...props}
        ref={ref}
      />
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

Input.displayName = 'Input';

export default Input;
