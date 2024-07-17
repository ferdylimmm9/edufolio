import { useQuery } from '@tanstack/react-query';
import { UseQueryOptionsType, UseQueryResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  ThesisLiteModel,
  ThesisModel,
  GetThesisInput,
  GetThesisListInput,
} from './model';

export const thesisKey = {
  list: (params?: GetThesisListInput) => ['get-thesis-list', params],
  view: (params: GetThesisInput) => ['get-thesis', params.id],
} as const;

export function useGetThesisList(props?: {
  params?: GetThesisListInput;
  options?: UseQueryOptionsType<ThesisLiteModel[]>;
}): UseQueryResultType<ThesisLiteModel[]> {
  return useQuery({
    queryKey: thesisKey.list(props?.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.thesis].join('/'),
          params: props?.params,
        },
        ThesisLiteModel,
      ),
    ...props?.options,
  });
}

export function useGetThesis(props: {
  params: GetThesisInput;
  options?: UseQueryOptionsType<ThesisModel>;
}): UseQueryResultType<ThesisModel> {
  return useQuery({
    queryKey: thesisKey.view(props.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.thesis, props.params.id].join('/'),
        },
        ThesisModel,
      ),
    ...props.options,
  });
}
