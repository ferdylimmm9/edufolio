import { Card, Flex } from '@mantine/core';
import { useGetUser } from 'api-hooks/user/query';
import colors from 'common/styles/colors';
import Text from 'components/elements/text';
import LoaderView from 'components/loader-view';
import CertificationList from 'modules/certification/certification-list';
import EducationList from 'modules/education/education-list';
import ExperienceList from 'modules/experience/experience-list';
import OrganizationList from 'modules/organization/organization-list';
import ThesisList from 'modules/thesis/thesis-list';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function UserView() {
  const { query } = useRouter();
  const id = query.id as string;

  const queryUser = useGetUser({ params: { id } });

  return (
    <LoaderView query={queryUser}>
      {({ data }) => {
        const user = data;

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

        const descriptionComponent = !!user?.deskripsi && (
          <Flex direction="column">
            <Text textVariant="body2Semibold">Deskripsi: </Text>
            <Text textVariant="body2Regular">{user.deskripsi}</Text>
          </Flex>
        );
        return (
          <Flex
            mih="100vh"
            w="100%"
            maw={768}
            direction="column"
            gap={16}
            p={24}
          >
            <Card withBorder>
              <Flex direction="column" mb={16} align="center" justify="center">
                <Text textVariant="h1" mb={8}>
                  Informasi Pengguna
                </Text>
                <Image
                  width={128}
                  height={128}
                  src={user.photoUrl}
                  alt={nameLabel}
                  style={{
                    border: `1px solid ${colors.borderOverlay}`,
                    objectPosition: 'top',
                    objectFit: 'cover',
                  }}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = '/icon512_rounded.png';
                  }}
                />
                <Text textVariant="body1Semibold">{nameLabel}</Text>
                <Text textVariant="body2Regular">{studyProgramLabel}</Text>
              </Flex>

              {descriptionComponent}
            </Card>
            <ExperienceList user={user} />
            <EducationList user={user} />
            <CertificationList user={user} />
            <OrganizationList user={user} />
            <ThesisList user={user} />
          </Flex>
        );
      }}
    </LoaderView>
  );
}
