import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsType, UseMutationResultType } from 'api/type';
import { API_LIST, callApi } from 'common/repositories/client';

import {
  StudyProgramDeleteType,
  StudyProgramInputType,
  StudyProgramModel,
  StudyProgramUpdateType,
} from './model';

export function useCreateStudyProgram(
  options?: UseMutationOptionsType<StudyProgramModel, StudyProgramInputType>,
): UseMutationResultType<StudyProgramModel, StudyProgramInputType> {
  return useMutation({
    mutationFn(data) {
      return callApi(
        {
          url: [API_LIST.studyPrograms].join('/'),
          method: 'POST',
          data,
        },
        StudyProgramModel,
      );
    },
    ...options,
  });
}

export function useUpdateStudyProgram(
  options?: UseMutationOptionsType<StudyProgramModel, StudyProgramUpdateType>,
): UseMutationResultType<StudyProgramModel, StudyProgramUpdateType> {
  return useMutation({
    mutationFn({ data, id }) {
      return callApi(
        {
          url: [API_LIST.studyPrograms, id].join('/'),
          method: 'PUT',
          data,
        },
        StudyProgramModel,
      );
    },
    ...options,
  });
}

export function useDeleteStudyProgram(
  options?: UseMutationOptionsType<StudyProgramModel, StudyProgramDeleteType>,
): UseMutationResultType<StudyProgramModel, StudyProgramDeleteType> {
  return useMutation({
    mutationFn({ id }) {
      return callApi(
        {
          url: [API_LIST.studyPrograms, id].join('/'),
          method: 'DELETE',
        },
        StudyProgramModel,
      );
    },
    ...options,
  });
}
