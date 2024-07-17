import { AdminStatusEnum } from '@prisma/client';
import { AdminModel } from 'api-hooks/admin/model';
import * as Yup from 'yup';

export enum EmployeeStatusEnum {
  active = 'active',
  inactive = 'inactive',
}

export const EmployeeFormSchema = () =>
  Yup.object({
    nama_depan: Yup.string().required(),
    nama_tengah: Yup.string().default(''),
    nama_belakang: Yup.string().default(''),
    deskripsi: Yup.string().default(''),
    password: Yup.string().default(''),
    status: Yup.mixed<AdminStatusEnum>()
      .oneOf(Object.values(AdminStatusEnum))
      .default(AdminStatusEnum.active),
  });

export type EmployeeFormType = Yup.InferType<
  ReturnType<typeof EmployeeFormSchema>
> & {
  data?: AdminModel;
};
