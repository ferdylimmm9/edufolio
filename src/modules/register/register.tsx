import { BackgroundImage, Card } from '@mantine/core';
import { useRegister } from 'api-hooks/auth/mutation';
import assets from 'assets/image';
import notification from 'common/helpers/notification';
import { setToken } from 'common/repositories/token';
import { NavigationRoute } from 'common/routes/routes';
import colors from 'common/styles/colors';
import Separator from 'components/common/separator';
import Button from 'components/elements/button';
import { Input } from 'components/elements/fields';
import Form from 'components/elements/form';
import Text from 'components/elements/text';
import useYupValidationResolver from 'hooks/use-yup-validation-resolver';
import BrandIconDirectHome from 'modules/components/brand-icon-home';
import Container from 'modules/components/container';
import StudyProgramSelect from 'modules/components/selects/study-program-select';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

import { RegisterFormSchema, RegisterFormType } from './register-form-type';

export default function Register() {
  const { replace } = useRouter();
  const defaultValues = React.useMemo<RegisterFormType>(() => {
    return {
      nama_belakang: '',
      nama_depan: '',
      nama_tengah: '',
      password: '',
      nomor_identitas: '',
      deskripsi: '',
      program_studi_id: '',
    };
  }, []);

  const resolver = useYupValidationResolver(RegisterFormSchema());
  const methods = useForm({
    defaultValues,
    resolver,
  });

  const { mutateAsync } = useRegister();

  const onSubmit = React.useCallback(
    async (values: RegisterFormType) => {
      try {
        const result = await mutateAsync(values);
        setToken(result.data.token);
        replace(NavigationRoute.Home);
        notification.success({
          message: result.message,
        });
      } catch (e) {
        notification.error({
          message: e.message,
        });
      }
    },
    [mutateAsync, replace],
  );
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Container>
        <BackgroundImage
          src={assets.timeBuilding}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
            opacity: 0.4,
          }}
        />
        <Container
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -2,
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
          <Card withBorder shadow="xs" miw={320} w={420} radius="md">
            <BrandIconDirectHome w={128} m="auto" mb={8} />
            <Separator gap={16} />
            <Input
              type="text"
              name="nomor_identitas"
              label="Nomor Identitas"
              placeholder="Nomor Identitas"
              required
            />
            <Input
              type="text"
              name="nama_depan"
              label="Nama Depan"
              placeholder="Nama Depan"
              required
            />
            <Input
              type="text"
              name="nama_tengah"
              label="Nama Tengah"
              placeholder="Nama Tengah"
            />
            <Input
              type="text"
              name="nama_belakang"
              label="Nama Belakang"
              placeholder="Nama Belakang"
            />
            <StudyProgramSelect
              name="program_studi_id"
              label="Program Studi"
              placeholder="Program Studi"
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
            <Input type="submit" text="Register" />
            <Separator gap={16} />
            <Button
              variant={{
                variant: 'secondary',
              }}
              onClick={() => replace(NavigationRoute.Login)}
            >
              Login
            </Button>
          </Card>
        </Container>
      </Container>
    </Form>
  );
}
