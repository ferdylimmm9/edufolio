import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import DateTimePicker, { DateTimePickerProps } from '../date-time';
import { FormContext } from '../form/context';

export interface DateTimePickerFieldProps extends DateTimePickerProps {
  name: string;
  type: 'date-time';
}

export default function DateTimePickerField(props: DateTimePickerFieldProps) {
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
    <DateTimePicker
      {...rest}
      {...field}
      {...(!disabled && { required })}
      placeholder={placeholder}
      error={error}
      disabled={disabled}
    />
  );
}
