import { SimpleGrid } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { uploadAttachmentFiles } from 'api/storage';
import {
  CertificationLiteModel,
  CertificationModel,
} from 'api-hooks/certification/model';
import { ProfileModel } from 'api-hooks/common/model';
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
  CertificationFormSchema,
  CertificationFormType,
} from './certification-form-type';

interface CertificationFormProps {
  user: ProfileModel;
  certification?: CertificationLiteModel;
  onSubmit: (
    value: CertificationFormType,
    files: string[],
  ) => Promise<CertificationModel | undefined>;
}

export default function CertificationForm(props: CertificationFormProps) {
  const { certification } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<CertificationFormType>(() => {
    return {
      nomor_identitas_user:
        certification?.nomorIdentitasUser ?? props.user.nomorIdentitas,
      deskripsi: certification?.deskripsi ?? '',
      nama_institusi: certification?.namaInstitusi ?? '',
      nama_sertifikasi: certification?.namaSertifikasi ?? '',
      nilai_akhir: certification?.nilaiAkhir ?? '',
      skills: certification?.skills?.split('|').filter(Boolean) ?? [],
      waktu_kadaluarsa: certification?.tanggalKadaluarsa ?? null,
      waktu_terbit: certification?.tanggalTerbit || null,
      data: certification,
    };
  }, [certification, props.user.nomorIdentitas]);

  const resolver = useYupValidationResolver(CertificationFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  const oldAttachments = (certification?.lampiranSertifikasi || []).map(
    (item) => item.fileUrl,
  );

  const onSubmit = React.useCallback(
    async (values: CertificationFormType) => {
      try {
        const { results, onDeleteFiles } = await uploadAttachmentFiles(
          'lampiran_sertifikasi',
          values.nomor_identitas_user,
          files,
          oldAttachments,
        );
        await props.onSubmit(values, results);
        await onDeleteFiles;
      } catch (e) {
        notification.error({
          message: e.message,
        });
      }
    },
    [files, oldAttachments, props],
  );

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      defaultEditable={!certification}
    >
      <Input
        type="text"
        name="nama_sertifikasi"
        label="Nama Sertifikasi"
        placeholder="Masukan Nama Sertifikasi"
      />
      <Input
        type="text"
        name="nama_institusi"
        label="Nama Institusi"
        placeholder="Masukan Nama Institusi"
      />
      <SimpleGrid cols={2}>
        <Input
          type="date"
          name="waktu_terbit"
          label="Waktu Terbit"
          placeholder="Masukkan Waktu Terbit"
        />
        <Input
          type="date"
          name="waktu_kadaluarsa"
          label="Waktu Kadaluarsa"
          placeholder="Masukkan Waktu Kadaluarsa"
        />
      </SimpleGrid>
      <Input
        type="text"
        name="nilai_akhir"
        label="Nilai Akhir"
        placeholder="Masukan Nilai Akhir"
      />
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
        defaultUrls={certification?.lampiranSertifikasi?.map(
          (item) => item.fileUrl,
        )}
      />
      <Separator gap={16} />
      <FormAction isEdit={!!certification} />
    </Form>
  );
}
