import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import Checkbox, { CheckboxProps } from '../checkbox';
import { FormContext } from '../form/context';

export interface CheckboxFieldProps extends CheckboxProps {
  name: string;
  type: 'checkbox';
}

export default function CheckboxField(props: CheckboxFieldProps) {
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
  const { field, fieldState } = useController({ name, control });

  const disabled = !context.editable || readOnly || _disabled;
  const error = fieldState?.error?.message;

  return (
    <Checkbox
      {...rest}
      {...(!disabled && { required })}
      error={error}
      disabled={disabled}
      checked={field.value}
      onChange={(e) => {
        field.onChange(e?.target?.checked);
      }}
    />
  );
}
