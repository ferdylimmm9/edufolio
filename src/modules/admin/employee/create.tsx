import { useCreateAdmin } from 'api-hooks/admin/mutation';
import { adminKey } from 'api-hooks/admin/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import { NavigationRoute } from 'common/routes/routes';
import { useRouter } from 'next/router';

import EmployeeForm from './components/employee-form';

export default function EmployeeCreate() {
  const { replace } = useRouter();
  const { mutateAsync } = useCreateAdmin();
  return (
    <EmployeeForm
      onSubmit={async (value) => {
        const result = await mutateAsync(value);
        replace({
          pathname: NavigationRoute.AdminEmployeeView,
          query: { id: result.data.nomorIdentitas },
        });
        queryClient.refetchQueries({
          queryKey: adminKey.list(),
        });
        notification.success({
          message: result.message,
        });
        return result.data;
      }}
    />
  );
}
