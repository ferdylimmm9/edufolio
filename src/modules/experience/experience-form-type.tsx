import { ExperienceLiteModel } from 'api-hooks/experience/model';
import * as Yup from 'yup';

export const ExperienceFormSchema = () =>
  Yup.object({
    nomor_identitas_user: Yup.string().required(),
    posisi: Yup.string().default(''),
    nama_perusahaan: Yup.string().required(),
    lokasi: Yup.string().default(''),
    deskripsi: Yup.string().default(''),
    waktu_mulai: Yup.date().nullable().required(),
    waktu_selesai: Yup.date().nullable().default(null),
    skills: Yup.array(Yup.string().default('')).default([]),
  });

export type ExperienceFormType = Yup.InferType<
  ReturnType<typeof ExperienceFormSchema>
> & {
  data?: ExperienceLiteModel;
};
