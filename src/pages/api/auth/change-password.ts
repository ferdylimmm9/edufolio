import { comparePassword, hashPassword } from 'common/helpers/bcrypt';
import { middleware } from 'common/server';
import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

export const ChangePasswordFormSchema = Yup.object({
  old_password: Yup.string().required(),
  current_password: Yup.string().required(),
  current_password_confirmation: Yup.string()
    .required()
    .oneOf([Yup.ref('current_password'), null], 'Password tidak cocok'),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const body = req.body;
  const _user = (await middleware(req, res)) as JwtPayload;
  try {
    if (method === 'PUT') {
      const changePassword = await ChangePasswordFormSchema.validate(body);
      const user = await prisma.user.findUnique({
        where: { nomorIdentitas: _user.nomor_identitas },
      });
      const password = await hashPassword(changePassword.current_password);
      if (user) {
        const isValid = await comparePassword(
          changePassword.old_password,
          user.password,
        );
        if (isValid) {
          await prisma.user.update({
            where: { nomorIdentitas: _user.nomor_identitas },
            data: { password },
          });
          res.status(200).json({
            message: 'Password Berhasil diubah',
          });

          return res.end();
        }

        res.status(400).json({
          message: 'Password Salah',
        });
        return res.end();
      }

      const admin = await prisma.admin.findUnique({
        where: { nomorIdentitas: _user.nomor_identitas },
      });
      if (admin) {
        const isValid = await comparePassword(
          changePassword.old_password,
          admin.password,
        );
        if (isValid) {
          await prisma.admin.update({
            where: { nomorIdentitas: _user.nomor_identitas },
            data: { password },
          });
          res.status(200).json({
            message: 'Password Berhasil diubah',
          });

          return res.end();
        }

        res.status(400).json({
          message: 'Password Anda Salah',
        });

        return res.end();
      }

      res.status(404).json({
        message: 'User belum didaftarkan',
      });

      return res.end();
    }
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });

    return res.end();
  }
}
