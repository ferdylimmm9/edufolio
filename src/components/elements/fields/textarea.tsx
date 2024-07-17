import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import Textarea, { TextareaProps } from '../textarea';

export interface TextareaFieldProps extends TextareaProps {
  name: string;
  type: 'textarea';
  onAfterChange?: (value?: string) => void;
}

export default function TextareaField(props: TextareaFieldProps) {
  const {
    name,
    disabled: _disabled,
    readOnly,
    type,
    required,
    onAfterChange,
    ...rest
  } = props;

  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const {
    field: { onChange, ...restField },
    fieldState,
  } = useController({ name, control });

  const disabled = !context.editable || readOnly || _disabled;
  const error = fieldState?.error?.message;

  return (
    <Textarea
      {...rest}
      {...restField}
      {...(!disabled && { required })}
      error={error}
      disabled={disabled}
      onChange={(e) => {
        onChange(e?.target?.value);
        onAfterChange?.(e?.target?.value);
      }}
    />
  );
}
