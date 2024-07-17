import * as Yup from 'yup';

export const ChangePasswordFormSchema = () =>
  Yup.object({
    oldPassword: Yup.string().required(),
    currentPassword: Yup.string().required(),
    currentPasswordConfirmation: Yup.string()
      .required()
      .oneOf([Yup.ref('currentPassword'), null], 'Password tidak cocok'),
  });

export type ChangePasswordFormType = Yup.InferType<
  ReturnType<typeof ChangePasswordFormSchema>
>;
