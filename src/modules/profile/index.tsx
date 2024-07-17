import { Flex } from '@mantine/core';
import { useGetMe } from 'api-hooks/auth/query';
import { getToken } from 'common/repositories/token';
import LoaderView from 'components/loader-view';
import CertificationList from 'modules/certification/certification-list';
import EducationList from 'modules/education/education-list';
import ExperienceList from 'modules/experience/experience-list';
import OrganizationList from 'modules/organization/organization-list';
import ThesisList from 'modules/thesis/thesis-list';
import React from 'react';

import ProfileCard from './profile-card';

export default function Profile() {
  const queryMe = useGetMe({
    enabled: !!getToken(),
  });

  return (
    <LoaderView query={queryMe}>
      {({ data }) => {
        const user = data;
        return (
          <Flex
            mih="100vh"
            w="100%"
            maw={768}
            direction="column"
            gap={16}
            p={16}
          >
            <ProfileCard user={user} />
            <ExperienceList user={user} isEditable />
            <EducationList user={user} isEditable />
            <CertificationList user={user} isEditable />
            <OrganizationList user={user} isEditable />
            <ThesisList user={user} isEditable />
          </Flex>
        );
      }}
    </LoaderView>
  );
}
