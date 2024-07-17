import { FileWithPath } from '@mantine/dropzone';
import { uploadPhotoProfile } from 'api/storage';
import { MeModel } from 'api-hooks/auth/model';
import { useProfile } from 'api-hooks/auth/mutation';
import { meKey } from 'api-hooks/auth/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import Separator from 'components/common/separator';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import FormAction from 'modules/admin/components/form-action';
import {
  UserFormSchema,
  UserFormType,
} from 'modules/admin/users/components/user-form-type';
import UserInformationForm from 'modules/admin/users/components/user-information-form';
import React from 'react';
import { useForm } from 'react-hook-form';

interface ProfileFormProps {
  user: MeModel;
  onClose: () => void;
}

export default function ProfileForm(props: ProfileFormProps) {
  const { user } = props;
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const defaultValues = React.useMemo<UserFormType>(() => {
    return {
      deskripsi: user?.deskripsi ?? '',
      nama_belakang: user?.namaBelakang ?? '',
      nama_depan: user?.namaDepan ?? '',
      nama_tengah: user?.namaTengah ?? '',
      nomor_identitas: user.nomorIdentitas || '',
      program_studi_id: user?.programStudiId ?? '',
      data: user,
    };
  }, [user]);
  const resolver = useYupValidationResolver(UserFormSchema());
  const methods = useForm({
    resolver,
    defaultValues,
  });
  const { mutateAsync } = useProfile();
  const onSubmit = React.useCallback(
    async (values: UserFormType) => {
      try {
        const file = files[0];
        file && (await uploadPhotoProfile(user.nomorIdentitas, file));
        const result = await mutateAsync(values);
        notification.success({
          message: result.message,
        });
        queryClient.refetchQueries({
          queryKey: meKey.me,
        });
        props.onClose();
      } catch (e) {
        notification.error({ message: e.message });
      }
    },
    [files, mutateAsync, props, user.nomorIdentitas],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <UserInformationForm files={files} setFiles={setFiles} />
      <Separator gap={16} />
      <FormAction />
    </Form>
  );
}
