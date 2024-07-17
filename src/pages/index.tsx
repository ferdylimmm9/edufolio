import UserLayout from 'components/common/user-layout';
import Home from 'modules/home';

import { NextPageWithLayout } from './_app';

export default Home;

(Home as NextPageWithLayout).getLayout = function (page) {
  return <UserLayout isShowBackground>{page}</UserLayout>;
};
