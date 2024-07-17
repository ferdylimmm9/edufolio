import { useQuery } from '@tanstack/react-query';
import { UseQueryOptionsType, UseQueryResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  OrganizationLiteModel,
  OrganizationModel,
  GetOrganizationInput,
  GetOrganizationsInput,
} from './model';

export const organizationKey = {
  list: (params?: GetOrganizationsInput) => ['get-organizations', params],
  view: (params: GetOrganizationInput) => ['get-organization', params.id],
} as const;

export function useGetOrganizations(props?: {
  params?: GetOrganizationsInput;
  options?: UseQueryOptionsType<OrganizationLiteModel[]>;
}): UseQueryResultType<OrganizationLiteModel[]> {
  return useQuery({
    queryKey: organizationKey.list(props?.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.organizations].join('/'),
          params: props?.params,
        },
        OrganizationLiteModel,
      ),
    ...props?.options,
  });
}

export function useGetOrganization(props: {
  params: GetOrganizationInput;
  options?: UseQueryOptionsType<OrganizationModel>;
}): UseQueryResultType<OrganizationModel> {
  return useQuery({
    queryKey: organizationKey.view(props.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.organizations, props.params.id].join('/'),
        },
        OrganizationModel,
      ),
    ...props.options,
  });
}
