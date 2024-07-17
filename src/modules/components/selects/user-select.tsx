import { ComboboxItem } from '@mantine/core';
import { UserLiteModel } from 'api-hooks/user/model';
import { useGetUsers } from 'api-hooks/user/query';
import { Input } from 'components/elements/fields';
import { SelectFieldProps } from 'components/elements/fields/select';

interface UserSelectProps extends Omit<SelectFieldProps, 'data' | 'type'> {}

export function userTransformer(value: UserLiteModel): ComboboxItem {
  return {
    label: [
      value.nomorIdentitas,
      [value.namaDepan, value.namaTengah, value.namaBelakang]
        .filter(Boolean)
        .join(' '),
    ].join(' - '),
    value: value.nomorIdentitas,
  };
}

export default function UserSelect(props: UserSelectProps) {
  const { data } = useGetUsers();
  const options = (data?.data || []).map((item) => userTransformer(item));

  return (
    <Input
      type="select"
      label="Pengguna"
      placeholder="Pengguna"
      data={options}
      {...props}
    />
  );
}
