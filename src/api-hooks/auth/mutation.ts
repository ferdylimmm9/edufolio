import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsType, UseMutationResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  ChangePasswordInputType,
  LoginInputType,
  ProfileInputType,
  RegisterInputType,
  TokenModel,
  MeModel,
} from './model';

export function useLogin(
  options?: UseMutationOptionsType<TokenModel, LoginInputType>,
): UseMutationResultType<TokenModel, LoginInputType> {
  return useMutation({
    mutationFn(data) {
      return callApi(
        {
          url: [API_LIST.auth, 'login'].join('/'),
          method: 'POST',
          data,
        },
        TokenModel,
      );
    },
    ...options,
  });
}

export function useRegister(
  options?: UseMutationOptionsType<TokenModel, RegisterInputType>,
): UseMutationResultType<TokenModel, RegisterInputType> {
  return useMutation({
    mutationFn(data) {
      return callApi(
        {
          url: [API_LIST.auth, 'register'].join('/'),
          method: 'POST',
          data,
        },
        TokenModel,
      );
    },
    ...options,
  });
}

export function useChangePassword(
  options?: UseMutationOptionsType<any, ChangePasswordInputType>,
): UseMutationResultType<any, ChangePasswordInputType> {
  return useMutation({
    mutationFn(data) {
      return callApi({
        url: [API_LIST.auth, 'change-password'].join('/'),
        method: 'PUT',
        data,
      });
    },
    ...options,
  });
}

export function useProfile(
  options?: UseMutationOptionsType<MeModel, ProfileInputType>,
): UseMutationResultType<MeModel, ProfileInputType> {
  return useMutation({
    mutationFn(data) {
      return callApi(
        {
          url: [API_LIST.auth, 'profile'].join('/'),
          method: 'PUT',
          data,
        },
        MeModel,
      );
    },
    ...options,
  });
}
