import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsType, UseMutationResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  OrganizationDeleteType,
  OrganizationInputType,
  OrganizationModel,
  OrganizationUpdateType,
} from './model';

export function useCreateOrganization(
  options?: UseMutationOptionsType<OrganizationModel, OrganizationInputType>,
): UseMutationResultType<OrganizationModel, OrganizationInputType> {
  return useMutation({
    mutationFn(data) {
      return callApi(
        {
          url: [API_LIST.organizations].join('/'),
          method: 'POST',
          data,
        },
        OrganizationModel,
      );
    },
    ...options,
  });
}

export function useUpdateOrganization(
  options?: UseMutationOptionsType<OrganizationModel, OrganizationUpdateType>,
): UseMutationResultType<OrganizationModel, OrganizationUpdateType> {
  return useMutation({
    mutationFn({ data, id }) {
      return callApi(
        {
          url: [API_LIST.organizations, id].join('/'),
          method: 'PUT',
          data,
        },
        OrganizationModel,
      );
    },
    ...options,
  });
}

export function useDeleteOrganization(
  options?: UseMutationOptionsType<any, OrganizationDeleteType>,
): UseMutationResultType<any, OrganizationDeleteType> {
  return useMutation({
    mutationFn({ id }) {
      return callApi({
        url: [API_LIST.organizations, id].join('/'),
        method: 'DELETE',
      });
    },
    ...options,
  });
}
