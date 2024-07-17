import { useUpdateUser } from 'api-hooks/user/mutation';
import { userKey, useGetUser } from 'api-hooks/user/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';

import AdminUserForm from './components/user-form';

export default function AdminUserView() {
  const { query } = useRouter();
  const id = query.id as string;
  const queryUser = useGetUser({ params: { id } });
  const { mutateAsync } = useUpdateUser();
  return (
    <LoaderView query={queryUser}>
      {({ data }) => {
        const user = data;
        return (
          <AdminUserForm
            user={user}
            onSubmit={async (value) => {
              const result = await mutateAsync({ data: value, id });
              queryClient.refetchQueries({
                queryKey: userKey.list(),
              });
              queryClient.refetchQueries({
                queryKey: userKey.view({ id }),
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
