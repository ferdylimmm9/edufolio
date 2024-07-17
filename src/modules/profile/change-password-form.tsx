import { useChangePassword } from 'api-hooks/auth/mutation';
import { meKey } from 'api-hooks/auth/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import React from 'react';
import { useForm } from 'react-hook-form';

import {
  ChangePasswordFormSchema,
  ChangePasswordFormType,
} from './profile-form-type';

interface ChangePasswordFormProps {
  onClose: () => void;
}

export default function ChangePasswordForm(props: ChangePasswordFormProps) {
  const defaultValues = React.useMemo<ChangePasswordFormType>(() => {
    return {
      currentPassword: '',
      currentPasswordConfirmation: '',
      oldPassword: '',
    };
  }, []);
  const resolver = useYupValidationResolver(ChangePasswordFormSchema());

  const methods = useForm({ defaultValues, resolver });

  const { mutateAsync } = useChangePassword();

  const onSubmit = React.useCallback(
    async (values: ChangePasswordFormType) => {
      try {
        const result = await mutateAsync(values);
        notification.success({
          message: result.message,
        });
        queryClient.refetchQueries({
          queryKey: meKey.me,
        });
        props.onClose();
      } catch (e) {
        notification.error({
          message: e.message,
        });
      }
    },
    [mutateAsync, props],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Input
        type="password"
        name="oldPassword"
        label="Password Lama"
        placeholder="Masukkan Password Lama"
      />
      <Input
        type="password"
        name="currentPassword"
        label="Password Baru"
        placeholder="Masukkan Password Baru"
      />
      <Input
        type="password"
        name="currentPasswordConfirmation"
        label="Konfirmasi Password Baru"
        placeholder="Masukkan Konfirmasi Password Baru"
      />
      <Input type="submit" text="Simpan" />
    </Form>
  );
}
