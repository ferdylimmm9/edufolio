import * as Yup from 'yup';

export const RegisterFormSchema = () =>
  Yup.object({
    nama_depan: Yup.string().required(),
    nama_tengah: Yup.string().default(''),
    nama_belakang: Yup.string().default(''),
    deskripsi: Yup.string().default(''),
    program_studi_id: Yup.string().required(),
    password: Yup.string().required(),
    nomor_identitas: Yup.string().required(),
  });

export type RegisterFormType = Yup.InferType<
  ReturnType<typeof RegisterFormSchema>
>;
