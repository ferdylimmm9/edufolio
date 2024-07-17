import { useQuery } from '@tanstack/react-query';
import { UseQueryOptionsType, UseQueryResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import { MeModel } from './model';

export const meKey = {
  me: ['get-me'],
} as const;

export function useGetMe(
  options?: UseQueryOptionsType<MeModel>,
): UseQueryResultType<MeModel> {
  return useQuery({
    queryKey: meKey.me,
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.auth, 'me'].join('/'),
        },
        MeModel,
      ),
    staleTime: Infinity,
    cacheTime: Infinity,
    ...options,
  });
}
