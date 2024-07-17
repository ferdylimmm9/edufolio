export const ThesisStatus = {
  pending: 'pending',
  approved: 'approved',
  uploading: 'uploading',
  uploaded: 'uploaded',
  finished: 'finished',
  takedown: 'takedown',
  canceled: 'canceled',
} as const;

export const ThesisType = {
  skripsi: 'skripsi',
  tesis: 'tesis',
} as const;

export type ThesisStatusType = (typeof ThesisStatus)[keyof typeof ThesisStatus];

export type ThesisTypeType = (typeof ThesisType)[keyof typeof ThesisType];
