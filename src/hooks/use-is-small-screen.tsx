import { useMediaQuery } from '@mantine/hooks';
import breakpoints from 'common/styles/breakpoint';
import React from 'react';

interface ResponsiveProviderProps {
  mediaQuery?: string;
  disabled?: boolean;
  children: React.ReactNode;
}
interface ResizeWhenScreenProps {
  desktop: React.FC<void> | React.ReactNode;
  mobile: React.FC<void> | React.ReactNode;
}

export const SmallScreenContext = React.createContext(false);
export function useIsSmallScreen(preference?: boolean) {
  const value = React.useContext(SmallScreenContext);
  return preference || value;
}

export function SmallScreenProvider(props: ResponsiveProviderProps) {
  const { mediaQuery = breakpoints.screenMaxMd, disabled, children } = props;
  const isMobile = useMediaQuery(mediaQuery);
  return (
    <SmallScreenContext.Provider value={!disabled && isMobile}>
      {children}
    </SmallScreenContext.Provider>
  );
}

export function ResizeWhenScreen(props: ResizeWhenScreenProps) {
  const small = useIsSmallScreen();
  if (small) {
    return typeof props.mobile === 'function' ? props.mobile() : props.mobile;
  } else {
    return typeof props.desktop === 'function'
      ? props.desktop()
      : props.desktop;
  }
}
