import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

export type StatusType = 'success' | 'error';

export type ApiResult<T> = {
  data: T;
  message: string;
  status: StatusType;
};

export type ApiError = {
  message: string;
  status: StatusType;
};

export type UseQueryOptionsType<T> = UseQueryOptions<ApiResult<T>, ApiError>;
export type UseQueryResultType<T> = UseQueryResult<ApiResult<T>, ApiError>;

export type UseMutationOptionsType<T, U = object> = UseMutationOptions<
  ApiResult<T>,
  ApiError,
  U
>;
export type UseMutationResultType<T, U = object> = UseMutationResult<
  ApiResult<T>,
  ApiError,
  U
>;
