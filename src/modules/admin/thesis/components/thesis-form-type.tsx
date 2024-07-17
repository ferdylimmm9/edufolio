import { ThesisModel } from 'api-hooks/thesis/model';
import * as Yup from 'yup';

export enum ThesisStatusEnum {
  pending = 'pending',
  reject = 'reject',
  approve = 'approve',
}

export const ThesisFormSchema = () =>
  Yup.object({
    judul_tugas_akhir: Yup.string().required(),
    nomor_identitas_user: Yup.string().required(),
    abstrak: Yup.string().required(),
    status: Yup.mixed<ThesisStatusEnum>()
      .oneOf(Object.values(ThesisStatusEnum))
      .default(ThesisStatusEnum.pending),
    waktu_terbit: Yup.date().nullable().required(),
    nomor_identitas_pic: Yup.string().nullable(),
  });

export type ThesisFormType = Yup.InferType<
  ReturnType<typeof ThesisFormSchema>
> & {
  data?: ThesisModel;
};
