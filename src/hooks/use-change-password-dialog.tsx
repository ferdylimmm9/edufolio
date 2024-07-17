import { modals } from '@mantine/modals';
import Text from 'components/elements/text';
import ChangePasswordForm from 'modules/profile/change-password-form';

export default function useChangePasswordDialog() {
  const onChangePasswordClick = () =>
    modals.open({
      modalId: 'change-password',
      title: <Text textVariant="h1">Ganti Password</Text>,
      children: (
        <ChangePasswordForm onClose={() => modals.close('change-password')} />
      ),
    });

  return onChangePasswordClick;
}
