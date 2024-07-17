import { OrganizationLiteModel } from 'api-hooks/organization/model';
import * as Yup from 'yup';

export const OrganizationFormSchema = () =>
  Yup.object({
    nomor_identitas_user: Yup.string().default(''),
    nama_organisasi: Yup.string().required(),
    pengalaman_id: Yup.string().default(''),
    deskripsi: Yup.string().default(''),
    posisi: Yup.string().default(''),
    waktu_mulai: Yup.date().nullable().required(),
    waktu_selesai: Yup.date().nullable().default(null),
    skills: Yup.array(Yup.string().default('')).default([]),
  });

export type OrganizationFormType = Yup.InferType<
  ReturnType<typeof OrganizationFormSchema>
> & {
  data?: OrganizationLiteModel;
};
