import { Card, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus } from '@phosphor-icons/react';
import { ProfileModel } from 'api-hooks/common/model';
import { EducationLiteModel } from 'api-hooks/education/model';
import {
  useCreateEducation,
  useUpdateEducation,
} from 'api-hooks/education/mutation';
import { educationKey, useGetEducations } from 'api-hooks/education/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import colors from 'common/styles/colors';
import ActionButton from 'components/action-button';
import Text from 'components/elements/text';
import LoaderView from 'components/loader-view';
import DeleteButton from 'modules/components/delete-button';
import { useRouter } from 'next/router';
import React from 'react';

import { EducationCard } from './education-card';
import EducationForm from './education-form';

interface EducationListProps {
  user: ProfileModel;
  isEditable?: boolean;
}

export default function EducationList(props: EducationListProps) {
  const { isEditable } = props;
  // const { user } = props;
  const [education, setEducation] = React.useState<
    EducationLiteModel | undefined
  >(undefined);

  const { pathname } = useRouter();
  const isAdmin = pathname.includes('admin');
  const [isOpened, { open, close }] = useDisclosure();

  const createComponent = (isAdmin || isEditable) && (
    <ActionButton
      pos="absolute"
      top={16}
      right={16}
      type="icon"
      children={<Plus size={16} />}
      onClick={() => {
        setEducation(undefined);
        open();
      }}
    />
  );

  const updateMutation = useUpdateEducation();
  const createMutation = useCreateEducation();
  const queryEducations = useGetEducations({
    params: { nomor_identitas: props.user.nomorIdentitas },
    options: { staleTime: Infinity, cacheTime: Infinity },
  });

  return (
    <Card withBorder pos="relative">
      <Text textVariant="h1">Pendidikan</Text>
      {createComponent}
      <LoaderView query={queryEducations}>
        {({ data }) => {
          const educations = data;
          return (
            <Flex direction="column" gap={8}>
              {educations.length === 0 && <Text mt={16}>Tidak ada data</Text>}
              {educations.map((education, index) => {
                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setEducation(education);
                      open();
                    }}
                    style={{
                      position: 'relative',
                      paddingTop: 16,
                      paddingBottom: 16,
                      borderBottom:
                        index === educations.length - 1
                          ? undefined
                          : `1px solid ${colors.borderPrimary}`,
                      cursor: 'pointer',
                    }}
                  >
                    {(isAdmin || isEditable) && (
                      <DeleteButton
                        isUser
                        type="icon"
                        deleteable={{
                          dataType: '/educations',
                          data: education,
                        }}
                      />
                    )}
                    <EducationCard key={education.id} {...education} />
                  </div>
                );
              })}
            </Flex>
          );
        }}
      </LoaderView>
      {(isAdmin || isEditable) && (
        <Drawer
          position="right"
          size="lg"
          onClose={close}
          opened={isOpened}
          title={
            <Text textVariant="h2">
              {education ? 'Detail Pendidikan' : 'Buat Pendidikan'}
            </Text>
          }
        >
          <EducationForm
            user={props.user}
            education={education}
            onSubmit={async (values, lampiran) => {
              const result = education
                ? await updateMutation.mutateAsync({
                    data: { ...values, lampiran },
                    id: education.id,
                  })
                : await createMutation.mutateAsync({ ...values, lampiran });
              queryClient.refetchQueries({
                queryKey: educationKey.list({
                  nomor_identitas: result.data.nomorIdentitasUser,
                }),
              });
              notification.success({
                message: result.message,
              });
              close();
              return result.data;
            }}
          />
        </Drawer>
      )}
    </Card>
  );
}
