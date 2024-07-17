import { AppShell, AppShellMainProps, Burger, Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  Bank,
  Book,
  GraduationCap,
  LockSimple,
  SignOut,
  User,
} from '@phosphor-icons/react';
import { useGetMe } from 'api-hooks/auth/query';
import { NavigationRoute } from 'common/routes/routes';
import Button, { ButtonProps } from 'components/elements/button';
import Text from 'components/elements/text';
import LoaderView from 'components/loader-view';
import useChangePasswordDialog from 'hooks/use-change-password-dialog';
import useLogout from 'hooks/use-logout';
import BrandIconDirectHome from 'modules/components/brand-icon-home';
import { useRouter } from 'next/router';
import React from 'react';
import structuralStyles from 'styles/layout.css';

export interface AdminLayoutProps extends AppShellMainProps {}

export default function AdminLayout(props: AdminLayoutProps) {
  const [opened, { toggle, close }] = useDisclosure();
  const { pathname, push } = useRouter();
  const isCurrent = React.useCallback(
    (link: NavigationRoute) => {
      return pathname.includes(link);
    },
    [pathname],
  );

  const onChangePasswordClick = useChangePasswordDialog();

  const actions = React.useMemo<ButtonProps[]>(() => {
    return [
      {
        children: 'Karya Ilmiah',
        onClick: () => {
          push(NavigationRoute.AdminThesisList);
          close();
        },
        variant: {
          variant: isCurrent(NavigationRoute.AdminThesisList)
            ? 'primary'
            : 'tertiary',
        },
        leftSection: <Book size={16} />,
      },
      {
        children: 'Pengguna',
        onClick: () => {
          push(NavigationRoute.AdminUserList);
          close();
        },
        variant: {
          variant: isCurrent(NavigationRoute.AdminUserList)
            ? 'primary'
            : 'tertiary',
        },
        leftSection: <GraduationCap size={16} />,
      },
      {
        children: 'Program Studi',
        onClick: () => {
          push(NavigationRoute.AdminStudyProgramList);
          close();
        },
        variant: {
          variant: isCurrent(NavigationRoute.AdminStudyProgramList)
            ? 'primary'
            : 'tertiary',
        },
        leftSection: <Bank size={16} />,
      },
      {
        children: 'Admin',
        onClick: () => {
          push(NavigationRoute.AdminEmployeeList);
          close();
        },
        variant: {
          variant: isCurrent(NavigationRoute.AdminEmployeeList)
            ? 'primary'
            : 'tertiary',
        },
        leftSection: <User size={16} />,
      },
    ];
  }, [close, isCurrent, push]);

  const queryMe = useGetMe();

  const { LogoutDialog, openLogoutDialog } = useLogout();

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <LoaderView query={queryMe} isFullScreen>
      {({ data }) => {
        const isUser = data.type === 'user';

        if (isUser) {
          return (
            <Center pos="fixed" top={0} right={0} bottom={0} left={0}>
              <Text textVariant="display">404 Page Not Found</Text>
            </Center>
          );
        }

        return (
          <AppShell
            header={{ height: 60 }}
            navbar={{
              width: 300,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }}
            padding="md"
          >
            <AppShell.Header
              className={structuralStyles.flexbox({
                direction: 'row',
                gap: 'xs',
              })}
            >
              <Burger
                ml={16}
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <BrandIconDirectHome isAdmin w={48} ml={16} />
            </AppShell.Header>

            <AppShell.Navbar p="md">
              <AppShell.Section grow>
                {actions.map((action) => {
                  return <Button {...action} fullWidth />;
                })}
              </AppShell.Section>
              <AppShell.Section>
                <Button
                  variant={{
                    variant: 'tertiary',
                  }}
                  fullWidth
                  onClick={() => {
                    onChangePasswordClick();
                  }}
                  leftSection={<LockSimple size={16} />}
                >
                  Ganti Password
                </Button>
                <Button
                  variant={{
                    variant: 'tertiaryError',
                  }}
                  fullWidth
                  onClick={() => openLogoutDialog()}
                  leftSection={<SignOut size={16} />}
                >
                  Logout
                </Button>
              </AppShell.Section>
            </AppShell.Navbar>

            <AppShell.Main {...props} />
            {LogoutDialog}
          </AppShell>
        );
      }}
    </LoaderView>
  );
}
