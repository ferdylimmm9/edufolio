import { generateId, middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { PendidikanResouceModel } from '../../../../prisma/resource';

export const EducationFormSchema = Yup.object({
  nomor_identitas_user: Yup.string().default(''),
  nama_institusi: Yup.string().required(),
  gelar: Yup.string().default(''),
  bidang_studi: Yup.string().default(''),
  deskripsi: Yup.string().default(''),
  nilai_akhir: Yup.string().default(''),
  waktu_mulai: Yup.date().nullable().default(null),
  waktu_selesai: Yup.date().nullable().default(null),
  skills: Yup.array(Yup.string().default('')).default([]),
  lampiran: Yup.array(Yup.string().default('')).default([]),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = req.body;
  const method = req.method;
  const nomor_identitas = req.query.nomor_identitas as string | undefined;

  try {
    if (method === 'GET') {
      const educations = await prisma.pendidikan.findMany({
        select: PendidikanResouceModel,
        where: {
          nomorIdentitasUser: nomor_identitas,
        },
      });
      res.status(200).json({
        data: decamelizeKeys(educations),
      });
      return res.end();
    }
    await middleware(req, res);
    if (method === 'POST') {
      const currentEducation = await EducationFormSchema.validate(body);
      const id = generateId();
      const education = await prisma.pendidikan.create({
        data: {
          id,
          deskripsi: currentEducation.deskripsi,
          bidangStudi: currentEducation.bidang_studi,
          gelar: currentEducation.gelar,
          namaInstitusi: currentEducation.nama_institusi,
          nilaiAkhir: currentEducation.nilai_akhir,
          skills: currentEducation.skills.join('|'),
          tanggalMulai: currentEducation.waktu_mulai,
          tanggalSelesai: currentEducation.waktu_selesai,
          LampiranPendidikan: {
            createMany: {
              data: currentEducation.lampiran.map((file) => {
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
              nomorIdentitas: currentEducation.nomor_identitas_user,
            },
          },
        },
        select: PendidikanResouceModel,
      });

      res.status(200).json({
        data: decamelizeKeys(education),
        message: 'Pendidikan berhasil dibuat',
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
