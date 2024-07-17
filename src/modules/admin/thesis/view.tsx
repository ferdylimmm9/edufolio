import { useUpdateThesis } from 'api-hooks/thesis/mutation';
import { thesisKey, useGetThesis } from 'api-hooks/thesis/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';

import ThesisForm from './components/thesis-form';

export default function AdminThesisView() {
  const { query } = useRouter();
  const id = query.id as string;
  const queryThesis = useGetThesis({ params: { id } });
  const { mutateAsync } = useUpdateThesis();

  return (
    <LoaderView query={queryThesis}>
      {({ data }) => {
        const _thesis = data;
        return (
          <ThesisForm
            thesis={_thesis}
            onSubmit={async (value, lampiran) => {
              const result = await mutateAsync({
                id,
                data: { ...value, lampiran },
              });
              queryClient.refetchQueries({
                queryKey: thesisKey.list(),
              });
              queryClient.refetchQueries({
                queryKey: thesisKey.view({
                  id,
                }),
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
