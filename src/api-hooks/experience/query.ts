import { useQuery } from '@tanstack/react-query';
import { UseQueryOptionsType, UseQueryResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  ExperienceLiteModel,
  ExperienceModel,
  GetExperienceInput,
  GetExperiencesInput,
} from './model';

export const experienceKey = {
  list: (params?: GetExperiencesInput) => ['get-experiences', params],
  view: (params: GetExperienceInput) => ['get-experience', params.id],
} as const;

export function useGetExperiences(props?: {
  params?: GetExperiencesInput;
  options?: UseQueryOptionsType<ExperienceLiteModel[]>;
}): UseQueryResultType<ExperienceLiteModel[]> {
  return useQuery({
    queryKey: experienceKey.list(props?.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.experiences].join('/'),
          params: props?.params,
        },
        ExperienceLiteModel,
      ),
    ...props?.options,
  });
}

export function useGetExperience(props: {
  params: GetExperienceInput;
  options?: UseQueryOptionsType<ExperienceModel>;
}): UseQueryResultType<ExperienceModel> {
  return useQuery({
    queryKey: experienceKey.view(props.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.experiences, props.params.id].join('/'),
        },
        ExperienceModel,
      ),
    ...props.options,
  });
}
