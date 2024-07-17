import { FileWithPath } from '@mantine/dropzone';
import { uploadPhotoProfile } from 'api/storage';
import { AdminModel } from 'api-hooks/admin/model';
import notification from 'common/helpers/notification';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import PhotoProfileInput from 'components/photo-profile-input';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import FormAction from 'modules/admin/components/form-action';
import FormLabel from 'modules/admin/components/form-label';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  EmployeeFormSchema,
  EmployeeFormType,
  EmployeeStatusEnum,
} from './employee-form-type';

interface EmployeeFormProps {
  employee?: AdminModel;
  onSubmit: (values: EmployeeFormType) => Promise<AdminModel | undefined>;
}

export default function EmployeeForm(props: EmployeeFormProps) {
  const { employee } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<EmployeeFormType>(() => {
    return {
      nama_depan: employee?.namaDepan || '',
      nama_tengah: employee?.namaTengah || '',
      nama_belakang: employee?.namaBelakang || '',
      deskripsi: employee?.deskripsi || '',
      password: '',
      status: employee?.status || EmployeeStatusEnum.active,
      data: employee,
    };
  }, [employee]);

  const resolver = useYupValidationResolver(EmployeeFormSchema());

  const methods = useForm({
    defaultValues,
    resolver,
  });

  const onSubmit = React.useCallback(
    async (values: EmployeeFormType) => {
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
    <Form methods={methods} onSubmit={onSubmit} defaultEditable={!employee}>
      <FormLabel />
      <PhotoProfileInput
        label="Foto Profil"
        defaultImage={employee?.photoUrl}
        files={files}
        onDrop={setFiles}
      />
      <Separator gap={16} />
      <Input
        type="text"
        name="nama_depan"
        label="Nama Depan"
        placeholder="Masukkan Nama Depan"
      />
      <Input
        type="text"
        name="nama_tengah"
        label="Nama Tengah"
        placeholder="Masukkan Nama Tengah"
      />
      <Input
        type="text"
        name="nama_belakang"
        label="Nama Belakang"
        placeholder="Masukkan Nama Belakang"
      />
      {!props.employee && (
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Masukkan Password"
          required
          withAsterisk={false}
        />
      )}
      <Input
        type="textarea"
        name="deskripsi"
        label="Deskripsi"
        placeholder="Masukkan Deskripsi"
      />
      <FormAction isEdit={!!employee} />
    </Form>
  );
}
