import { EducationLiteModel } from 'api-hooks/education/model';
import * as Yup from 'yup';

export const EducationFormSchema = () =>
  Yup.object({
    nomor_identitas_user: Yup.string().default(''),
    nama_institusi: Yup.string().required(),
    gelar: Yup.string().default(''),
    bidang_studi: Yup.string().default(''),
    deskripsi: Yup.string().default(''),
    nilai_akhir: Yup.string().default(''),
    waktu_mulai: Yup.date().nullable().required(),
    waktu_selesai: Yup.date().nullable().default(null),
    skills: Yup.array(Yup.string().default('')).default([]),
  });

export type EducationFormType = Yup.InferType<
  ReturnType<typeof EducationFormSchema>
> & {
  data?: EducationLiteModel;
};
