import { Flex } from '@mantine/core';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useGetUsers } from 'api-hooks/user/query';
import { NavigationRoute } from 'common/routes/routes';
import colors from 'common/styles/colors';
import Text from 'components/elements/text';
import TextInput from 'components/elements/text-input';
import LoaderView from 'components/loader-view';
import FormLabel from 'modules/admin/components/form-label';
import { useRouter } from 'next/router';
import React from 'react';

import UserItem from './user-item';

export default function UserList() {
  const { push } = useRouter();
  const queryUsers = useGetUsers();
  const [search, setSearch] = React.useState('');
  return (
    <Flex direction="column" w="100%" maw={768} mih="100%" gap={4}>
      <FormLabel mx={16} mt={16} />
      <TextInput
        mx={16}
        value={search}
        leftSection={<MagnifyingGlass size={16} />}
        placeholder="Cari identitas pengguna"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <LoaderView query={queryUsers}>
        {({ data }) => {
          const users = data.filter((user) => {
            const content = [
              user.nomorIdentitas,
              user.namaDepan,
              user.namaTengah,
              user.namaTengah,
            ]
              .join(' ')
              .toLowerCase();

            return content.includes(search.toLowerCase());
          });
          return (
            <>
              {users.length === 0 && <Text p={16}>Tidak ada data</Text>}
              {users.map((user, index) => {
                return (
                  <div
                    onClick={() => {
                      push({
                        pathname: NavigationRoute.UserView,
                        query: { id: user.nomorIdentitas },
                      });
                    }}
                    style={{
                      cursor: 'pointer',
                      padding: 8,
                      marginLeft: 8,
                      marginRight: 8,
                      borderBottom:
                        index === users.length - 1
                          ? undefined
                          : `1px solid ${colors.borderPrimary}`,
                    }}
                  >
                    <UserItem key={user.nomorIdentitas} {...user} />
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
