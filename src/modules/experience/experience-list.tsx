import { Card, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus } from '@phosphor-icons/react';
import { ProfileModel } from 'api-hooks/common/model';
import { ExperienceLiteModel } from 'api-hooks/experience/model';
import {
  useCreateExperience,
  useUpdateExperience,
} from 'api-hooks/experience/mutation';
import { experienceKey, useGetExperiences } from 'api-hooks/experience/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import colors from 'common/styles/colors';
import ActionButton from 'components/action-button';
import Text from 'components/elements/text';
import LoaderView from 'components/loader-view';
import DeleteButton from 'modules/components/delete-button';
import { useRouter } from 'next/router';
import React from 'react';

import { ExperienceCard } from './experience-card';
import ExperienceForm from './experience-form';

interface ExperienceListProps {
  user: ProfileModel;
  isEditable?: boolean;
}

export default function ExperienceList(props: ExperienceListProps) {
  const { isEditable } = props;
  const { pathname } = useRouter();
  const isAdmin = pathname.includes('admin');

  const [experience, setExperience] = React.useState<
    ExperienceLiteModel | undefined
  >(undefined);
  const [isOpened, { open, close }] = useDisclosure();

  const createComponent = (isAdmin || isEditable) && (
    <ActionButton
      pos="absolute"
      top={16}
      right={16}
      type="icon"
      children={<Plus size={16} />}
      onClick={() => {
        setExperience(undefined);
        open();
      }}
    />
  );

  const updateMutation = useUpdateExperience();
  const createMutation = useCreateExperience();
  const queryExperiences = useGetExperiences({
    params: { nomor_identitas: props.user.nomorIdentitas },
    options: { staleTime: Infinity, cacheTime: Infinity },
  });
  return (
    <Card withBorder pos="relative">
      <Text textVariant="h1">Pengalaman</Text>
      {createComponent}
      <LoaderView query={queryExperiences}>
        {({ data }) => {
          const experiences = data;
          return (
            <Flex direction="column" gap={8}>
              {experiences.length === 0 && <Text mt={16}>Tidak ada data</Text>}
              {experiences.map((experience, index) => {
                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setExperience(experience);
                      open();
                    }}
                    style={{
                      position: 'relative',
                      paddingTop: 16,
                      paddingBottom: 16,
                      borderBottom:
                        index === experiences.length - 1
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
                          dataType: '/experiences',
                          data: experience,
                        }}
                      />
                    )}
                    <ExperienceCard key={experience.id} {...experience} />
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
              {experience ? 'Detail Pengalaman' : 'Buat Pengalaman'}
            </Text>
          }
        >
          <ExperienceForm
            user={props.user}
            experience={experience}
            onSubmit={async (values, lampiran) => {
              const result = experience
                ? await updateMutation.mutateAsync({
                    data: { ...values, lampiran },
                    id: experience.id,
                  })
                : await createMutation.mutateAsync({ ...values, lampiran });
              queryClient.refetchQueries({
                queryKey: experienceKey.list({
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
