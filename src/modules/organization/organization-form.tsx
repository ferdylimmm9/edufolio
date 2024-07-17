import { SimpleGrid } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { uploadAttachmentFiles } from 'api/storage';
import { ProfileModel } from 'api-hooks/common/model';
import {
  OrganizationLiteModel,
  OrganizationModel,
} from 'api-hooks/organization/model';
import notification from 'common/helpers/notification';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import { FileInput } from 'components/files-input';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import FormAction from 'modules/admin/components/form-action';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  OrganizationFormSchema,
  OrganizationFormType,
} from './organization-form-type';

interface OrganizationFormProps {
  user: ProfileModel;
  organization?: OrganizationLiteModel;
  onSubmit: (
    value: OrganizationFormType,
    files: string[],
  ) => Promise<OrganizationModel | undefined>;
}

export default function OrganizationForm(props: OrganizationFormProps) {
  const { organization } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<OrganizationFormType>(() => {
    return {
      deskripsi: organization?.deskripsi ?? '',
      nama_organisasi: organization?.nama ?? '',
      nomor_identitas_user:
        organization?.nomorIdentitasUser ?? props.user.nomorIdentitas,
      pengalaman_id: organization?.pengalaman?.id || '',
      skills: organization?.skills?.split('|').filter(Boolean) ?? [],
      waktu_mulai: organization?.tanggalMulai ?? null,
      waktu_selesai: organization?.tanggalSelesai ?? null,
      posisi: organization?.posisi ?? '',
      data: organization,
    };
  }, [organization, props.user.nomorIdentitas]);

  const resolver = useYupValidationResolver(OrganizationFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  const oldAttachments = (organization?.lampiranOrganisasi || []).map(
    (item) => item.fileUrl,
  );
  const onSubmit = React.useCallback(
    async (values: OrganizationFormType) => {
      try {
        const { results, onDeleteFiles } = await uploadAttachmentFiles(
          'lampiran_organisasi',
          values.nomor_identitas_user,
          files,
          oldAttachments,
        );
        await props.onSubmit(values, results);
        await onDeleteFiles();
      } catch (e) {
        notification.error({
          message: e.message,
        });
      }
    },
    [files, oldAttachments, props],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!organization}>
      <Input
        type="text"
        name="posisi"
        label="Posisi"
        placeholder="Masukkan Posisi"
      />
      <Input
        type="text"
        name="nama_organisasi"
        label="Nama Organisasi"
        placeholder="Masukkan Nama Organisasi"
      />
      <SimpleGrid cols={2}>
        <Input
          type="date"
          name="waktu_mulai"
          label="Waktu Mulai"
          placeholder="Masukkan Waktu Mulai"
        />
        <Input
          type="date"
          name="waktu_selesai"
          label="Waktu Selesai"
          placeholder="Masukkan Waktu Selesai"
        />
      </SimpleGrid>
      <Input
        type="textarea"
        name="deskripsi"
        label="Deskripsi"
        placeholder="Masukkan Deskripsi"
      />
      <Input type="tags" name="skills" label="Skills" />
      <FileInput
        files={files}
        onDrop={setFiles}
        label="Files"
        defaultUrls={organization?.lampiranOrganisasi?.map(
          (item) => item.fileUrl,
        )}
      />
      <Separator gap={16} />
      <FormAction isEdit={!!organization} />
    </Form>
  );
}
