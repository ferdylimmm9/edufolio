import { generateId, middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { PengalamanResouceModel } from '../../../../prisma/resource';

export const ExperienceFormSchema = Yup.object({
  nomor_identitas_user: Yup.string().required(),
  posisi: Yup.string().default(''),
  nama_perusahaan: Yup.string().required(),
  lokasi: Yup.string().default(''),
  deskripsi: Yup.string().default(''),
  waktu_mulai: Yup.date().nullable().default(null),
  waktu_selesai: Yup.date().nullable().default(null),
  skills: Yup.array(Yup.string().default('')).default([]),
  lampiran: Yup.array(Yup.string().default('')).default([]),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const body = req.body;
  const id = req.query.id as string;

  try {
    const pengalaman = await prisma.pengalaman.findUnique({
      where: {
        id,
      },
      select: PengalamanResouceModel,
    });
    if (!pengalaman) {
      res.status(404).json({
        message: 'Pengalaman tidak dapat ditemukan',
      });
      return res.end();
    }
    if (method === 'GET') {
      res.status(200).json({
        data: decamelizeKeys(pengalaman),
      });
      return res.end();
    }
    const user = (await middleware(req, res)) as JwtPayload;
    const isAdmin = user.type === 'admin';

    const nomor_identitas = user.nomor_identitas;

    if (nomor_identitas !== pengalaman.nomorIdentitasUser && !isAdmin) {
      res.status(403).json({
        message: 'Anda tidak di-izinkan mengakses fitur ini',
      });
      return res.end();
    }

    if (method === 'PUT') {
      const pengalaman = await ExperienceFormSchema.validate(body);

      if (pengalaman.lampiran.length) {
        await prisma.$transaction([
          prisma.lampiranPengalaman.deleteMany({
            where: { pengalamanId: id },
          }),
          prisma.lampiranPengalaman.createMany({
            data: pengalaman.lampiran.map((file) => {
              return {
                fileUrl: file,
                id: generateId(),
                jenisFile: 'application/pdf',
                pengalamanId: id,
              };
            }),
          }),
        ]);
      }

      const currentExperience = await prisma.pengalaman.update({
        data: {
          posisi: pengalaman.posisi,
          lokasi: pengalaman.lokasi,
          deskripsi: pengalaman.deskripsi,
          skills: pengalaman.skills.join('|'),
          tanggalMulai: pengalaman.waktu_mulai,
          tanggalSelesai: pengalaman.waktu_selesai,
        },
        where: { id },
        select: PengalamanResouceModel,
      });
      res.status(200).json({
        data: decamelizeKeys(currentExperience),
        message: 'Pengalaman berhasil diubah',
      });
      return res.end();
    } else if (method === 'DELETE') {
      await prisma.$transaction([
        prisma.lampiranPengalaman.deleteMany({
          where: {
            pengalamanId: id,
          },
        }),
        prisma.pengalaman.delete({
          where: {
            id,
          },
        }),
      ]);

      res.status(200).json({
        message: 'Pengalaman berhasil dihapus',
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
