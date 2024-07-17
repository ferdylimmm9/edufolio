import { useCreateUser } from 'api-hooks/user/mutation';
import { userKey } from 'api-hooks/user/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import { NavigationRoute } from 'common/routes/routes';
import { useRouter } from 'next/router';

import AdminUserForm from './components/user-form';

export default function AdminUserCreate() {
  const { replace } = useRouter();
  const { mutateAsync } = useCreateUser();
  return (
    <AdminUserForm
      onSubmit={async (value) => {
        const result = await mutateAsync(value);
        notification.success({
          message: result.message,
        });
        replace({
          pathname: NavigationRoute.AdminUserView,
          query: { id: result.data.nomorIdentitas },
        });
        queryClient.refetchQueries({
          queryKey: userKey.list(),
        });
        return result.data;
      }}
    />
  );
}
