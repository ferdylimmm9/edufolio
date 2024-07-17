import { AttachmentModel, CommonModel } from 'api-hooks/common/model';
import { UserLiteModel } from 'api-hooks/user/model';
import { Expose, Type } from 'class-transformer';

export class EducationLiteModel extends CommonModel {
  @Expose({ name: 'bidang_studi' })
  bidangStudi: string;

  deskripsi: string;
  gelar: string;

  @Expose({ name: 'nama_institusi' })
  namaInstitusi: string;

  @Expose({ name: 'nilai_akhir' })
  nilaiAkhir: string;

  @Expose({ name: 'nomor_identitas_user' })
  nomorIdentitasUser: string;

  skills: string;

  @Expose({ name: 'tanggal_mulai' })
  @Type(() => Date)
  tanggalMulai: Date;

  @Expose({ name: 'tanggal_selesai' })
  @Type(() => Date)
  tanggalSelesai: Date;

  @Expose({ name: 'lampiran_pendidikan' })
  @Type(() => AttachmentModel)
  lampiranPendidikan: AttachmentModel[];
}

export class EducationModel extends EducationLiteModel {
  @Type(() => UserLiteModel)
  user: UserLiteModel;
}

export type GetEducationsInput = {
  nomor_identitas?: string;
};

export type GetEducationInput = {
  id: string;
};

export type EducationInputType = {
  nomor_identitas_user: string;
  nama_institusi: string;
  gelar: string;
  bidang_studi: string;
  deskripsi: string;
  nilai_akhir: string;
  waktu_mulai: Date | null;
  waktu_selesai: Date | null;
  skills: string[];
  lampiran: string[];
};

export type EducationUpdateType = {
  id: string;
  data: EducationInputType;
};

export type EducationDeleteType = {
  id: string;
};
