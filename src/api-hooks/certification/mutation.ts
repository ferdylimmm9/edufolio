import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsType, UseMutationResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  CertificationDeleteType,
  CertificationInputType,
  CertificationModel,
  CertificationUpdateType,
} from './model';

export function useCreateCertification(
  options?: UseMutationOptionsType<CertificationModel, CertificationInputType>,
): UseMutationResultType<CertificationModel, CertificationInputType> {
  return useMutation({
    mutationFn(data) {
      return callApi(
        {
          url: [API_LIST.certifications].join('/'),
          method: 'POST',
          data,
        },
        CertificationModel,
      );
    },
    ...options,
  });
}

export function useUpdateCertification(
  options?: UseMutationOptionsType<CertificationModel, CertificationUpdateType>,
): UseMutationResultType<CertificationModel, CertificationUpdateType> {
  return useMutation({
    mutationFn({ data, id }) {
      return callApi(
        {
          url: [API_LIST.certifications, id].join('/'),
          method: 'PUT',
          data,
        },
        CertificationModel,
      );
    },
    ...options,
  });
}

export function useDeleteCertification(
  options?: UseMutationOptionsType<any, CertificationDeleteType>,
): UseMutationResultType<any, CertificationDeleteType> {
  return useMutation({
    mutationFn({ id }) {
      return callApi({
        url: [API_LIST.certifications, id].join('/'),
        method: 'DELETE',
      });
    },
    ...options,
  });
}
