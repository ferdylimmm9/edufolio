import * as Yup from 'yup';

export const LoginFormSchema = () =>
  Yup.object({
    nomor_identitas: Yup.string().default('').required(),
    password: Yup.string().default('').required(),
  });

export type LoginFormType = Yup.InferType<ReturnType<typeof LoginFormSchema>>;
