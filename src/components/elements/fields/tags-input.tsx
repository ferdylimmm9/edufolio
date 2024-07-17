import { useContext } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import TagsInput, { TagsInputProps } from '../tag-input';

export interface TagsInputFieldProps extends TagsInputProps {
  name: string;
  type: 'tags';
  onAfterChange?: (value?: string) => void;
}

export default function TagsInputField(props: TagsInputFieldProps) {
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
    <TagsInput
      {...rest}
      {...restField}
      {...(!disabled && { required })}
      error={error}
      disabled={disabled}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
}
