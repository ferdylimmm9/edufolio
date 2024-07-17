import { MeModel } from 'api-hooks/auth/model';
import { UserModel } from 'api-hooks/user/model';
import * as Yup from 'yup';

export const UserFormSchema = () =>
  Yup.object({
    nomor_identitas: Yup.string().default(''),
    nama_depan: Yup.string().required(),
    nama_tengah: Yup.string().default(''),
    nama_belakang: Yup.string().default(''),
    deskripsi: Yup.string().default(''),
    program_studi_id: Yup.string().required(),
  });

export type UserFormType = Yup.InferType<ReturnType<typeof UserFormSchema>> & {
  data?: MeModel | UserModel;
};
