import { useCreateThesis } from 'api-hooks/thesis/mutation';
import { thesisKey } from 'api-hooks/thesis/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import { NavigationRoute } from 'common/routes/routes';
import { useRouter } from 'next/router';

import ThesisForm from './components/thesis-form';

export default function AdminThesisCreate() {
  const { replace } = useRouter();
  const { mutateAsync } = useCreateThesis();
  return (
    <ThesisForm
      onSubmit={async (value, lampiran) => {
        const result = await mutateAsync({ ...value, lampiran });
        replace({
          pathname: NavigationRoute.AdminThesisView,
          query: { id: result.data.id },
        });
        queryClient.refetchQueries({
          queryKey: thesisKey.list(),
        });
        notification.success({
          message: result.message,
        });
        return result.data;
      }}
    />
  );
}
