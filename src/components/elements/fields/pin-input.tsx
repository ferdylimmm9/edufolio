import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import PinInput, { PinInputProps } from '../pin-input';

export interface PinInputFieldProps extends PinInputProps {
  name: string;
  type: 'pin';
}

export default function PinInputField(props: PinInputFieldProps) {
  const { name, disabled: _disabled, readOnly, type, ...rest } = props;

  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ name, control });

  const disabled = !context.editable || readOnly || _disabled;
  const error = !!fieldState?.error?.message;

  return <PinInput {...rest} {...field} error={error} disabled={disabled} />;
}
