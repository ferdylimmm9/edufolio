import { StudyProgramLiteModel } from 'api-hooks/study-program/model';
import { Expose, Type } from 'class-transformer';

export class MeModel {
  @Expose({ name: 'program_studi_id' })
  programStudiId: string;

  @Expose({ name: 'program_studi' })
  @Type(() => StudyProgramLiteModel)
  programStudi: StudyProgramLiteModel;

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

  type: 'user' | 'admin';
}

export class TokenModel {
  token: string;
}

export type LoginInputType = {
  nomor_identitas: string;
  password: string;
};

export type RegisterInputType = {
  nama_depan: string;
  nama_tengah: string;
  nama_belakang: string;
  deskripsi: string;
  program_studi_id: string;
  password: string;
  nomor_identitas: string;
};

export type ChangePasswordInputType = {
  oldPassword: string;
  currentPassword: string;
  currentPasswordConfirmation: string;
};

export type ProfileInputType = {
  nama_depan: string;
  nama_tengah: string;
  nama_belakang: string;
  deskripsi: string;
  program_studi_id: string;
};
