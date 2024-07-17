import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsType, UseMutationResultType } from 'api/type';
import { ApiListValueType, callApi } from 'common/repositories/client';

import { DeleteType } from './model';

export function useDeleteMutation(
  type: ApiListValueType,
  options?: UseMutationOptionsType<any, DeleteType>,
): UseMutationResultType<any, DeleteType> {
  return useMutation({
    mutationFn({ id }) {
      return callApi({
        url: [type, id].join('/'),
        method: 'DELETE',
      });
    },
    ...options,
  });
}
