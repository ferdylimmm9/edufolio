import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import PasswordInput, { PasswordInputProps } from '../password-input';

export interface PasswordInputFieldProps extends PasswordInputProps {
  name: string;
  type: 'password';
}

export default function PasswordInputField(props: PasswordInputFieldProps) {
  const {
    name,
    disabled: _disabled,
    readOnly,
    type,
    required,

    noMargin = false,
    ...rest
  } = props;

  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const {
    field: { onChange, value, ...restField },
    fieldState,
  } = useController({ name, control });

  const disabled = !context.editable || readOnly || _disabled;
  const error = fieldState?.error?.message;

  return (
    <>
      <PasswordInput
        {...rest}
        {...restField}
        {...(!disabled && { required })}
        error={error}
        disabled={disabled}
        noMargin={noMargin}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  );
}
