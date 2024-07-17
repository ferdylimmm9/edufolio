import { generateId, middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { ThesisStatusEnum } from 'modules/admin/thesis/components/thesis-form-type';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import {
  TugasAkhirResouceLiteModel,
  TugasAkhirResouceModel,
} from '../../../../prisma/resource';

export const ThesisFormSchema = Yup.object({
  judul_tugas_akhir: Yup.string().required(),
  nomor_identitas_user: Yup.string().required(),
  abstrak: Yup.string().required(),
  status: Yup.mixed<ThesisStatusEnum>()
    .oneOf(Object.values(ThesisStatusEnum))
    .default(ThesisStatusEnum.pending),
  waktu_terbit: Yup.date().nullable(),
  nomor_identitas_pic: Yup.string().nullable(),
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
      const thesis = await prisma.tugasAkhir.findMany({
        select: TugasAkhirResouceLiteModel,
        where: {
          nomorIdentitasUser: nomor_identitas,
        },
      });

      res.status(200).json({
        data: decamelizeKeys(thesis),
      });
      return res.end();
    }
    await middleware(req, res);
    if (method === 'POST') {
      const id = generateId();
      const currentThesis = await ThesisFormSchema.validate(body);

      const thesis = await prisma.tugasAkhir.create({
        data: {
          abstrak: currentThesis.abstrak,
          id,
          judulTugasAkhir: currentThesis.judul_tugas_akhir,
          tanggalTerbit: currentThesis.waktu_terbit,
          status: currentThesis.status,
          LampiranTugasAkhir: {
            createMany: {
              data: currentThesis.lampiran.map((file) => {
                return {
                  id: generateId(),
                  fileUrl: file,
                  jenisFile: 'application/pdf',
                };
              }),
            },
          },
          user: {
            connect: {
              nomorIdentitas: currentThesis.nomor_identitas_user,
            },
          },
        },

        select: TugasAkhirResouceModel,
      });

      res.status(200).json({
        data: decamelizeKeys(thesis),
        message: 'Thesis berhasil dibuat',
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
