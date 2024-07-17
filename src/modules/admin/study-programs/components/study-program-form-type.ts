import { StudyProgramModel } from 'api-hooks/study-program/model';
import * as Yup from 'yup';

export const StudyProgramFormSchema = () =>
  Yup.object({
    nama_program_studi: Yup.string().required(),
    kode_program_studi: Yup.string().required(),
  });

export type StudyProgramFormType = Yup.InferType<
  ReturnType<typeof StudyProgramFormSchema>
> & {
  data?: StudyProgramModel;
};
