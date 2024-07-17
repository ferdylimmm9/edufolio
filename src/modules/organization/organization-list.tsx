import { Card, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Plus } from '@phosphor-icons/react';
import { ProfileModel } from 'api-hooks/common/model';
import { OrganizationLiteModel } from 'api-hooks/organization/model';
import {
  useCreateOrganization,
  useUpdateOrganization,
} from 'api-hooks/organization/mutation';
import {
  organizationKey,
  useGetOrganizations,
} from 'api-hooks/organization/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import colors from 'common/styles/colors';
import ActionButton from 'components/action-button';
import Text from 'components/elements/text';
import LoaderView from 'components/loader-view';
import DeleteButton from 'modules/components/delete-button';
import { useRouter } from 'next/router';
import React from 'react';

import { OrganizationCard } from './organization-card';
import OrganizationForm from './organization-form';

interface OrganizationListProps {
  user: ProfileModel;

  isEditable?: boolean;
}

export default function OrganizationList(props: OrganizationListProps) {
  // const { user } = props;
  const { isEditable } = props;
  const [organization, setOrganization] = React.useState<
    OrganizationLiteModel | undefined
  >(undefined);
  const { pathname } = useRouter();
  const isAdmin = pathname.includes('admin');

  const [isOpened, { open, close }] = useDisclosure();

  const createComponent = (isEditable || isAdmin) && (
    <ActionButton
      pos="absolute"
      top={16}
      right={16}
      type="icon"
      children={<Plus size={16} />}
      onClick={() => {
        setOrganization(undefined);
        open();
      }}
    />
  );

  const updateMutation = useUpdateOrganization();
  const createMutation = useCreateOrganization();
  const queryOrganizations = useGetOrganizations({
    params: { nomor_identitas: props.user.nomorIdentitas },
    options: { staleTime: Infinity, cacheTime: Infinity },
  });

  return (
    <Card withBorder pos="relative">
      <Text textVariant="h1">Organisasi</Text>
      {createComponent}
      <LoaderView query={queryOrganizations}>
        {({ data }) => {
          const organizations = data;
          return (
            <Flex direction="column" gap={8}>
              {organizations.length === 0 && (
                <Text mt={16}>Tidak ada data</Text>
              )}

              {organizations.map((organization, index) => {
                return (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setOrganization(organization);
                      open();
                    }}
                    style={{
                      position: 'relative',
                      paddingTop: 16,
                      paddingBottom: 16,
                      borderBottom:
                        index === organizations.length - 1
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
                          dataType: '/organizations',
                          data: organization,
                        }}
                      />
                    )}
                    <OrganizationCard key={organization.id} {...organization} />
                  </div>
                );
              })}
            </Flex>
          );
        }}
      </LoaderView>
      {(isEditable || isAdmin) && (
        <Drawer
          position="right"
          size="lg"
          onClose={close}
          opened={isOpened}
          title={
            <Text textVariant="h2">
              {organization ? 'Detail Organisasi' : 'Buat Organisasi'}
            </Text>
          }
        >
          <OrganizationForm
            user={props.user}
            organization={organization}
            onSubmit={async (values, lampiran) => {
              const result = organization
                ? await updateMutation.mutateAsync({
                    data: { ...values, lampiran },
                    id: organization.id,
                  })
                : await createMutation.mutateAsync({ ...values, lampiran });

              queryClient.refetchQueries({
                queryKey: organizationKey.list({
                  nomor_identitas: result.data.nomorIdentitasUser,
                }),
              });

              notification.success({
                message: result.message,
              });

              close();
              return undefined;
            }}
          />
        </Drawer>
      )}
    </Card>
  );
}
