import React, { TextareaHTMLAttributes } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';

const ControlledTextarea = <T,>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  ...props
}: UseControllerProps<T> & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const { field } = useController({
    control,
    name,
  });

  return (
    <div>
      <label>label</label>
      <textarea {...field} {...props} value={field.value as string} />
    </div>
  );
};

export default ControlledTextarea;
