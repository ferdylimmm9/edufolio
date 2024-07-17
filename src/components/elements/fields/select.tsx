import { ComboboxItem } from '@mantine/core';
import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import Select, { SelectProps } from '../select';

export interface SelectFieldProps extends SelectProps {
  name: string;
  type: 'select';
  onAfterChange?: (value?: string | null, option?: ComboboxItem) => void;
}

export default function SelectField(props: SelectFieldProps) {
  const {
    name,
    disabled: _disabled,
    required,
    readOnly,
    onAfterChange,
    onChange,
    searchable = true,
    ...rest
  } = props;

  const context = useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ name, control });

  const disabled = !context.editable || readOnly || _disabled;
  const error = fieldState?.error?.message;

  return (
    <Select
      {...rest}
      {...field}
      {...(!disabled && { required })}
      error={error}
      disabled={disabled}
      searchable={searchable}
      onChange={(value, option) => {
        onChange?.(value, option);
        if (!onChange) {
          field.onChange(value);
          if (onAfterChange) {
            onAfterChange(value, option);
          }
        }
      }}
    />
  );
}
