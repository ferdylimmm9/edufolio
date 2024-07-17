import { Flex } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useGetThesisList } from 'api-hooks/thesis/query';
import { NavigationRoute } from 'common/routes/routes';
import colors from 'common/styles/colors';
import Text from 'components/elements/text';
import TextInput from 'components/elements/text-input';
import LoaderView from 'components/loader-view';
import FormLabel from 'modules/admin/components/form-label';
import { ThesisStatusEnum } from 'modules/admin/thesis/components/thesis-form-type';
import { useRouter } from 'next/router';
import React from 'react';

import ThesisItem from './thesis-item';

export default function ThesisList() {
  const { push } = useRouter();
  const queryThesisList = useGetThesisList();
  const [search, setSearch] = React.useState('');
  return (
    <Flex direction="column" w="100%" maw={768} h="100%" gap={4}>
      <FormLabel mx={16} mt={16} />
      <TextInput
        mx={16}
        leftSection={<MagnifyingGlass size={16} />}
        placeholder="Cari identitas user, atau judul"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <LoaderView query={queryThesisList}>
        {({ data }) => {
          const thesis = data
            .filter((thesis) => {
              const user = thesis.user;
              const content = [
                user.nomorIdentitas,
                user.namaDepan,
                user.namaTengah,
                user.namaBelakang,
                thesis.judulTugasAkhir,
              ]
                .join(' ')
                .toLowerCase();
              return content.includes(search.toLowerCase());
            })
            .filter((thesis) => thesis.status === ThesisStatusEnum.approve);
          return (
            <>
              {thesis.length === 0 && <Text p={16}>Tidak ada data</Text>}
              {thesis.map((_thesis, index) => {
                return (
                  <div
                    onClick={() => {
                      push({
                        pathname: NavigationRoute.ThesisView,
                        query: { id: _thesis.id },
                      });
                    }}
                    style={{
                      cursor: 'pointer',
                      padding: 8,
                      marginLeft: 8,
                      marginRight: 8,
                      borderBottom:
                        index === thesis.length - 1
                          ? undefined
                          : `1px solid ${colors.borderPrimary}`,
                    }}
                  >
                    <ThesisItem key={_thesis.id} {..._thesis} />
                  </div>
                );
              })}
            </>
          );
        }}
      </LoaderView>
    </Flex>
  );
}
