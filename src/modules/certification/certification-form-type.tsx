import { CertificationLiteModel } from 'api-hooks/certification/model';
import * as Yup from 'yup';

export const CertificationFormSchema = () =>
  Yup.object({
    nomor_identitas_user: Yup.string().default(''),
    nama_sertifikasi: Yup.string().default(''),
    nama_institusi: Yup.string().required(),
    deskripsi: Yup.string().default(''),
    nilai_akhir: Yup.string().default(''),
    waktu_terbit: Yup.date().nullable().required(),
    waktu_kadaluarsa: Yup.date().nullable().default(null),
    skills: Yup.array(Yup.string().default('')).default([]),
  });

export type CertificationFormType = Yup.InferType<
  ReturnType<typeof CertificationFormSchema>
> & {
  data?: CertificationLiteModel;
};
