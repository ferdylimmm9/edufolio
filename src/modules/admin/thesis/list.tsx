import { Flex, SimpleGrid } from '@mantine/core';
import { ThesisLiteModel } from 'api-hooks/thesis/model';
import { useGetThesisList } from 'api-hooks/thesis/query';
import { NavigationRoute } from 'common/routes/routes';
import TableComponent from 'components/common/table/table';
import { Column } from 'components/common/table/types';
import Select from 'components/elements/select';
import TextInput from 'components/elements/text-input';
import LoaderView from 'components/loader-view';
import NavigationButton from 'modules/components/create-button';
import DeleteButton from 'modules/components/delete-button';
import { useRouter } from 'next/router';
import React from 'react';

import { ThesisStatusEnum } from './components/thesis-form-type';
import FormLabel from '../components/form-label';

export function useGetThesisTableList(): Column<ThesisLiteModel>[] {
  return [
    {
      label: 'Pengguna',
      data: (row) => {
        const user = row.user;
        const labelUser = [user.namaDepan, user.namaTengah, user.namaBelakang]
          .filter(Boolean)
          .join(' ');
        return [user.nomorIdentitas, labelUser].join(' - ');
      },
    },
    {
      label: 'Judul Karya Ilmiah',
      data: (row) => row.judulTugasAkhir,
    },
    {
      label: 'Status',
      data: (row) => row.status,
    },
    {
      label: 'Aksi',
      data(row) {
        return (
          <Flex direction="row" gap={8}>
            <NavigationButton
              route={NavigationRoute.AdminThesisView}
              id={row.id}
              type="icon"
            />
            <DeleteButton
              type="icon"
              deleteable={{
                data: row,
                dataType: '/thesis',
              }}
            />
          </Flex>
        );
      },
    },
  ];
}

export default function ThesisList() {
  const columns = useGetThesisTableList();
  const { push } = useRouter();
  const queryThesis = useGetThesisList();
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState<string | null>(null);

  return (
    <>
      <Flex direction="row" justify="space-between" mb={16}>
        <FormLabel />
        <NavigationButton
          type="button"
          route={NavigationRoute.AdminThesisCreate}
        />
      </Flex>
      <SimpleGrid cols={4} mb={16}>
        <TextInput
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          label="Filter"
          placeholder="Cari identitas pengguna, atau judul"
        />
        <Select
          label="Status"
          searchable
          clearable
          value={status}
          onChange={setStatus}
          defaultValue={ThesisStatusEnum.pending}
          placeholder="Filter Status"
          data={[
            { value: ThesisStatusEnum.pending, label: 'Pending' },
            { value: ThesisStatusEnum.approve, label: 'Approve' },
            { value: ThesisStatusEnum.reject, label: 'Reject' },
          ]}
        />
      </SimpleGrid>
      <LoaderView query={queryThesis}>
        {({ data }) => {
          const thesis = data
            .filter((item) => {
              const user = item.user;
              const content = [
                user.nomorIdentitas,
                user.namaDepan,
                user.namaTengah,
                user.namaBelakang,
                item.judulTugasAkhir,
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
              data={thesis}
              rowKey={(row) => row.id}
              onClickRow={(row) =>
                push({
                  pathname: NavigationRoute.AdminThesisView,
                  query: { id: row.id },
                })
              }
            />
          );
        }}
      </LoaderView>
    </>
  );
}
