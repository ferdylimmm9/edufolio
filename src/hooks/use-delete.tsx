import { deleteFiles, SUPABASE_STORAGE_ENDPOINT } from 'api/storage';
import { adminKey } from 'api-hooks/admin/query';
import { certificationKey } from 'api-hooks/certification/query';
import { DeleteableType } from 'api-hooks/common/model';
import { useDeleteMutation } from 'api-hooks/common/mutation';
import { educationKey } from 'api-hooks/education/query';
import { experienceKey } from 'api-hooks/experience/query';
import { organizationKey } from 'api-hooks/organization/query';
import { studyProgramKey } from 'api-hooks/study-program/query';
import { thesisKey } from 'api-hooks/thesis/query';
import { userKey } from 'api-hooks/user/query';
import notification from 'common/helpers/notification';
import { queryClient } from 'common/repositories/query-client';
import { employeeNameGenerator } from 'modules/admin/employee/components/employee-utils';
import React from 'react';

import useDialog from './use-dialog';

export function useDelete(props: DeleteableType) {
  const id = React.useMemo(() => {
    switch (props.dataType) {
      case '/admins':
      case '/users':
        return props.data.nomorIdentitas;
      case '/certifications':
      case '/educations':
      case '/experiences':
      case '/organizations':
      case '/thesis':
      case '/study-programs':
        return props.data.id;
    }
  }, [props]);

  const label = React.useMemo(() => {
    switch (props.dataType) {
      case '/admins':
        return employeeNameGenerator(props.data);
      case '/users':
        return [
          props.data.nomorIdentitas,
          [props.data.namaDepan, props.data.namaTengah, props.data.namaBelakang]
            .filter(Boolean)
            .join(' '),
        ].join(' - ');
      case '/certifications':
        return [props.data.namaSertifikasi, props.data.namaInstitusi].join(
          ' - ',
        );
      case '/educations':
        return [props.data.nomorIdentitasUser, props.data.namaInstitusi].join(
          ' - ',
        );
      case '/experiences':
        return [
          props.data.nomorIdentitasUser,
          props.data.namaPerusahaan,
          props.data.posisi,
        ].join(' - ');
      case '/organizations':
        return [
          props.data.nomorIdentitasUser,
          props.data.nama,
          props.data.posisi,
        ].join(' - ');
      case '/thesis':
        return [props.data.nomorIdentitasUser, props.data.judulTugasAkhir].join(
          ' - ',
        );
      case '/study-programs':
        return [props.data.kode, props.data.nama].join(' - ');
    }
  }, [props.data, props.dataType]);

  const lampiran = React.useMemo(() => {
    switch (props.dataType) {
      case '/admins':
        return [props.data.photoUrl];
      case '/users':
        return [
          props.data.photoUrl,
          `${SUPABASE_STORAGE_ENDPOINT}${props.data.nomorIdentitas}/*`,
        ];
      case '/certifications':
        return props.data.lampiranSertifikasi.map((item) => item.fileUrl);
      case '/educations':
        return props.data.lampiranPendidikan.map((item) => item.fileUrl);
      case '/experiences':
        return props.data.lampiranPengalaman.map((item) => item.fileUrl);
      case '/organizations':
        return props.data.lampiranOrganisasi.map((item) => item.fileUrl);
      case '/thesis':
        return props.data.lampiranTugasAkhir.map((item) => item.fileUrl);
      case '/study-programs':
        return [];
    }
  }, [props.data, props.dataType]);

  const queryKey = React.useMemo(() => {
    switch (props.dataType) {
      case '/admins':
        return adminKey.list();
      case '/users':
        return userKey.list();
      case '/certifications':
        return [certificationKey.list()[0]];
      case '/educations':
        return [educationKey.list()[0]];
      case '/experiences':
        return [experienceKey.list()[0]];
      case '/organizations':
        return [organizationKey.list()[0]];
      case '/thesis':
        return [thesisKey.list()[0]];
      case '/study-programs':
        return studyProgramKey.list();
    }
  }, [props.dataType]);

  const deleteMutation = useDeleteMutation(props.dataType);

  const { mutateAsync, isLoading } = deleteMutation;

  const { Dialog, open } = useDialog({
    type: 'confirmation',
    title: 'Hapus data',
    content: `Apakah anda yakin untuk menghapus data ini (${label})?`,
    cancelButtonProps: {
      children: 'Tidak',
      onClick({ onClose }) {
        onClose();
      },
    },
    confirmationButtonProps: {
      children: 'Yakin',
      variant: {
        variant: 'primaryError',
      },
      loading: isLoading,
      async onClick({ onClose }) {
        try {
          const result = await mutateAsync({ id });
          queryClient.refetchQueries({
            queryKey,
          });
          await deleteFiles(lampiran);
          notification.success({
            message: result.message,
          });
          onClose();
        } catch (e) {
          notification.error({ message: e.message });
        }
      },
    },
  });

  return {
    DeleteDialog: Dialog,
    openDeleteDialog: open,
    ...deleteMutation,
  };
}
