import { Flex } from '@mantine/core';
import { ThesisLiteModel } from 'api-hooks/thesis/model';
import Text from 'components/elements/text';

export default function ThesisItem(props: ThesisLiteModel) {
  const user = props.user;
  const name = [user.namaDepan, user.namaTengah, user.namaBelakang]
    .filter(Boolean)
    .join(' ');

  const label = [user.nomorIdentitas, name].join(' - ');
  const studyProgram = user.programStudi;
  const studyProgramLabel = [studyProgram.kode, studyProgram.nama].join(' - ');

  return (
    <Flex direction="column" gap={8} w="100%">
      <Text textVariant="body1Medium">{props.judulTugasAkhir}</Text>
      <Text textVariant="body2Regular">{label}</Text>
      <Text textVariant="body2Regular">{studyProgramLabel}</Text>
    </Flex>
  );
}
