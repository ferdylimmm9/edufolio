import { SimpleGrid } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { uploadAttachmentFiles } from 'api/storage';
import { ProfileModel } from 'api-hooks/common/model';
import {
  ExperienceLiteModel,
  ExperienceModel,
} from 'api-hooks/experience/model';
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
  ExperienceFormSchema,
  ExperienceFormType,
} from './experience-form-type';

interface ExperienceFormProps {
  user: ProfileModel;
  experience?: ExperienceLiteModel;
  onSubmit: (
    value: ExperienceFormType,
    files: string[],
  ) => Promise<ExperienceModel | undefined>;
}

export default function ExperienceForm(props: ExperienceFormProps) {
  const { experience } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);
  const defaultValues = React.useMemo<ExperienceFormType>(() => {
    return {
      deskripsi: experience?.deskripsi ?? '',
      lokasi: experience?.lokasi ?? '',
      nama_perusahaan: experience?.namaPerusahaan ?? '',
      nomor_identitas_user:
        experience?.nomorIdentitasUser ?? props.user.nomorIdentitas,
      posisi: experience?.posisi ?? '',
      skills: experience?.skills?.split('|').filter(Boolean) ?? [],
      waktu_mulai: experience?.tanggalMulai ?? null,
      waktu_selesai: experience?.tanggalSelesai ?? null,
      data: experience,
    };
  }, [experience, props.user.nomorIdentitas]);
  const resolver = useYupValidationResolver(ExperienceFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  const oldAttachments = (experience?.lampiranPengalaman || []).map(
    (item) => item.fileUrl,
  );

  const onSubmit = React.useCallback(
    async (values: ExperienceFormType) => {
      try {
        const { results, onDeleteFiles } = await uploadAttachmentFiles(
          'lampiran_pengalaman',
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
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!experience}>
      <Input
        type="text"
        name="posisi"
        label="Posisi"
        placeholder="Masukkan Posisi"
      />
      <Input
        type="text"
        name="nama_perusahaan"
        label="Nama Perusahaan"
        placeholder="Masukkan Nama Perusahaan"
      />
      <Input
        type="text"
        name="lokasi"
        label="Lokasi"
        placeholder="Masukkan Lokasi"
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
        defaultUrls={experience?.lampiranPengalaman?.map(
          (item) => item.fileUrl,
        )}
      />
      <Separator gap={16} />
      <FormAction isEdit={!!experience} />
    </Form>
  );
}
