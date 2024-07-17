import { useCreateStudyProgram } from 'api-hooks/study-program/mutation';
import notification from 'common/helpers/notification';
import { NavigationRoute } from 'common/routes/routes';
import { useRouter } from 'next/router';

import AdminStudyProgramForm from './components/study-program-form';

export default function AdminStudyProgramCreate() {
  const { mutateAsync } = useCreateStudyProgram();
  const { replace } = useRouter();
  return (
    <AdminStudyProgramForm
      onSubmit={async (value) => {
        const result = await mutateAsync(value);
        notification.success({
          message: result.message,
        });
        replace({
          pathname: NavigationRoute.AdminStudyProgramView,
          query: { id: result.data.id },
        });
        return result.data;
      }}
    />
  );
}
