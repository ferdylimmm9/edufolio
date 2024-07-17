import { middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import { ProgramStudiResouceModel } from '../../../../prisma/resource';

export const StudyProgramFormSchema = Yup.object({
  nama_program_studi: Yup.string().required(),
  kode_program_studi: Yup.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const id = req.query.id as string;

  const body = req.body;
  try {
    const studyProgram = await prisma.programStudi.findUnique({
      where: { id },
      select: ProgramStudiResouceModel,
    });

    if (!studyProgram) {
      res.status(404).json({
        message: 'Program studi tidak dapat ditemukan',
      });
      return res.end();
    }
    if (method === 'GET') {
      res.status(200).json({
        data: decamelizeKeys(studyProgram),
      });
      return res.end();
    }

    await middleware(req, res, true);

    if (method === 'PUT') {
      const studyProgram = await StudyProgramFormSchema.validate(body);
      const currentStudyProgram = await prisma.programStudi.update({
        data: {
          kode: studyProgram.kode_program_studi,
          nama: studyProgram.nama_program_studi,
        },
        where: {
          id,
        },
        select: ProgramStudiResouceModel,
      });
      res.status(200).json({
        data: decamelizeKeys(currentStudyProgram),
        message: 'Program Studi Berhasil diubah',
      });
      return res.end();
    } else if (method === 'DELETE') {
      const userLength = studyProgram.User.length;

      if (userLength) {
        res.status(400).json({
          message: `Program studi tidak dapat dihapus, terdapat ${userLength} user`,
        });
        return res.end();
      }

      await prisma.programStudi.delete({
        where: { id },
      });

      res.status(200).json({
        message: 'Program studi berhasil dihapus',
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
