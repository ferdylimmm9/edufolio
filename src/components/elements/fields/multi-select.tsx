import { GLOBAL_SEPARATOR } from 'common/global';
import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormContext } from '../form/context';
import MultiSelect, { MultiSelectProps } from '../multi-select';

function transformer(item: string[]) {
  return (item || []).map((value) => ({
    label: value.split(GLOBAL_SEPARATOR)[0],
    value,
  }));
}

export interface MultiSelectFieldProps extends MultiSelectProps {
  name: string;
  type: 'multi-select';
  creatable?: boolean;
  onAfterChange?: (value?: string[]) => void;
}

export default function MultiSelectField(props: MultiSelectFieldProps) {
  const {
    name,
    disabled: _disabled,
    required,
    readOnly,
    creatable = false,
    onAfterChange,
    ...rest
  } = props;

  const context = React.useContext(FormContext);
  const { control } = useFormContext<any>();
  const { field, fieldState } = useController({ name, control });

  const disabled = !context.editable || readOnly || _disabled;
  const error = fieldState?.error?.message;

  const [data, setData] = React.useState(transformer(field.value) || []);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    if (data?.length <= field?.value?.length) {
      setData(transformer(field.value));
    }
  }, [data?.length, field.value]);

  const onSearchChange = (value: string) => {
    const oldData = transformer(field.value || []);
    setSearchValue(value);

    if (value && creatable) {
      const tempData = [
        {
          label: value,
          value: `${value}${GLOBAL_SEPARATOR}${value}`,
        },
      ];
      setData([...oldData, ...tempData]);
    }
  };

  const onChange = (value: string[]) => {
    field.onChange(value);
    onAfterChange?.(value);
  };

  const onBlur = () => {
    setSearchValue('');
    setData(transformer(field.value));
  };

  return (
    <MultiSelect
      {...rest}
      {...field}
      {...(!disabled && { required })}
      error={error}
      onBlur={onBlur}
      onChange={onChange}
      disabled={disabled}
      searchable={creatable}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
    />
  );
}
