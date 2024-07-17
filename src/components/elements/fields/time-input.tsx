import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import TimeInput, { TimeInputProps } from '../time-input';

export interface TimeInputFieldProps extends TimeInputProps {
  name: string;
  type: 'time';
}

export default function TimeInputField(props: TimeInputFieldProps) {
  const {
    name,
    disabled: _disabled,
    readOnly,
    type,
    required,
    ...rest
  } = props;

  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ name, control });

  const disabled = !context.editable || readOnly || _disabled;
  const error = fieldState?.error?.message;

  return (
    <TimeInput
      {...rest}
      {...field}
      {...(!disabled && { required })}
      error={error}
      disabled={disabled}
    />
  );
}
