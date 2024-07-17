import { AdminStatusEnum } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

export class AdminLiteModel {
  deskripsi: string;

  @Expose({ name: 'nama_belakang' })
  namaBelakang: string;

  @Expose({ name: 'nama_depan' })
  namaDepan: string;

  @Expose({ name: 'nama_tengah' })
  namaTengah: string;

  @Expose({ name: 'nomor_identitas' })
  nomorIdentitas: string;

  @Expose({ name: 'tanggal_dibuat' })
  @Type(() => Date)
  tanggalDibuat: Date;

  @Expose({ name: 'tanggal_diubah' })
  @Type(() => Date)
  tanggalDiubah: Date;

  @Expose({ name: 'photo_url' })
  photoUrl: string;

  status: AdminStatusEnum;
}

export class AdminModel extends AdminLiteModel {}

export type GetAdminsInput = object;

export type GetAdminInput = {
  id: string;
};

export type AdminInputType = {
  nama_depan: string;
  nama_tengah: string;
  nama_belakang: string;
  deskripsi: string;
};

export type AdminUpdateType = {
  id: string;
  data: AdminInputType;
};

export type AdminDeleteType = {
  id: string;
};
