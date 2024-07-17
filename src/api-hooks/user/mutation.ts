import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsType, UseMutationResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  UserDeleteType,
  UserInputType,
  UserModel,
  UserUpdateType,
} from './model';

export function useCreateUser(
  options?: UseMutationOptionsType<UserModel, UserInputType>,
): UseMutationResultType<UserModel, UserInputType> {
  return useMutation({
    mutationFn(data) {
      return callApi(
        {
          url: [API_LIST.users].join('/'),
          method: 'POST',
          data,
        },
        UserModel,
      );
    },
    ...options,
  });
}

export function useUpdateUser(
  options?: UseMutationOptionsType<UserModel, UserUpdateType>,
): UseMutationResultType<UserModel, UserUpdateType> {
  return useMutation({
    mutationFn({ data, id }) {
      return callApi(
        {
          url: [API_LIST.users, id].join('/'),
          method: 'PUT',
          data,
        },
        UserModel,
      );
    },
    ...options,
  });
}

export function useDeleteUser(
  options?: UseMutationOptionsType<any, UserDeleteType>,
): UseMutationResultType<any, UserDeleteType> {
  return useMutation({
    mutationFn({ id }) {
      return callApi({
        url: [API_LIST.users, id].join('/'),
        method: 'DELETE',
      });
    },
    ...options,
  });
}
