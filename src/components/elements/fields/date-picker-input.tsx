import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import DatePickerInput, { DatePickerInputProps } from '../date-picker-input';
import { FormContext } from '../form/context';

export interface DatePickerInputFieldProps extends DatePickerInputProps {
  name: string;
  type: 'date';
}

export default function DatePickerInputField(props: DatePickerInputFieldProps) {
  const {
    name,
    disabled: _disabled,
    readOnly,
    type,
    required,
    placeholder = 'DD/MM/YYYY',
    ...rest
  } = props;

  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ name, control });

  const disabled = !context.editable || readOnly || _disabled;
  const error = fieldState?.error?.message;

  return (
    <DatePickerInput
      {...rest}
      {...field}
      {...(!disabled && { required })}
      placeholder={placeholder}
      error={error}
      disabled={disabled}
    />
  );
}
