import { useQuery } from '@tanstack/react-query';
import { UseQueryOptionsType, UseQueryResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  AdminLiteModel,
  AdminModel,
  GetAdminInput,
  GetAdminsInput,
} from './model';

export const adminKey = {
  list: (params?: GetAdminsInput) => ['get-admins', params],
  view: (params: GetAdminInput) => ['get-admin', params.id],
} as const;

export function useGetAdmins(props?: {
  params?: GetAdminsInput;
  options?: UseQueryOptionsType<AdminLiteModel[]>;
}): UseQueryResultType<AdminLiteModel[]> {
  return useQuery({
    queryKey: adminKey.list(props?.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.admins].join('/'),
          params: props?.params,
        },
        AdminLiteModel,
      ),
    ...props?.params,
  });
}

export function useGetAdmin(props: {
  params: GetAdminInput;
  options?: UseQueryOptionsType<AdminModel>;
}): UseQueryResultType<AdminModel> {
  return useQuery({
    queryKey: adminKey.view(props.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.admins, props.params.id].join('/'),
        },
        AdminModel,
      ),
    ...props.options,
  });
}
