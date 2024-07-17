import { useQuery } from '@tanstack/react-query';
import { UseQueryOptionsType, UseQueryResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  EducationLiteModel,
  EducationModel,
  GetEducationInput,
  GetEducationsInput,
} from './model';

export const educationKey = {
  list: (params?: GetEducationsInput) => ['get-educations', params],
  view: (params: GetEducationInput) => ['get-education', params.id],
} as const;

export function useGetEducations(props?: {
  params?: GetEducationsInput;
  options?: UseQueryOptionsType<EducationLiteModel[]>;
}): UseQueryResultType<EducationLiteModel[]> {
  return useQuery({
    queryKey: educationKey.list(props?.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.educations].join('/'),
          params: props?.params,
        },
        EducationLiteModel,
      ),
    ...props?.options,
  });
}

export function useGetEducation(props: {
  params: GetEducationInput;
  options?: UseQueryOptionsType<EducationModel>;
}): UseQueryResultType<EducationModel> {
  return useQuery({
    queryKey: educationKey.view(props.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.educations, props.params.id].join('/'),
        },
        EducationModel,
      ),
    ...props.options,
  });
}
