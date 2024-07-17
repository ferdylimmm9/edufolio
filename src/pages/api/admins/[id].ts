import { middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { EmployeeStatusEnum } from 'modules/admin/employee/components/employee-form-type';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { AdminResouceModel } from '../../../../prisma/resource';

export const EmployeeFormSchema = Yup.object({
  nama_depan: Yup.string().required(),
  nama_tengah: Yup.string().default(''),
  nama_belakang: Yup.string().default(''),
  deskripsi: Yup.string().default(''),
  status: Yup.mixed<EmployeeStatusEnum>()
    .oneOf(Object.values(EmployeeStatusEnum))
    .default(EmployeeStatusEnum.active),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const id = req.query.id as string;
  const body = req.body;

  await middleware(req, res, true);

  try {
    const admin = await prisma.admin.findUnique({
      where: { nomorIdentitas: id },
      select: AdminResouceModel,
    });

    if (!admin) {
      res.status(404).json({
        message: 'Admin tidak ditemukan',
      });

      return res.end();
    }
    if (method === 'GET') {
      res.status(200).json({
        data: decamelizeKeys(admin),
      });

      return res.end();
    } else if (method === 'PUT') {
      const admin = await EmployeeFormSchema.validate(body);
      const currentAdmin = await prisma.admin.update({
        where: { nomorIdentitas: id },
        data: {
          deskripsi: admin.deskripsi,
          namaBelakang: admin.nama_belakang,
          namaDepan: admin.nama_depan,
          namaTengah: admin.nama_tengah,
          status: admin.status,
        },
        select: AdminResouceModel,
      });
      res.status(200).json({
        data: decamelizeKeys(currentAdmin),
        message: 'Admin berhasil diubah',
      });

      return res.end();
    } else if (method === 'DELETE') {
      await prisma.admin.delete({ where: { nomorIdentitas: id } });
      res.status(200).json({
        message: 'Admin berhasil dihapus',
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
