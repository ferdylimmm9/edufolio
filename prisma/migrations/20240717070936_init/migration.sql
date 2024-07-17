-- CreateEnum
CREATE TYPE "AdminStatusEnum" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "ThesisStatusEnum" AS ENUM ('pending', 'reject', 'approve');

-- CreateTable
CREATE TABLE "program_studi" (
    "id" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "nama" TEXT NOT NULL,
    "kode" TEXT NOT NULL,

    CONSTRAINT "program_studi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "nomor_identitas" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "nama_depan" TEXT NOT NULL,
    "nama_tengah" TEXT NOT NULL,
    "nama_belakang" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "AdminStatusEnum" NOT NULL,
    "photo_url" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("nomor_identitas")
);

-- CreateTable
CREATE TABLE "user" (
    "nomor_identitas" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "nama_depan" TEXT NOT NULL,
    "nama_tengah" TEXT NOT NULL,
    "nama_belakang" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "program_studi_id" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("nomor_identitas")
);

-- CreateTable
CREATE TABLE "organisasi" (
    "id" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "tanggal_mulai" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_selesai" TIMESTAMPTZ(6),
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "posisi" TEXT NOT NULL,
    "pengalaman_id" TEXT,
    "nomor_identitas_user" TEXT NOT NULL,

    CONSTRAINT "organisasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lampiran_organisasi" (
    "id" TEXT NOT NULL,
    "organisasi_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "lampiran_organisasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengalaman" (
    "id" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "tanggal_mulai" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_selesai" TIMESTAMPTZ(6),
    "posisi" TEXT NOT NULL,
    "nama_perusahaan" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "nomor_identitas_user" TEXT NOT NULL,

    CONSTRAINT "pengalaman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lampiran_pengalaman" (
    "id" TEXT NOT NULL,
    "pengalaman_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "lampiran_pengalaman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sertifikasi" (
    "id" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "tanggal_terbit" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_kadaluarsa" TIMESTAMPTZ(6),
    "nama_sertifikasi" TEXT NOT NULL,
    "nama_institusi" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "nilai_akhir" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "nomor_identitas_user" TEXT NOT NULL,

    CONSTRAINT "sertifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lampiran_sertifikasi" (
    "id" TEXT NOT NULL,
    "sertifikasi_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "lampiran_sertifikasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pendidikan" (
    "id" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "tanggal_mulai" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_selesai" TIMESTAMPTZ(6),
    "nama_institusi" TEXT NOT NULL,
    "gelar" TEXT NOT NULL,
    "bidang_studi" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "nilai_akhir" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "nomor_identitas_user" TEXT NOT NULL,

    CONSTRAINT "pendidikan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lampiran_pendidikan" (
    "id" TEXT NOT NULL,
    "pendidikan_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "lampiran_pendidikan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tugas_akhir" (
    "id" TEXT NOT NULL,
    "tanggal_dibuat" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_diubah" TIMESTAMPTZ(6) NOT NULL,
    "tanggal_terbit" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "judul_tugas_akhir" TEXT NOT NULL,
    "abstrak" TEXT NOT NULL,
    "status" "ThesisStatusEnum" NOT NULL,
    "nomor_identitas_user" TEXT NOT NULL,

    CONSTRAINT "tugas_akhir_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lampiran_tugas_akhir" (
    "id" TEXT NOT NULL,
    "tugas_akhir_id" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "jenis_file" TEXT NOT NULL,

    CONSTRAINT "lampiran_tugas_akhir_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_program_studi_id_fkey" FOREIGN KEY ("program_studi_id") REFERENCES "program_studi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organisasi" ADD CONSTRAINT "organisasi_nomor_identitas_user_fkey" FOREIGN KEY ("nomor_identitas_user") REFERENCES "user"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organisasi" ADD CONSTRAINT "organisasi_pengalaman_id_fkey" FOREIGN KEY ("pengalaman_id") REFERENCES "pengalaman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lampiran_organisasi" ADD CONSTRAINT "lampiran_organisasi_organisasi_id_fkey" FOREIGN KEY ("organisasi_id") REFERENCES "organisasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengalaman" ADD CONSTRAINT "pengalaman_nomor_identitas_user_fkey" FOREIGN KEY ("nomor_identitas_user") REFERENCES "user"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lampiran_pengalaman" ADD CONSTRAINT "lampiran_pengalaman_pengalaman_id_fkey" FOREIGN KEY ("pengalaman_id") REFERENCES "pengalaman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sertifikasi" ADD CONSTRAINT "sertifikasi_nomor_identitas_user_fkey" FOREIGN KEY ("nomor_identitas_user") REFERENCES "user"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lampiran_sertifikasi" ADD CONSTRAINT "lampiran_sertifikasi_sertifikasi_id_fkey" FOREIGN KEY ("sertifikasi_id") REFERENCES "sertifikasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pendidikan" ADD CONSTRAINT "pendidikan_nomor_identitas_user_fkey" FOREIGN KEY ("nomor_identitas_user") REFERENCES "user"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lampiran_pendidikan" ADD CONSTRAINT "lampiran_pendidikan_pendidikan_id_fkey" FOREIGN KEY ("pendidikan_id") REFERENCES "pendidikan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tugas_akhir" ADD CONSTRAINT "tugas_akhir_nomor_identitas_user_fkey" FOREIGN KEY ("nomor_identitas_user") REFERENCES "user"("nomor_identitas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lampiran_tugas_akhir" ADD CONSTRAINT "lampiran_tugas_akhir_tugas_akhir_id_fkey" FOREIGN KEY ("tugas_akhir_id") REFERENCES "tugas_akhir"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
