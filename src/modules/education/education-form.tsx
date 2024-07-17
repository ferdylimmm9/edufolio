import { SimpleGrid } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { uploadAttachmentFiles } from 'api/storage';
import { ProfileModel } from 'api-hooks/common/model';
import { EducationLiteModel, EducationModel } from 'api-hooks/education/model';
import notification from 'common/helpers/notification';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import { FileInput } from 'components/files-input';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import FormAction from 'modules/admin/components/form-action';
import React from 'react';
import { useForm } from 'react-hook-form';

import { EducationFormSchema, EducationFormType } from './education-form-type';

interface EducationFormProps {
  user: ProfileModel;
  education?: EducationLiteModel;
  onSubmit: (
    value: EducationFormType,
    files: string[],
  ) => Promise<EducationModel | undefined>;
}

export default function EducationForm(props: EducationFormProps) {
  const { education } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<EducationFormType>(() => {
    return {
      deskripsi: education?.deskripsi ?? '',
      nama_institusi: education?.namaInstitusi ?? '',
      nomor_identitas_user:
        education?.nomorIdentitasUser ?? props.user.nomorIdentitas,
      skills: education?.skills?.split('|').filter(Boolean) ?? [],
      waktu_mulai: education?.tanggalMulai ?? null,
      waktu_selesai: education?.tanggalSelesai ?? null,
      bidang_studi: education?.bidangStudi ?? '',
      gelar: education?.gelar ?? '',
      nilai_akhir: education?.nilaiAkhir ?? '',
      data: education,
    };
  }, [education, props.user.nomorIdentitas]);

  const resolver = useYupValidationResolver(EducationFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  const oldAttachments = (education?.lampiranPendidikan || []).map(
    (item) => item.fileUrl,
  );
  const onSubmit = React.useCallback(
    async (values: EducationFormType) => {
      try {
        const { results, onDeleteFiles } = await uploadAttachmentFiles(
          'lampiran_pendidikan',
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
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!education}>
      <Input
        type="text"
        name="nama_institusi"
        label="Nama Institusi"
        placeholder="Masukkan Nama Institusi"
      />
      <Input
        type="text"
        name="bidang_studi"
        label="Bidang Studi"
        placeholder="Masukkan Bidang Studi"
      />
      <Input
        type="text"
        name="gelar"
        label="Gelar"
        placeholder="Masukkan Gelar"
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
        type="text"
        name="nilai_akhir"
        label="Nilai Akhir"
        placeholder="Masukkan Nilai Akhir"
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
        defaultUrls={education?.lampiranPendidikan?.map((item) => item.fileUrl)}
      />
      <Separator gap={16} />
      <FormAction isEdit={!!education} />
    </Form>
  );
}
