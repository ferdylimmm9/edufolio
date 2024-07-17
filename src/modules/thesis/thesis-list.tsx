import { Card, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus } from '@phosphor-icons/react';
import { ProfileModel } from 'api-hooks/common/model';
import { ThesisLiteModel } from 'api-hooks/thesis/model';
import { useCreateThesis, useUpdateThesis } from 'api-hooks/thesis/mutation';
import { thesisKey, useGetThesisList } from 'api-hooks/thesis/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import colors from 'common/styles/colors';
import ActionButton from 'components/action-button';
import Text from 'components/elements/text';
import LoaderView from 'components/loader-view';
import DeleteButton from 'modules/components/delete-button';
import { useRouter } from 'next/router';
import React from 'react';

import { ThesisCard } from './thesis-card';
import ThesisForm from './thesis-form';

interface ThesisListProps {
  user: ProfileModel;

  isEditable?: boolean;
}

export default function ThesisList(props: ThesisListProps) {
  const { isEditable } = props;
  const [_thesis, setThesis] = React.useState<ThesisLiteModel | undefined>(
    undefined,
  );
  const { pathname } = useRouter();
  const isAdmin = pathname.includes('admin');
  const [isOpened, { open, close }] = useDisclosure();

  const updateMutation = useUpdateThesis();
  const createMutation = useCreateThesis();
  const queryThesisList = useGetThesisList({
    params: { nomor_identitas: props.user.nomorIdentitas },
    options: { staleTime: Infinity, cacheTime: Infinity },
  });

  const createComponent = (isAdmin || isEditable) && (
    <ActionButton
      pos="absolute"
      top={16}
      right={16}
      type="icon"
      children={<Plus size={16} />}
      onClick={() => {
        setThesis(undefined);
        open();
      }}
    />
  );

  return (
    <Card withBorder pos="relative">
      <Text textVariant="h1">Karya Ilmiah</Text>
      {createComponent}
      <LoaderView query={queryThesisList}>
        {({ data }) => {
          const thesis = data;
          return (
            <Flex direction="column" gap={8}>
              {thesis.length === 0 && <Text mt={16}>Tidak ada data</Text>}
              {thesis.map((_thesis, index) => {
                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setThesis(_thesis);
                      open();
                    }}
                    style={{
                      position: 'relative',
                      paddingTop: 16,
                      paddingBottom: 16,
                      borderBottom:
                        index === thesis.length - 1
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
                          data: _thesis,
                          dataType: '/thesis',
                        }}
                      />
                    )}
                    <ThesisCard key={_thesis.id} {..._thesis} />
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
              {_thesis ? 'Detail Karya Ilmiah' : 'Buat Karya Ilmiah'}
            </Text>
          }
        >
          <ThesisForm
            user={props.user}
            thesis={_thesis}
            onSubmit={async (values, lampiran) => {
              const result = _thesis
                ? await updateMutation.mutateAsync({
                    data: { ...values, lampiran },
                    id: _thesis.id,
                  })
                : await createMutation.mutateAsync({ ...values, lampiran });
              queryClient.refetchQueries({
                queryKey: thesisKey.list({
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
