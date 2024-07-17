import { generateId, middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { OrganisasiResouceModel } from '../../../../prisma/resource';

export const OrganizationFormSchema = Yup.object({
  nomor_identitas_user: Yup.string().default(''),
  nama_organisasi: Yup.string().required(),
  pengalaman_id: Yup.string().default(''),
  deskripsi: Yup.string().default(''),
  posisi: Yup.string().default(''),
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
      const organizations = await prisma.organisasi.findMany({
        select: OrganisasiResouceModel,
        where: {
          nomorIdentitasUser: nomor_identitas,
        },
      });
      res.status(200).json({
        data: decamelizeKeys(organizations),
      });
      return res.end();
    }
    await middleware(req, res);
    if (method === 'POST') {
      const currentOrganization = await OrganizationFormSchema.validate(body);
      const id = generateId();
      const organization = await prisma.organisasi.create({
        data: {
          id,
          deskripsi: currentOrganization.deskripsi,
          nama: currentOrganization.nama_organisasi,
          posisi: currentOrganization.posisi,
          skills: currentOrganization.skills.join('|'),
          tanggalMulai: currentOrganization.waktu_mulai,
          tanggalSelesai: currentOrganization.waktu_selesai,
          LampiranOrganisasi: {
            createMany: {
              data: currentOrganization.lampiran.map((file) => {
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
              nomorIdentitas: currentOrganization.nomor_identitas_user,
            },
          },
        },
        select: OrganisasiResouceModel,
      });
      res.status(200).json({
        data: decamelizeKeys(organization),
        message: 'Organisasi berhasil dibuat',
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
