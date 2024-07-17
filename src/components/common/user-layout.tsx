import { BackgroundImage } from '@mantine/core';
import assets from 'assets/image';
import colors from 'common/styles/colors';
import Container, { ContainerProps } from 'modules/components/container';
import React from 'react';

import Footer from './footer';
import Header from './header';

interface UserLayoutProps extends ContainerProps {
  isShowBackground?: boolean;
}

export default function UserLayout(props: UserLayoutProps) {
  const { isShowBackground = false } = props;
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <Container>
      {isShowBackground && (
        <>
          <Container
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: -2,
              backgroundColor: colors.mainBlack,
            }}
          />
          <BackgroundImage
            src={assets.repositoryBackground}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: -1,
              opacity: 0.2,
            }}
          />
        </>
      )}
      <Header />
      <Container
        {...props}
        flexbox={{
          direction: 'column',
        }}
        style={{
          minHeight: 'calc(100vh - 185px)',
        }}
        withHeader
      />
      <Footer />
    </Container>
  );
}
