import { generateId, middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { SertifikasiResouceModel } from '../../../../prisma/resource';

export const CertificationFormSchema = Yup.object({
  nomor_identitas_user: Yup.string().default(''),
  nama_sertifikasi: Yup.string().default(''),
  nama_institusi: Yup.string().required(),
  deskripsi: Yup.string().default(''),
  nilai_akhir: Yup.string().default(''),
  waktu_terbit: Yup.date().nullable().default(null),
  waktu_kadaluarsa: Yup.date().nullable().default(null),
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
      const certifications = await prisma.sertifikasi.findMany({
        select: SertifikasiResouceModel,
        where: {
          nomorIdentitasUser: nomor_identitas,
        },
      });
      res.status(200).json({
        data: decamelizeKeys(certifications),
      });

      return res.end();
    }
    await middleware(req, res);
    if (method === 'POST') {
      const currentCertification = await CertificationFormSchema.validate(body);
      const id = generateId();
      const certification = await prisma.sertifikasi.create({
        data: {
          id,
          namaInstitusi: currentCertification.nama_institusi,
          deskripsi: currentCertification.deskripsi,
          namaSertifikasi: currentCertification.nama_sertifikasi,
          nilaiAkhir: currentCertification.nilai_akhir,
          skills: currentCertification.skills.join('|'),
          tanggalKadaluarsa: currentCertification.waktu_kadaluarsa,
          tanggalTerbit: currentCertification.waktu_terbit,
          LampiranSertifikasi: {
            createMany: {
              data: currentCertification.lampiran.map((file) => {
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
              nomorIdentitas: currentCertification.nomor_identitas_user,
            },
          },
        },
        select: SertifikasiResouceModel,
      });

      res.status(200).json({
        data: decamelizeKeys(certification),
        message: 'Sertifikat berhasil dibuat',
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
