import { middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

export const UserFormSchema = Yup.object({
  nama_depan: Yup.string().required(),
  nama_tengah: Yup.string().default(''),
  nama_belakang: Yup.string().default(''),
  deskripsi: Yup.string().default(''),
  program_studi_id: Yup.string().required(),
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
      const userForm = await UserFormSchema.validate(body);
      const user = await prisma.user.update({
        where: { nomorIdentitas: _user.nomor_identitas },
        data: {
          deskripsi: userForm.deskripsi,
          namaBelakang: userForm.nama_belakang,
          namaDepan: userForm.nama_depan,
          namaTengah: userForm.nama_tengah,
          programStudiId: userForm.program_studi_id,
        },
      });

      res.status(200).json({
        data: decamelizeKeys(user),
        message: 'Profil Berhasil diubah',
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
