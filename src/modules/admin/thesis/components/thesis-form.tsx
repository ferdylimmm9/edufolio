import { FileWithPath } from '@mantine/dropzone';
import { uploadAttachmentFiles } from 'api/storage';
import { ThesisModel } from 'api-hooks/thesis/model';
import notification from 'common/helpers/notification';
import Separator from 'components/common/separator';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import FormAction from 'modules/admin/components/form-action';
import FormLabel from 'modules/admin/components/form-label';
import React from 'react';
import { useForm } from 'react-hook-form';

import ThesisFormInformation from './thesis-form-information';
import {
  ThesisFormSchema,
  ThesisFormType,
  ThesisStatusEnum,
} from './thesis-form-type';

interface ThesisFormProps {
  thesis?: ThesisModel;
  onSubmit: (
    value: ThesisFormType,
    files: string[],
  ) => Promise<ThesisModel | undefined>;
}

export default function ThesisForm(props: ThesisFormProps) {
  const { thesis } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);
  const defaultValues = React.useMemo<ThesisFormType>(() => {
    return {
      abstrak: thesis?.abstrak ?? '',
      judul_tugas_akhir: thesis?.judulTugasAkhir ?? '',
      nomor_identitas_user: thesis?.user?.nomorIdentitas ?? '',
      nomor_identitas_pic: '',
      status: thesis?.status ?? ThesisStatusEnum.pending,
      waktu_terbit: thesis?.tanggalTerbit ?? null,
      data: thesis,
    };
  }, [thesis]);
  const resolver = useYupValidationResolver(ThesisFormSchema());
  const methods = useForm({
    resolver,
    defaultValues,
  });

  const oldAttachments = (thesis?.lampiranTugasAkhir || []).map(
    (item) => item.fileUrl,
  );

  const onSubmit = React.useCallback(
    async (values: ThesisFormType) => {
      try {
        const { results, onDeleteFiles } = await uploadAttachmentFiles(
          'lampiran_thesis',
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
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!thesis}>
      <FormLabel />
      <ThesisFormInformation files={files} setFiles={setFiles} />
      <Separator gap={16} />
      <FormAction isEdit={!!thesis} />
    </Form>
  );
}
