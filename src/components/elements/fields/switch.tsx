import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import Switch, { SwitchProps } from '../switch';

export interface SwitchFieldProps extends SwitchProps {
  name: string;
  type: 'switch';
}

export default function SwitchField(props: SwitchFieldProps) {
  const {
    name,
    disabled: _disabled,
    readOnly,
    required,
    type,
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
    <Switch
      {...rest}
      {...restField}
      {...(!disabled && { required })}
      error={error}
      disabled={disabled}
      onChange={(e) => {
        onChange(e?.target?.checked);
      }}
    />
  );
}
