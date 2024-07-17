import { Anchor, Flex } from '@mantine/core';
import { useGetThesis } from 'api-hooks/thesis/query';
import { formatDate } from 'common/utils/date';
import Text from 'components/elements/text';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';

export default function ThesisView() {
  const { query } = useRouter();
  const id = query.id as string;

  const queryThesis = useGetThesis({ params: { id } });

  return (
    <LoaderView query={queryThesis}>
      {({ data }) => {
        const _thesis = data;

        const user = _thesis?.user;

        const name = [user?.namaDepan, user?.namaTengah, user?.namaBelakang]
          .filter(Boolean)
          .join(' ');

        const nameLabel = [user?.nomorIdentitas, name]
          .filter(Boolean)
          .join(' - ');

        const studyProgram = user?.programStudi;

        const studyProgramLabel = [studyProgram?.kode, studyProgram?.nama].join(
          ' - ',
        );
        const dateComponent = _thesis?.tanggalTerbit && (
          <>
            <Text textVariant="body1Semibold">Waktu Terbit:</Text>
            <Text>{formatDate(_thesis.tanggalTerbit)}</Text>
          </>
        );

        const files = _thesis.lampiranTugasAkhir?.map((item) => {
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

        return (
          <Flex
            mih="100vh"
            w="100%"
            maw={768}
            direction="column"
            gap={16}
            p={16}
          >
            <Text textVariant="h1" mb={16}>
              Detail Karya Ilmiah
            </Text>
            <Text textVariant="body1Semibold">Judul:</Text>
            <Text>{_thesis.judulTugasAkhir}</Text>
            <Text textVariant="body1Semibold">Penulis:</Text>
            <Text>{nameLabel}</Text>
            <Text textVariant="body1Semibold">Program Studi:</Text>
            <Text>{studyProgramLabel}</Text>
            <Text textVariant="body1Semibold">Abstrak:</Text>
            <Text>{_thesis.abstrak}</Text>
            {dateComponent}
            <Text textVariant="body1Semibold">Files:</Text>
            <Flex direction="column" gap={4} w="fit-content">
              {files}
            </Flex>
          </Flex>
        );
      }}
    </LoaderView>
  );
}
