import { BackgroundImage, Card, Center } from '@mantine/core';
import { useLogin } from 'api-hooks/auth/mutation';
import assets from 'assets/image';
import notification from 'common/helpers/notification';
import { setToken } from 'common/repositories/token';
import { NavigationRoute } from 'common/routes/routes';
import colors from 'common/styles/colors';
import Separator from 'components/common/separator';
import Button from 'components/elements/button';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import BrandIconDirectHome from 'modules/components/brand-icon-home';
import Container from 'modules/components/container';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { LoginFormSchema, LoginFormType } from './login-form-type';

interface LoginProps {}

export default function Login(props: LoginProps) {
  const { push } = useRouter();
  const defaultValues = React.useMemo<LoginFormType>(() => {
    return {
      password: '',
      nomor_identitas: '',
    };
  }, []);
  const resolver = useYupValidationResolver(LoginFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  const { mutateAsync } = useLogin();

  const onSubmit = React.useCallback(
    async (values: LoginFormType) => {
      try {
        const result = await mutateAsync(values);
        setToken(result.data.token);
        notification.success({
          message: result.message,
        });
        push(NavigationRoute.Home);
      } catch (e) {
        notification.error({
          message: e.message,
        });
      }
    },
    [mutateAsync, push],
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <BackgroundImage
        src={assets.timeBuilding}
        style={{
          opacity: 0.4,
          position: 'fixed',
          inset: 0,
          zIndex: -1,
        }}
      />
      <Container
        style={{
          position: 'fixed',
          zIndex: -2,
          inset: 0,
          backgroundColor: colors.mainBlack,
        }}
      />
      <Container
        style={{
          position: 'fixed',
          inset: 0,
        }}
        flexbox={{
          justify: 'center',
        }}
      >
        <Card withBorder shadow="xs" miw={320} w={420} radius="md" m="auto">
          <Center>
            <BrandIconDirectHome w={128} h={undefined} />
          </Center>
          <Separator gap={16} />
          <Input
            type="text"
            name="nomor_identitas"
            label="Nomor Identitas"
            placeholder="Nomor Identitas"
            required
          />
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            required
          />
          <Separator gap={8} />
          <Input type="submit" text="Login" />
          <Separator gap={16} />
          <Button
            variant={{
              variant: 'secondary',
            }}
            onClick={() => push(NavigationRoute.Register)}
          >
            Register
          </Button>
        </Card>
      </Container>
    </Form>
  );
}
