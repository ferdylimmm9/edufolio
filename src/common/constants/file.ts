export const fileType = {
  BagianAwal: 'bagian_awal',
  Bab1: 'bab_1',
  Bab2: 'bab_2',
  Bab3: 'bab_3',
  Bab4: 'bab_4',
  Bab5: 'bab_5',
  BagianAkhir: 'bagian_akhir',
} as const;

export type FileType = (typeof fileType)[keyof typeof fileType];
