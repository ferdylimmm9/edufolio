import { AttachmentModel, CommonModel } from 'api-hooks/common/model';
import { UserLiteModel } from 'api-hooks/user/model';
import { Expose, Type } from 'class-transformer';
import { ThesisStatusEnum } from 'modules/admin/thesis/components/thesis-form-type';

export class ThesisLiteModel extends CommonModel {
  abstrak: string;

  @Expose({ name: 'judul_tugas_akhir' })
  judulTugasAkhir: string;

  @Expose({ name: 'nomor_identitas_user' })
  nomorIdentitasUser: string;

  @Expose({ name: 'tanggal_terbit' })
  @Type(() => Date)
  tanggalTerbit: Date;

  @Expose({ name: 'lampiran_tugas_akhir' })
  @Type(() => AttachmentModel)
  lampiranTugasAkhir: AttachmentModel[];

  status: ThesisStatusEnum;

  @Type(() => UserLiteModel)
  user: UserLiteModel;
}

export class ThesisModel extends ThesisLiteModel {}

export type GetThesisListInput = {
  nomor_identitas?: string;
};

export type GetThesisInput = {
  id: string;
};

export type ThesisInputType = {
  judul_tugas_akhir: string;
  nomor_identitas_user: string;
  abstrak: string;
  status: ThesisStatusEnum;
  waktu_terbit: Date | null;
  nomor_identitas_pic: string | null;
  lampiran: string[];
};

export type ThesisUpdateType = {
  id: string;
  data: ThesisInputType;
};

export type ThesisDeleteType = {
  id: string;
};
