import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsType, UseMutationResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  ExperienceDeleteType,
  ExperienceInputType,
  ExperienceModel,
  ExperienceUpdateType,
} from './model';

export function useCreateExperience(
  options?: UseMutationOptionsType<ExperienceModel, ExperienceInputType>,
): UseMutationResultType<ExperienceModel, ExperienceInputType> {
  return useMutation({
    mutationFn(data) {
      return callApi(
        {
          url: [API_LIST.experiences].join('/'),
          method: 'POST',
          data,
        },
        ExperienceModel,
      );
    },
    ...options,
  });
}

export function useUpdateExperience(
  options?: UseMutationOptionsType<ExperienceModel, ExperienceUpdateType>,
): UseMutationResultType<ExperienceModel, ExperienceUpdateType> {
  return useMutation({
    mutationFn({ data, id }) {
      return callApi(
        {
          url: [API_LIST.experiences, id].join('/'),
          method: 'PUT',
          data,
        },
        ExperienceModel,
      );
    },
    ...options,
  });
}

export function useDeleteExperience(
  options?: UseMutationOptionsType<any, ExperienceDeleteType>,
): UseMutationResultType<any, ExperienceDeleteType> {
  return useMutation({
    mutationFn({ id }) {
      return callApi({
        url: [API_LIST.experiences, id].join('/'),
        method: 'DELETE',
      });
    },
    ...options,
  });
}
