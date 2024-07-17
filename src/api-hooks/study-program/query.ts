import { useQuery } from '@tanstack/react-query';
import { UseQueryOptionsType, UseQueryResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  GetStudyProgramInput,
  GetStudyProgramsInput,
  StudyProgramLiteModel,
  StudyProgramModel,
} from './model';

export const studyProgramKey = {
  list: (params?: GetStudyProgramsInput) => ['get-study-programs', params],
  view: (params: GetStudyProgramInput) => ['get-study-program', params.id],
};

export function useGetStudyPrograms(props?: {
  params?: GetStudyProgramsInput;
  options?: UseQueryOptionsType<StudyProgramLiteModel[]>;
}): UseQueryResultType<StudyProgramLiteModel[]> {
  return useQuery({
    queryKey: studyProgramKey.list(props?.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.studyPrograms].join('/'),
          params: props?.params,
        },
        StudyProgramLiteModel,
      ),
    ...props?.options,
  });
}

export function useGetStudyProgram(props: {
  params: GetStudyProgramInput;
  options?: UseQueryOptionsType<StudyProgramModel>;
}): UseQueryResultType<StudyProgramModel> {
  return useQuery({
    queryKey: studyProgramKey.view(props.params),
    queryFn: async () =>
      callApi(
        {
          url: [API_LIST.studyPrograms, props.params.id].join('/'),
        },
        StudyProgramModel,
      ),
    ...props.options,
  });
}
