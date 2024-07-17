import { generateId, middleware } from 'common/server';
import { decamelizeKeys } from 'humps';
import { NextApiRequest, NextApiResponse } from 'next';
import * as Yup from 'yup';

import prisma from '../../../../prisma';
import {
  ProgramStudiResouceLiteModel,
  ProgramStudiResouceModel,
} from '../../../../prisma/resource';

export const StudyProgramFormSchema = Yup.object({
  nama_program_studi: Yup.string().required(),
  kode_program_studi: Yup.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method;
  const body = req.body;
  try {
    if (method === 'GET') {
      const studyPrograms = await prisma.programStudi.findMany({
        select: ProgramStudiResouceLiteModel,
      });
      res.status(200).json({
        data: decamelizeKeys(studyPrograms),
      });
      return res.end();
    }
    await middleware(req, res, true);
    if (method === 'POST') {
      const id = generateId();
      const currentStudyProgram = await StudyProgramFormSchema.validate(body);
      const studyProgram = await prisma.programStudi.create({
        data: {
          id,
          kode: currentStudyProgram.kode_program_studi,
          nama: currentStudyProgram.nama_program_studi,
        },
        select: ProgramStudiResouceModel,
      });

      res.status(200).json({
        data: decamelizeKeys(studyProgram),
        message: 'Program studi berhasil dibuat',
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
