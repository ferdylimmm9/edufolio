import { SUPABASE_STORAGE_ENDPOINT } from 'api/storage';
import { hashPassword } from 'common/helpers/bcrypt';
import { generateAccessToken } from 'common/server';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';

export const RegisterFormSchema = Yup.object({
  nama_depan: Yup.string().required(),
  nama_tengah: Yup.string().default(''),
  nama_belakang: Yup.string().default(''),
  deskripsi: Yup.string().default(''),
  program_studi_id: Yup.string().required(),
  password: Yup.string().required(),
  nomor_identitas: Yup.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const body = req.body;
  try {
    if (method === 'POST') {
      const register = await RegisterFormSchema.validate(body);
      const password = await hashPassword(register.password);
      const user = await prisma.user.create({
        data: {
          nomorIdentitas: register.nomor_identitas,
          deskripsi: register.deskripsi,
          namaBelakang: register.nama_belakang,
          namaDepan: register.nama_depan,
          namaTengah: register.nama_tengah,
          photoUrl: `${SUPABASE_STORAGE_ENDPOINT}photo-profile/${register.nomor_identitas}.png`,
          programStudiId: register.program_studi_id,
          password,
        },
      });

      res.status(200).json({
        data: { token: generateAccessToken({ ...user, type: 'user' }) },
        message: 'Pengguna telah berhasil terdaftar',
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
