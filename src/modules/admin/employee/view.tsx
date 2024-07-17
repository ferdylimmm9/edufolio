import { useUpdateAdmin } from 'api-hooks/admin/mutation';
import { adminKey, useGetAdmin } from 'api-hooks/admin/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';

import EmployeeForm from './components/employee-form';

export default function EmployeeView() {
  const { query } = useRouter();
  const id = query.id as string;
  const queryAdmin = useGetAdmin({ params: { id } });
  const { mutateAsync } = useUpdateAdmin();
  return (
    <LoaderView query={queryAdmin}>
      {({ data }) => {
        const employee = data;
        return (
          <EmployeeForm
            employee={employee}
            onSubmit={async (value) => {
              const result = await mutateAsync({ data: value, id });
              queryClient.refetchQueries({
                queryKey: adminKey.list(),
              });
              queryClient.refetchQueries({
                queryKey: adminKey.view({ id }),
              });
              notification.success({
                message: result.message,
              });
              return result.data;
            }}
          />
        );
      }}
    </LoaderView>
  );
}
