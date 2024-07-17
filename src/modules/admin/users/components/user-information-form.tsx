import { FileWithPath } from '@mantine/dropzone';
import Separator from 'components/common/separator';
import { Input } from 'components/elements/fields';
import PhotoProfileInput from 'components/photo-profile-input';
import StudyProgramSelect from 'modules/components/selects/study-program-select';
import { useFormContext } from 'react-hook-form';

import { UserFormType } from './user-form-type';

interface UserInformationFormProps {
  files: FileWithPath[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>;
}

export default function UserInformationForm(props: UserInformationFormProps) {
  const { files, setFiles } = props;
  const { getValues } = useFormContext<UserFormType>();
  const user = getValues('data');
  return (
    <>
      <PhotoProfileInput
        label="Foto Profil"
        defaultImage={user?.photoUrl}
        files={files}
        onDrop={setFiles}
      />
      <Separator gap={16} />
      <Input
        type="text"
        name="nomor_identitas"
        label="Nomor Identitas"
        placeholder="Masukkan Nomor Identitas"
        required={!user}
        disabled={!!user}
      />
      <Input
        type="text"
        name="nama_depan"
        label="Nama Depan"
        placeholder="Masukkan Nama Depan"
      />
      <Input
        type="text"
        name="nama_tengah"
        label="Nama Tengah"
        placeholder="Masukkan Nama Tengah"
      />
      <Input
        type="text"
        name="nama_belakang"
        label="Nama Belakang"
        placeholder="Masukkan Nama Belakang"
      />
      <StudyProgramSelect name="program_studi_id" />
      <Input
        type="textarea"
        name="deskripsi"
        label="Deskripsi"
        placeholder="Masukkan Deskripsi"
      />
    </>
  );
}
