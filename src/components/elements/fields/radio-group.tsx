import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import RadioGroup, { RadioGroupProps } from '../radio-group';

export interface RadioGroupFieldProps extends RadioGroupProps {
  name: string;
  type: 'radio-group';
}

export default function RadioGroupField(props: RadioGroupFieldProps) {
  const { name, disabled: _disabled, required, ...rest } = props;

  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ name, control });

  const disabled = !context.editable || _disabled;
  const error = fieldState?.error?.message;

  return (
    <RadioGroup
      {...rest}
      {...field}
      {...(!disabled && { required })}
      error={error}
      disabled={disabled}
    />
  );
}
