import { Anchor, Flex } from '@mantine/core';
import { ThesisLiteModel } from 'api-hooks/thesis/model';
import { formatDate } from 'common/utils/date';
import Text from 'components/elements/text';

export function ThesisCard(props: ThesisLiteModel) {
  const files = props.lampiranTugasAkhir.map((item) => {
    const file = item.fileUrl.split('/');
    return (
      <Anchor
        fz={11}
        c="blue"
        href={item.fileUrl}
        target="_blank"
        key={item.fileUrl}
      >
        {file[file.length - 1]}
      </Anchor>
    );
  });

  const dateComponent = props.tanggalTerbit && (
    <Text textColor="foregroundSecondary" textVariant="body2Regular">
      {formatDate(props.tanggalTerbit)}
    </Text>
  );

  return (
    <Flex direction="column" w="100%" gap={8}>
      <Text textVariant="body1Semibold">{props.judulTugasAkhir}</Text>
      {dateComponent}
      <Text textColor="foregroundSecondary" textVariant="body2Regular">
        {props.abstrak}
      </Text>
      <Flex direction="column" gap={4} w="fit-content">
        {files}
      </Flex>
    </Flex>
  );
}
