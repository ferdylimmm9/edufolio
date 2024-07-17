import { AttachmentModel, CommonModel } from 'api-hooks/common/model';
import { UserLiteModel } from 'api-hooks/user/model';
import { Expose, Type } from 'class-transformer';

export class CertificationLiteModel extends CommonModel {
  deskripsi: string;

  @Expose({ name: 'nama_sertifikasi' })
  namaSertifikasi: string;

  @Expose({ name: 'nama_institusi' })
  namaInstitusi: string;

  @Expose({ name: 'nilai_akhir' })
  nilaiAkhir: string;

  @Expose({ name: 'nomor_identitas_user' })
  nomorIdentitasUser: string;

  skills: string;

  @Expose({ name: 'tanggal_kadaluarsa' })
  @Type(() => Date)
  tanggalKadaluarsa: Date;

  @Expose({ name: 'tanggal_terbit' })
  @Type(() => Date)
  tanggalTerbit: Date;

  @Expose({ name: 'lampiran_sertifikasi' })
  @Type(() => AttachmentModel)
  lampiranSertifikasi: AttachmentModel[];
}

export class CertificationModel extends CertificationLiteModel {
  @Type(() => UserLiteModel)
  user: UserLiteModel;
}

export type GetCertificationsInput = {
  nomor_identitas?: string;
};

export type GetCertificationInput = {
  id: string;
};

export type CertificationInputType = {
  nomor_identitas_user: string;
  nama_sertifikasi: string;
  nama_institusi: string;
  deskripsi: string;
  nilai_akhir: string;
  waktu_terbit: Date | null;
  waktu_kadaluarsa: Date | null;
  skills: string[];
  lampiran: string[];
};

export type CertificationUpdateType = {
  id: string;
  data: CertificationInputType;
};

export type CertificationDeleteType = {
  id: string;
};
