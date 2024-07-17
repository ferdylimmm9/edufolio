import { SUPABASE_STORAGE_ENDPOINT } from 'api/storage';
import { hashPassword } from 'common/helpers/bcrypt';
import { middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import {
  UserResouceLiteModel,
  UserResouceModel,
} from '../../../../prisma/resource';

export const UserFormSchema = Yup.object({
  nomor_identitas: Yup.string().default(''),
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

  try {
    if (method === 'GET') {
      const user = await prisma.user.findMany({
        select: UserResouceLiteModel,
      });
      res.status(200).json({
        data: decamelizeKeys(user),
      });
      return res.end();
    }
    await middleware(req, res, true);
    if (method === 'POST') {
      const currentUser = await UserFormSchema.validate(body);
      const password = await hashPassword('123456');
      const user = await prisma.user.create({
        data: {
          deskripsi: currentUser.deskripsi,
          namaBelakang: currentUser.nama_belakang,
          namaDepan: currentUser.nama_depan,
          namaTengah: currentUser.nama_tengah,
          programStudiId: currentUser.program_studi_id,
          nomorIdentitas: currentUser.nomor_identitas,
          photoUrl: `${SUPABASE_STORAGE_ENDPOINT}photo-profile/${currentUser.nomor_identitas}.png`,
          password,
        },
        select: UserResouceModel,
      });
      res.status(200).json({
        data: decamelizeKeys(user),
        message: 'Pengguna Berhasil Ditambah, untuk default passwordnya 123456',
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
