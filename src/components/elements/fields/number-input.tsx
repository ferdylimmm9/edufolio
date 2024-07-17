import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import NumberInput, { NumberInputProps } from '../number-input';

export interface NumberInputFieldProps extends NumberInputProps {
  name: string;
  type: 'number';
  onAfterChange?: (value?: string | number) => void;
}

export default function NumberInputField(props: NumberInputFieldProps) {
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
    <NumberInput
      {...rest}
      {...restField}
      {...(!disabled && { required })}
      error={error}
      disabled={disabled}
      onChange={(e) => {
        onChange(e);
        onAfterChange?.(e);
      }}
    />
  );
}
