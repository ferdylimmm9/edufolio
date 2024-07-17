import { Flex, Tabs } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { uploadPhotoProfile } from 'api/storage';
import { MeModel } from 'api-hooks/auth/model';
import { UserModel } from 'api-hooks/user/model';
import notification from 'common/helpers/notification';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import FormAction from 'modules/admin/components/form-action';
import FormLabel from 'modules/admin/components/form-label';
import CertificationList from 'modules/certification/certification-list';
import EducationList from 'modules/education/education-list';
import ExperienceList from 'modules/experience/experience-list';
import OrganizationList from 'modules/organization/organization-list';
import React from 'react';
import { useForm } from 'react-hook-form';

import { UserFormSchema, UserFormType } from './user-form-type';
import UserInformationForm from './user-information-form';

interface AdminUserFormProps {
  user?: UserModel | MeModel;
  onSubmit: (values: UserFormType) => Promise<UserModel | undefined>;
}

export default function AdminUserForm(props: AdminUserFormProps) {
  const { user } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<UserFormType>(() => {
    return {
      nomor_identitas: user?.nomorIdentitas || '',
      deskripsi: user?.deskripsi ?? '',
      nama_belakang: user?.namaBelakang ?? '',
      nama_depan: user?.namaDepan ?? '',
      nama_tengah: user?.namaTengah ?? '',
      program_studi_id: user?.programStudi?.id ?? '',
      data: user,
    };
  }, [user]);
  const resolver = useYupValidationResolver(UserFormSchema());
  const methods = useForm({
    resolver,
    defaultValues,
  });

  const [tab, setTab] = React.useState('information');

  const onSubmit = React.useCallback(
    async (values: UserFormType) => {
      try {
        const result = await props.onSubmit(values);
        const file = files[0];
        file && (await uploadPhotoProfile(result.nomorIdentitas, file));
      } catch (e) {
        notification.error({
          message: e.message,
        });
      }
    },
    [files, props],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!user}>
      <FormLabel />
      {user && (
        <Tabs value={tab} onChange={(value) => setTab(value)} mb={16}>
          <Tabs.List>
            <Tabs.Tab value="information">Informasi</Tabs.Tab>
            <Tabs.Tab value="details">Detail</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      )}
      {tab === 'information' && (
        <>
          <UserInformationForm files={files} setFiles={setFiles} />
          <FormAction isEdit={!!user} />
        </>
      )}
      {tab === 'details' && (
        <Flex direction="column" gap={16}>
          <ExperienceList user={user} isEditable />
          <EducationList user={user} isEditable />
          <CertificationList user={user} isEditable />
          <OrganizationList user={user} isEditable />
        </Flex>
      )}
    </Form>
  );
}
