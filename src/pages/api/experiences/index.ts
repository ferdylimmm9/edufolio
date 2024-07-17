import { generateId, middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
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
  const nomor_identitas = req.query.nomor_identitas as string | undefined;

  try {
    if (method === 'GET') {
      const experiences = await prisma.pengalaman.findMany({
        select: PengalamanResouceModel,
        where: {
          nomorIdentitasUser: nomor_identitas,
        },
      });
      res.status(200).json({
        data: decamelizeKeys(experiences),
      });
      return res.end();
    }
    await middleware(req, res);
    if (method === 'POST') {
      const currentExperience = await ExperienceFormSchema.validate(body);
      const id = generateId();
      const experience = await prisma.pengalaman.create({
        data: {
          id,
          deskripsi: currentExperience.deskripsi,
          lokasi: currentExperience.lokasi,
          namaPerusahaan: currentExperience.nama_perusahaan,
          posisi: currentExperience.posisi,
          skills: currentExperience.skills.join('|'),
          tanggalMulai: currentExperience.waktu_mulai,
          tanggalSelesai: currentExperience.waktu_selesai,
          LampiranPengalaman: {
            createMany: {
              data: currentExperience.lampiran.map((file) => {
                return {
                  fileUrl: file,
                  id: generateId(),
                  jenisFile: 'application/pdf',
                };
              }),
            },
          },
          user: {
            connect: {
              nomorIdentitas: currentExperience.nomor_identitas_user,
            },
          },
        },
        select: PengalamanResouceModel,
      });

      res.status(200).json({
        data: decamelizeKeys(experience),
        message: 'Pengalaman berhasil dibuat',
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
