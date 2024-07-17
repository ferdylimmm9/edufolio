import { ComboboxItem } from '@mantine/core';
import { StudyProgramLiteModel } from 'api-hooks/study-program/model';
import { useGetStudyPrograms } from 'api-hooks/study-program/query';
import { Input } from 'components/elements/fields';
import { SelectFieldProps } from 'components/elements/fields/select';

interface StudyProgramSelectProps
  extends Omit<SelectFieldProps, 'data' | 'type'> {}

export function studyProgramTransformer(
  value: StudyProgramLiteModel,
): ComboboxItem {
  return {
    label: [value.kode, value.nama].join(' - '),
    value: value.id,
  };
}

export default function StudyProgramSelect(props: StudyProgramSelectProps) {
  const { data } = useGetStudyPrograms();
  const options = (data?.data || []).map((item) =>
    studyProgramTransformer(item),
  );

  return (
    <Input
      type="select"
      label="Program Studi"
      placeholder="Program Studi"
      data={options}
      {...props}
    />
  );
}
