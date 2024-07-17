import { useUpdateStudyProgram } from 'api-hooks/study-program/mutation';
import {
  studyProgramKey,
  useGetStudyProgram,
} from 'api-hooks/study-program/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import LoaderView from 'components/loader-view';
import { useRouter } from 'next/router';

import AdminStudyProgramForm from './components/study-program-form';

export default function AdminStudyProgramView() {
  const { query } = useRouter();
  const id = query.id as string;
  const queryStudyProgram = useGetStudyProgram({
    params: { id },
  });
  const { mutateAsync } = useUpdateStudyProgram();
  return (
    <LoaderView query={queryStudyProgram}>
      {({ data }) => {
        return (
          <AdminStudyProgramForm
            onSubmit={async (value) => {
              const result = await mutateAsync({
                data: value,
                id,
              });
              queryClient.refetchQueries({
                queryKey: studyProgramKey.list(),
              });
              queryClient.refetchQueries({
                queryKey: studyProgramKey.view({ id }),
              });
              notification.success({
                message: result.message,
              });
              return result.data;
            }}
            studyProgram={data}
          />
        );
      }}
    </LoaderView>
  );
}
