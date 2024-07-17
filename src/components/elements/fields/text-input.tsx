import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import TextInput, { TextInputProps } from '../text-input';

export interface TextInputFieldProps extends TextInputProps {
  name: string;
  type: 'text' | 'email' | 'tel';
  onAfterChange?: (value?: string) => void;
}

export default function TextInputField(props: TextInputFieldProps) {
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
    <TextInput
      {...rest}
      {...restField}
      {...(!disabled && { required })}
      error={error}
      disabled={disabled}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
