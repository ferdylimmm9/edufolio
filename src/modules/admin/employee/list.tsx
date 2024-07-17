import { Flex, SimpleGrid } from '@mantine/core';
import { AdminModel } from 'api-hooks/admin/model';
import { useGetAdmins } from 'api-hooks/admin/query';
import { NavigationRoute } from 'common/routes/routes';
import TableComponent from 'components/common/table/table';
import { Column } from 'components/common/table/types';
import Select from 'components/elements/select';
import TextInput from 'components/elements/text-input';
import LoaderView from 'components/loader-view';
import NavigationButton from 'modules/components/create-button';
import DeleteButton from 'modules/components/delete-button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { EmployeeStatusEnum } from './components/employee-form-type';
import FormLabel from '../components/form-label';

export function useGetEmployeeTableList(): Column<AdminModel>[] {
  return [
    {
      label: 'Foto Profil',
      tdProps(row) {
        return {
          style: {
            width: 64,
            height: 64,
          },
        };
      },
      data: (row) => (
        <Image
          alt={row.nomorIdentitas}
          style={{
            objectFit: 'cover',
            objectPosition: 'top',
          }}
          width={64}
          height={64}
          src={row.photoUrl || '/icon512_rounded.png'}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = '/icon512_rounded.png';
          }}
        />
      ),
    },
    {
      label: 'Nomor Identitas',
      data: (row) => row.nomorIdentitas,
    },
    {
      label: 'Nama',
      data: (row) =>
        [row.namaDepan, row.namaTengah, row.namaBelakang]
          .filter(Boolean)
          .join(' '),
    },
    {
      label: 'Status Karyawan',
      data: (row) => row.status,
    },
    {
      label: 'Aksi',
      data(row) {
        return (
          <Flex direction="row" gap={8}>
            <NavigationButton
              route={NavigationRoute.AdminEmployeeView}
              id={row.nomorIdentitas}
              type="icon"
            />
            <DeleteButton
              type="icon"
              deleteable={{
                data: row,
                dataType: '/admins',
              }}
            />
          </Flex>
        );
      },
    },
  ];
}

export default function EmployeeList() {
  const columns = useGetEmployeeTableList();
  const { push } = useRouter();
  const queryAdmins = useGetAdmins();
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState<string | null>(null);
  return (
    <>
      <Flex direction="row" justify="space-between" mb={16}>
        <FormLabel />
        <NavigationButton
          type="button"
          route={NavigationRoute.AdminEmployeeCreate}
        />
      </Flex>
      <SimpleGrid cols={4} mb={16}>
        <TextInput
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          label="Filter"
          placeholder="Cari nomor identitas atau nama "
        />
        <Select
          label="Status"
          searchable
          clearable
          value={status}
          onChange={setStatus}
          placeholder="Filter Status"
          data={[
            { value: EmployeeStatusEnum.active, label: 'Aktif' },
            { value: EmployeeStatusEnum.inactive, label: 'Tidak Aktif' },
          ]}
        />
      </SimpleGrid>
      <LoaderView query={queryAdmins}>
        {({ data }) => {
          const employees = data
            .filter((item) => {
              const content = [
                item.nomorIdentitas,
                item.namaDepan,
                item.namaTengah,
                item.namaBelakang,
              ]
                .join(' ')
                .toLowerCase();
              return content.includes(search.toLowerCase());
            })
            .filter((item) => {
              if (status === null) return true;
              return item.status === status;
            });
          return (
            <TableComponent
              columns={columns}
              data={employees}
              rowKey={(row) => row.nomorIdentitas}
              onClickRow={(row) =>
                push({
                  pathname: NavigationRoute.AdminEmployeeView,
                  query: { id: row.nomorIdentitas },
                })
              }
            />
          );
        }}
      </LoaderView>
    </>
  );
}
