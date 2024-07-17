export const AdminResouceLiteModel = {
  deskripsi: true,
  namaBelakang: true,
  namaDepan: true,
  namaTengah: true,
  nomorIdentitas: true,
  photoUrl: true,
  status: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
};
export const AdminResouceModel = {
  deskripsi: true,
  namaBelakang: true,
  namaDepan: true,
  namaTengah: true,
  nomorIdentitas: true,
  photoUrl: true,
  status: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
};

export const ProgramStudiResouceLiteModel = {
  id: true,
  kode: true,
  nama: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
};

export const ProgramStudiResouceModel = {
  id: true,
  kode: true,
  nama: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  User: {
    select: {
      deskripsi: true,
      namaBelakang: true,
      namaDepan: true,
      namaTengah: true,
      nomorIdentitas: true,
      photoUrl: true,
      tanggalDibuat: true,
      tanggalDiubah: true,
    },
  },
};

export const UserResouceLiteModel = {
  deskripsi: true,
  namaBelakang: true,
  namaDepan: true,
  namaTengah: true,
  nomorIdentitas: true,
  photoUrl: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  programStudiId: true,
  programStudi: {
    select: ProgramStudiResouceLiteModel,
  },
};

export const PengalamanResouceLiteModel = {
  deskripsi: true,
  id: true,
  LampiranPengalaman: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  lokasi: true,
  namaPerusahaan: true,
  nomorIdentitasUser: true,
  posisi: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
};
export const PengalamanResouceModel = {
  deskripsi: true,
  id: true,
  LampiranPengalaman: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  lokasi: true,
  user: {
    select: UserResouceLiteModel,
  },
  namaPerusahaan: true,
  nomorIdentitasUser: true,
  posisi: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
};

export const PendidikanResouceLiteModel = {
  bidangStudi: true,
  deskripsi: true,
  gelar: true,
  id: true,
  LampiranPendidikan: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  namaInstitusi: true,
  nilaiAkhir: true,
  nomorIdentitasUser: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
};
export const PendidikanResouceModel = {
  bidangStudi: true,
  deskripsi: true,
  gelar: true,
  id: true,
  LampiranPendidikan: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  namaInstitusi: true,
  nilaiAkhir: true,
  nomorIdentitasUser: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
  user: {
    select: UserResouceLiteModel,
  },
};

export const SertifikasiResouceLiteModel = {
  deskripsi: true,
  id: true,
  LampiranSertifikasi: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  namaInstitusi: true,
  namaSertifikasi: true,
  nilaiAkhir: true,
  nomorIdentitasUser: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalKadaluarsa: true,
  tanggalTerbit: true,
};
export const SertifikasiResouceModel = {
  deskripsi: true,
  id: true,
  LampiranSertifikasi: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  user: {
    select: UserResouceLiteModel,
  },
  namaSertifikasi: true,
  nilaiAkhir: true,
  namaInstitusi: true,
  nomorIdentitasUser: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalKadaluarsa: true,
  tanggalTerbit: true,
};

export const OrganisasiResouceLiteModel = {
  deskripsi: true,
  id: true,
  LampiranOrganisasi: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  nama: true,
  nomorIdentitasUser: true,
  pengalaman: {
    select: {
      id: true,
      namaPerusahaan: true,
      posisi: true,
    },
  },
  posisi: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
};
export const OrganisasiResouceModel = {
  deskripsi: true,
  id: true,
  LampiranOrganisasi: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  nama: true,
  user: {
    select: UserResouceLiteModel,
  },
  nomorIdentitasUser: true,
  pengalaman: {
    select: {
      id: true,
      namaPerusahaan: true,
      posisi: true,
    },
  },
  posisi: true,
  skills: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
};

export const TugasAkhirResouceLiteModel = {
  abstrak: true,
  id: true,
  judulTugasAkhir: true,
  LampiranTugasAkhir: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  user: {
    select: UserResouceLiteModel,
  },
  status: true,
  tanggalDibuat: true,
  nomorIdentitasUser: true,
  tanggalDiubah: true,
  tanggalTerbit: true,
};

export const TugasAkhirResouceModel = {
  abstrak: true,
  id: true,
  judulTugasAkhir: true,
  LampiranTugasAkhir: {
    select: {
      fileUrl: true,
      id: true,
      jenisFile: true,
    },
  },
  user: {
    select: UserResouceLiteModel,
  },
  status: true,
  tanggalDibuat: true,
  nomorIdentitasUser: true,
  tanggalDiubah: true,
  tanggalTerbit: true,
};

export const UserResouceModel = {
  deskripsi: true,
  namaBelakang: true,
  namaDepan: true,
  namaTengah: true,
  nomorIdentitas: true,
  Organisasi: {
    select: OrganisasiResouceLiteModel,
  },
  Pendidikan: {
    select: PendidikanResouceLiteModel,
  },
  Pengalaman: {
    select: PengalamanResouceLiteModel,
  },
  photoUrl: true,
  programStudi: {
    select: ProgramStudiResouceLiteModel,
  },
  programStudiId: true,
  Sertifikasi: {
    select: SertifikasiResouceLiteModel,
  },
  tanggalDibuat: true,
  tanggalDiubah: true,
  TugasAkhir: {
    select: TugasAkhirResouceLiteModel,
  },
};
