import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsType, UseMutationResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  ThesisDeleteType,
  ThesisInputType,
  ThesisModel,
  ThesisUpdateType,
} from './model';

export function useCreateThesis(
  options?: UseMutationOptionsType<ThesisModel, ThesisInputType>,
): UseMutationResultType<ThesisModel, ThesisInputType> {
  return useMutation({
    mutationFn(data) {
      return callApi(
        {
          url: [API_LIST.thesis].join('/'),
          method: 'POST',
          data,
        },
        ThesisModel,
      );
    },
    ...options,
  });
}

export function useUpdateThesis(
  options?: UseMutationOptionsType<ThesisModel, ThesisUpdateType>,
): UseMutationResultType<ThesisModel, ThesisUpdateType> {
  return useMutation({
    mutationFn({ data, id }) {
      return callApi(
        {
          url: [API_LIST.thesis, id].join('/'),
          method: 'PUT',
          data,
        },
        ThesisModel,
      );
    },
    ...options,
  });
}

export function useDeleteThesis(
  options?: UseMutationOptionsType<any, ThesisDeleteType>,
): UseMutationResultType<any, ThesisDeleteType> {
  return useMutation({
    mutationFn({ id }) {
      return callApi({
        url: [API_LIST.thesis, id].join('/'),
        method: 'DELETE',
      });
    },
    ...options,
  });
}
