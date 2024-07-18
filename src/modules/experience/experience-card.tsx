import { Anchor, Badge, Flex } from '@mantine/core';
import { ExperienceLiteModel } from 'api-hooks/experience/model';
import { formatDate } from 'common/utils/date';
import { replaceWithBr } from 'common/utils/string';
import Separator from 'components/common/separator';
import Text from 'components/elements/text';

export function ExperienceCard(props: ExperienceLiteModel) {
  const dateLabel = [
    formatDate(props.tanggalMulai),
    props.tanggalSelesai ? formatDate(props.tanggalSelesai) : 'Sekarang',
  ].join(' - ');

  const files = props.lampiranPengalaman.map((item) => {
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

  const label = [props.namaPerusahaan, props.lokasi].filter(Boolean).join(', ');
  const labelComponent = label && (
    <Text textColor="foregroundSecondary" textVariant="body2Regular">
      {label}
    </Text>
  );

  const skills = props.skills
    .split('|')
    .filter(Boolean)
    .map((skill) => {
      return <Badge key={skill}>{skill}</Badge>;
    });

  const deskripsiComponent = props.deskripsi && (
    <Text textColor="foregroundSecondary" textVariant="body2Regular">
      <div
        dangerouslySetInnerHTML={{ __html: replaceWithBr(props.deskripsi) }}
      />
    </Text>
  );

  return (
    <Flex direction="column" w="100%" gap={8}>
      <Text textVariant="body1Semibold">{props.posisi}</Text>
      {labelComponent}
      <Text textColor="foregroundSecondary" textVariant="body2Regular">
        {dateLabel}
      </Text>
      {deskripsiComponent && (
        <>
          <Text textVariant="body1Medium">Deskripsi</Text>
          {deskripsiComponent}
          <Separator gap={4} />
        </>
      )}
      {!!skills.length && (
        <>
          <Text textVariant="body1Medium">Skills</Text>
          <Flex direction="row" wrap="wrap" gap={4} mb={4}>
            {skills}
          </Flex>
        </>
      )}
      {!!files.length && (
        <Flex direction="column" gap={4} w="fit-content">
          <>
            <Text textVariant="body1Medium">Files</Text>
            {files}
          </>
        </Flex>
      )}
    </Flex>
  );
}
