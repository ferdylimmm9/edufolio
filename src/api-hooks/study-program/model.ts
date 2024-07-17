import { CommonModel } from 'api-hooks/common/model';
import { Expose, Type } from 'class-transformer';

export class StudyProgramLiteModel extends CommonModel {
  nama: string;
  kode: string;
}

export class UserStudyProgramModel {
  deskripsi: string;

  @Expose({ name: 'nama_belakang' })
  namaBelakang: string;

  @Expose({ name: 'nama_depan' })
  namaDepan: string;

  @Expose({ name: 'nama_tengah' })
  namaTengah: string;

  @Expose({ name: 'nomor_identitas' })
  nomorIdentitas: string;

  @Expose({ name: 'photo_url' })
  photoUrl: string;

  @Expose({ name: 'tanggal_dibuat' })
  @Type(() => Date)
  tanggalDibuat: Date;

  @Expose({ name: 'tanggal_diubah' })
  @Type(() => Date)
  tanggalDiubah: Date;
}

export class StudyProgramModel extends StudyProgramLiteModel {
  @Type(() => UserStudyProgramModel)
  user: UserStudyProgramModel[];
}

export type GetStudyProgramsInput = object;
export type GetStudyProgramInput = {
  id: string;
};

export type StudyProgramInputType = {
  nama_program_studi: string;
  kode_program_studi: string;
};

export type StudyProgramUpdateType = {
  id: string;
  data: StudyProgramInputType;
};

export type StudyProgramDeleteType = {
  id: string;
};
