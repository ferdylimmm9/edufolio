import { Card } from '@mantine/core';
import { PageNotFoundSVG } from 'assets/svg';
import Separator from 'components/common/separator';
import UserLayout from 'components/common/user-layout';
import Text from 'components/elements/text';

export default function Custom404() {
  return (
    <Card>
      <PageNotFoundSVG width={300} height={300} />
      <Separator gap={24} />
      <Text textVariant="h1" ta="center">
        Page Not Found
      </Text>
    </Card>
  );
}

Custom404.getLayout = function (page) {
  return <UserLayout isShowBackground={false}>{page}</UserLayout>;
};
