import { StudyProgramModel } from 'api-hooks/study-program/model';
import notification from 'common/helpers/notification';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import FormAction from 'modules/admin/components/form-action';
import FormLabel from 'modules/admin/components/form-label';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  StudyProgramFormSchema,
  StudyProgramFormType,
} from './study-program-form-type';

interface AdminStudyProgramFormProps {
  studyProgram?: StudyProgramModel;
  onSubmit: (
    values: StudyProgramFormType,
  ) => Promise<StudyProgramModel | undefined>;
}

export default function AdminStudyProgramForm(
  props: AdminStudyProgramFormProps,
) {
  const { studyProgram } = props;
  const defaultValues = React.useMemo<StudyProgramFormType>(() => {
    return {
      kode_program_studi: studyProgram?.kode || '',
      nama_program_studi: studyProgram?.nama || '',
      data: studyProgram,
    };
  }, [studyProgram]);
  const resolver = useYupValidationResolver(StudyProgramFormSchema());
  const methods = useForm({
    resolver,
    defaultValues,
  });

  const onSubmit = React.useCallback(
    async (values: StudyProgramFormType) => {
      try {
        await props.onSubmit(values);
      } catch (e) {
        notification.error({ message: e.message });
      }
    },
    [props],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!studyProgram}>
      <FormLabel />
      <Input
        type="text"
        name="kode_program_studi"
        label="Kode Program Studi"
        placeholder="Masukkan Kode Program Studi"
      />
      <Input
        type="text"
        name="nama_program_studi"
        label="Nama Program Studi"
        placeholder="Masukkan Nama Program Studi"
      />
      <FormAction isEdit={!!studyProgram} />
    </Form>
  );
}
