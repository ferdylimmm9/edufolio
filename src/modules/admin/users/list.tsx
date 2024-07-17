import { Flex, SimpleGrid } from '@mantine/core';
import { UserLiteModel } from 'api-hooks/user/model';
import { useGetUsers } from 'api-hooks/user/query';
import { useGetStudyPrograms } from 'api-hooks/study-program/query';
import { NavigationRoute } from 'common/routes/routes';
import TableComponent from 'components/common/table/table';
import { Column } from 'components/common/table/types';
import Select from 'components/elements/select';
import TextInput from 'components/elements/text-input';
import LoaderView from 'components/loader-view';
import NavigationButton from 'modules/components/create-button';
import DeleteButton from 'modules/components/delete-button';
import { studyProgramTransformer } from 'modules/components/selects/study-program-select';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import FormLabel from '../components/form-label';

export function useGetUserTableList(): Column<UserLiteModel>[] {
  return [
    {
      label: '',
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
      label: 'Nomor Identitas - Nama',
      data: (row) => {
        const name = [row.namaDepan, row.namaTengah, row.namaBelakang]
          .filter(Boolean)
          .join(' ');
        return [row.nomorIdentitas, name].join(' - ');
      },
    },
    {
      label: 'Program Studi',
      data: (row) => [row.programStudi.kode, row.programStudi.nama].join(' - '),
    },
    {
      label: 'Aksi',
      data(row) {
        return (
          <Flex direction="row" gap={8}>
            <NavigationButton
              route={NavigationRoute.AdminUserView}
              id={row.nomorIdentitas}
              type="icon"
            />
            <DeleteButton
              type="icon"
              deleteable={{
                data: row,
                dataType: '/users',
              }}
            />
          </Flex>
        );
      },
    },
  ];
}

export default function UserList() {
  const columns = useGetUserTableList();
  const { push } = useRouter();
  const queryUsers = useGetUsers();
  const [search, setSearch] = React.useState('');
  const [studyProgramId, setStudyProgramId] = React.useState<string | null>(
    null,
  );
  const { data } = useGetStudyPrograms();
  const options = (data?.data || []).map((item) =>
    studyProgramTransformer(item),
  );

  return (
    <>
      <Flex direction="row" justify="space-between" mb={16}>
        <FormLabel />
        <NavigationButton
          type="button"
          route={NavigationRoute.AdminUserCreate}
        />
      </Flex>
      <SimpleGrid cols={4} mb={16}>
        <TextInput
          value={search}
          label="Filter"
          placeholder="Cari nomor identitas atau nama"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Select
          data={options}
          value={studyProgramId}
          onChange={setStudyProgramId}
          label="Program Studi"
          placeholder="Program Studi"
        />
      </SimpleGrid>
      <LoaderView query={queryUsers}>
        {({ data }) => {
          const users = data
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
              if (studyProgramId === null) return true;
              return item.programStudiId === studyProgramId;
            });
          return (
            <>
              <TableComponent
                columns={columns}
                data={users}
                rowKey={(row) => row.nomorIdentitas}
                onClickRow={(row) =>
                  push({
                    pathname: NavigationRoute.AdminUserView,
                    query: { id: row.nomorIdentitas },
                  })
                }
              />
            </>
          );
        }}
      </LoaderView>
    </>
  );
}
