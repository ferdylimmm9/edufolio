import exportEnv from 'common/config';
import { queryClient } from 'common/repositories/query-client';

export default async function logout() {
  await localStorage.removeItem(`${exportEnv.projectEnv}.auth.session-token`);
  await queryClient.invalidateQueries();
  await queryClient.clear();
}
