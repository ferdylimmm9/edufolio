import { middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { UserResouceModel } from '../../../../prisma/resource';

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
  const id = req.query.id as string;
  const body = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { nomorIdentitas: id },
      select: UserResouceModel,
    });

    if (!user) {
      res.status(404).json({
        message: 'Data tidak ditemukan',
      });
      return res.end();
    }
    if (method === 'GET') {
      res.status(200).json({
        data: decamelizeKeys(user),
      });
      return res.end();
    }
    await middleware(req, res, true);
    if (method === 'PUT') {
      const currentUser = await UserFormSchema.validate(body);
      const user = await prisma.user.update({
        where: { nomorIdentitas: id },
        data: {
          deskripsi: currentUser.deskripsi,
          namaBelakang: currentUser.nama_belakang,
          namaDepan: currentUser.nama_depan,
          namaTengah: currentUser.nama_tengah,
          programStudiId: currentUser.program_studi_id,
        },
        select: UserResouceModel,
      });
      res.status(200).json({
        data: decamelizeKeys(user),
        message: 'Pengguna Berhasil diubah',
      });
      return res.end();
    } else if (method === 'DELETE') {
      const deleteData = { nomorIdentitasUser: id };
      await prisma.$transaction([
        prisma.lampiranOrganisasi.deleteMany({
          where: { organisasi: deleteData },
        }),
        prisma.lampiranPendidikan.deleteMany({
          where: { pendidikan: deleteData },
        }),
        prisma.lampiranPengalaman.deleteMany({
          where: { pengalaman: deleteData },
        }),
        prisma.lampiranSertifikasi.deleteMany({
          where: { sertifikasi: deleteData },
        }),
        prisma.lampiranTugasAkhir.deleteMany({
          where: { tugasAkhir: deleteData },
        }),
        prisma.organisasi.deleteMany({
          where: deleteData,
        }),
        prisma.pendidikan.deleteMany({
          where: deleteData,
        }),
        prisma.pengalaman.deleteMany({
          where: deleteData,
        }),
        prisma.sertifikasi.deleteMany({
          where: deleteData,
        }),
        prisma.tugasAkhir.deleteMany({
          where: deleteData,
        }),
        prisma.user.delete({
          where: { nomorIdentitas: id },
        }),
      ]);
      res.status(200).json({
        message: 'Pengguna Berhasil dihapus',
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
