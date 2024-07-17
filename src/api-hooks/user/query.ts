import { useQuery } from '@tanstack/react-query';
import { UseQueryOptionsType, UseQueryResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import { UserLiteModel, UserModel, GetUserInput, GetUsersInput } from './model';

export const userKey = {
  list: (params?: GetUsersInput) => ['get-users', params],
  view: (params: GetUserInput) => ['get-user', params.id],
} as const;

export function useGetUsers(props?: {
  params?: GetUsersInput;
  options?: UseQueryOptionsType<UserLiteModel[]>;
}): UseQueryResultType<UserLiteModel[]> {
  return useQuery({
    queryKey: userKey.list(props?.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.users].join('/'),
          params: props?.params,
        },
        UserLiteModel,
      ),
    ...props?.params,
  });
}

export function useGetUser(props: {
  params: GetUserInput;
  options?: UseQueryOptionsType<UserModel>;
}): UseQueryResultType<UserModel> {
  return useQuery({
    queryKey: userKey.view(props.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.users, props.params.id].join('/'),
        },
        UserModel,
      ),
    ...props.options,
  });
}
