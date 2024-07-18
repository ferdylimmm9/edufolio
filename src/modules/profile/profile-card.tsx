import { Card, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Lock, Pen } from '@phosphor-icons/react';
import { MeModel } from 'api-hooks/auth/model';
import colors from 'common/styles/colors';
import { replaceWithBr } from 'common/utils/string';
import Button from 'components/elements/button';
import Text from 'components/elements/text';
import useChangePasswordDialog from 'hooks/use-change-password-dialog';
import Image from 'next/image';
import React from 'react';

import ProfileForm from './profile-form';

interface ProfileCardProps {
  user: MeModel;
}

export default function ProfileCard(props: ProfileCardProps) {
  const { user } = props;

  const [isOpened, { close, open }] = useDisclosure();
  const onChangePasswordClick = useChangePasswordDialog();

  return (
    <>
      <Card withBorder pos="relative">
        <Flex direction="column" gap={4}>
          <Text textVariant="h1">Profile</Text>
          <Text textVariant="body1Semibold">Foto Profil:</Text>
          <Image
            width={100}
            height={100}
            alt={user.nomorIdentitas}
            src={user.photoUrl || '/icon512_rounded.png'}
            style={{
              border: `1px solid ${colors.borderOverlay}`,
              objectPosition: 'top',
              objectFit: 'cover',
            }}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = '/icon512_rounded.png';
            }}
          />
          <Text textVariant="body1Semibold">Nama Depan:</Text>
          <Text>{user.namaDepan}</Text>
          <Text textVariant="body1Semibold">Nama Tengah:</Text>
          <Text>{user.namaTengah || '-'}</Text>
          <Text textVariant="body1Semibold">Nama Belakang:</Text>
          <Text>{user.namaBelakang || '-'}</Text>
          <Text textVariant="body1Semibold">Program Studi:</Text>
          <Text>
            {[user.programStudi.kode, user.programStudi.nama].join(' - ')}
          </Text>
          <Text textVariant="body1Semibold">Deskripsi:</Text>
          <Text>
            <div
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(user.deskripsi || '-'),
              }}
            />
          </Text>
          <Button mt={16} onClick={open} rightSection={<Pen size={16} />}>
            Ubah Profile
          </Button>
          <Button
            mt={8}
            variant={{
              variant: 'secondary',
            }}
            onClick={onChangePasswordClick}
            rightSection={<Lock size={16} />}
          >
            Ubah Password
          </Button>
        </Flex>
      </Card>
      <Drawer
        position="right"
        size="lg"
        onClose={close}
        opened={isOpened}
        title={<Text textVariant="h2">Ubah Profil</Text>}
      >
        <ProfileForm user={user} onClose={close} />
      </Drawer>
    </>
  );
}
