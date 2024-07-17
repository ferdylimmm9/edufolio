import { generateId, middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { JwtPayload } from 'jsonwebtoken';
import { ThesisStatusEnum } from 'modules/admin/thesis/components/thesis-form-type';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { TugasAkhirResouceModel } from '../../../../prisma/resource';

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
  const id = req.query.id as string;

  try {
    const thesis = await prisma.tugasAkhir.findUnique({
      where: {
        id,
      },
      select: TugasAkhirResouceModel,
    });

    const isApprove = thesis.status === 'approve';

    if (!thesis) {
      res.status(404).json({
        message: 'Karya Ilmiah tidak dapat ditemukan',
      });
      return res.end();
    }

    if (method === 'GET') {
      res.status(200).json({
        data: decamelizeKeys(thesis),
      });
      return res.end();
    }
    const user = (await middleware(req, res)) as JwtPayload;
    const isAdmin = user.type === 'admin';

    const nomor_identitas = user.nomor_identitas;

    if (nomor_identitas !== thesis.nomorIdentitasUser && !isAdmin) {
      res.status(403).json({
        message: 'Anda tidak di-izinkan mengakses fitur ini',
      });
      return res.end();
    }

    if (method === 'PUT') {
      if (!isApprove && !isAdmin) {
        res.status(400).json({
          message:
            'Anda tidak dapat mengubah data ini karena telah terverifikasi',
        });
        return res.end();
      }
      const thesis = await ThesisFormSchema.validate(body);

      if (thesis.lampiran.length) {
        await prisma.$transaction([
          prisma.lampiranTugasAkhir.deleteMany({
            where: { tugasAkhirId: id },
          }),
          prisma.lampiranTugasAkhir.createMany({
            data: thesis.lampiran.map((file) => {
              return {
                fileUrl: file,
                id: generateId(),
                jenisFile: 'application/pdf',
                tugasAkhirId: id,
              };
            }),
          }),
        ]);
      }

      const currentTugasAkhir = await prisma.tugasAkhir.update({
        data: {
          abstrak: thesis.abstrak,
          judulTugasAkhir: thesis.judul_tugas_akhir,
          status: thesis.status,
          tanggalTerbit: thesis.waktu_terbit,
        },
        where: { id },
        select: TugasAkhirResouceModel,
      });

      res.status(200).json({
        data: decamelizeKeys(currentTugasAkhir),
        message: 'Karya Ilmiah berhasil diubah',
      });
      return res.end();
    } else if (method === 'DELETE') {
      await prisma.$transaction([
        prisma.lampiranTugasAkhir.deleteMany({
          where: { tugasAkhirId: id },
        }),
        prisma.tugasAkhir.delete({
          where: {
            id,
          },
        }),
      ]);
      res.status(200).json({
        message: 'Karya Ilmiah berhasil dihapus',
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
