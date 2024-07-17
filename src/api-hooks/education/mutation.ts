import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsType, UseMutationResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  EducationDeleteType,
  EducationInputType,
  EducationModel,
  EducationUpdateType,
} from './model';

export function useCreateEducation(
  options?: UseMutationOptionsType<EducationModel, EducationInputType>,
): UseMutationResultType<EducationModel, EducationInputType> {
  return useMutation({
    mutationFn(data) {
      return callApi(
        {
          url: [API_LIST.educations].join('/'),
          method: 'POST',
          data,
        },
        EducationModel,
      );
    },
    ...options,
  });
}

export function useUpdateEducation(
  options?: UseMutationOptionsType<EducationModel, EducationUpdateType>,
): UseMutationResultType<EducationModel, EducationUpdateType> {
  return useMutation({
    mutationFn({ data, id }) {
      return callApi(
        {
          url: [API_LIST.educations, id].join('/'),
          method: 'PUT',
          data,
        },
        EducationModel,
      );
    },
    ...options,
  });
}

export function useDeleteEducation(
  options?: UseMutationOptionsType<any, EducationDeleteType>,
): UseMutationResultType<any, EducationDeleteType> {
  return useMutation({
    mutationFn({ id }) {
      return callApi({
        url: [API_LIST.educations, id].join('/'),
        method: 'DELETE',
      });
    },
    ...options,
  });
}
