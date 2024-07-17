import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsType, UseMutationResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  AdminDeleteType,
  AdminInputType,
  AdminModel,
  AdminUpdateType,
} from './model';

export function useCreateAdmin(
  options?: UseMutationOptionsType<AdminModel, AdminInputType>,
): UseMutationResultType<AdminModel, AdminInputType> {
  return useMutation({
    mutationFn(data) {
      return callApi(
        {
          url: [API_LIST.admins].join('/'),
          method: 'POST',
          data,
        },
        AdminModel,
      );
    },
    ...options,
  });
}

export function useUpdateAdmin(
  options?: UseMutationOptionsType<AdminModel, AdminUpdateType>,
): UseMutationResultType<AdminModel, AdminUpdateType> {
  return useMutation({
    mutationFn({ data, id }) {
      return callApi(
        {
          url: [API_LIST.admins, id].join('/'),
          method: 'PUT',
          data,
        },
        AdminModel,
      );
    },
    ...options,
  });
}

export function useDeleteAdmin(
  options?: UseMutationOptionsType<any, AdminDeleteType>,
): UseMutationResultType<any, AdminDeleteType> {
  return useMutation({
    mutationFn({ id }) {
      return callApi({
        url: [API_LIST.admins, id].join('/'),
        method: 'DELETE',
      });
    },
    ...options,
  });
}
