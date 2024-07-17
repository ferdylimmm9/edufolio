import { useQuery } from '@tanstack/react-query';
import { UseQueryOptionsType, UseQueryResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  CertificationLiteModel,
  CertificationModel,
  GetCertificationInput,
  GetCertificationsInput,
} from './model';

export const certificationKey = {
  list: (params?: GetCertificationsInput) => ['get-certifications', params],
  view: (params: GetCertificationInput) => ['get-certification', params.id],
} as const;

export function useGetCertifications(props?: {
  params?: GetCertificationsInput;
  options?: UseQueryOptionsType<CertificationLiteModel[]>;
}): UseQueryResultType<CertificationLiteModel[]> {
  return useQuery({
    queryKey: certificationKey.list(props?.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.certifications].join('/'),
          params: props?.params,
        },
        CertificationLiteModel,
      ),
    ...props?.options,
  });
}

export function useGetCertification(props: {
  params: GetCertificationInput;
  options?: UseQueryOptionsType<CertificationModel>;
}): UseQueryResultType<CertificationModel> {
  return useQuery({
    queryKey: certificationKey.view(props.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.certifications, props.params.id].join('/'),
        },
        CertificationModel,
      ),
    ...props.options,
  });
}
