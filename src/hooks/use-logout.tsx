import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import { clearToken } from 'common/repositories/token';
import { NavigationRoute } from 'common/routes/routes';
import { useRouter } from 'next/router';
import React from 'react';

import useDialog from './use-dialog';

export default function useLogout() {
  const { replace } = useRouter();
  const onLogout = React.useCallback(() => {
    notification.success({
      message: 'Anda berhasil logout',
    });
    clearToken();
    replace(NavigationRoute.Login);
    queryClient.invalidateQueries();
    queryClient.clear();
  }, [replace]);

  const { Dialog, open, close } = useDialog({
    type: 'confirmation',
    title: 'Logout',
    content: 'Apakah anda yakin ingin keluar?',
    cancelButtonProps: {
      children: 'Tidak',
      onClick({ event, onClose }) {
        onClose();
      },
    },
    confirmationButtonProps: {
      children: 'Yakin',
      variant: {
        variant: 'primaryError',
      },
      onClick({ event, onClose }) {
        onLogout();
        onClose();
      },
    },
  });

  return {
    LogoutDialog: Dialog,
    openLogoutDialog: open,
    closeLogoutDialog: close,
    onLogout,
  };
}
