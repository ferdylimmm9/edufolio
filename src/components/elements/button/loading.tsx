import { ActionIcon, ActionIconProps, Loader } from '@mantine/core';
import colors from 'common/styles/colors';
import { mantineColors } from 'common/styles/default-colors';
import * as React from 'react';

import Button, { ButtonProps } from './button';

interface LoadingProps {
  isLoading?: boolean;
  loaderColor?: string;
}
export type LoadingButtonProps = Omit<ButtonProps, 'leftIcon'> &
  LoadingProps & {
    icon?: (size: number) => React.ReactNode;
  };

export type LoadingActionIconProps = ActionIconProps &
  LoadingProps & {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };

export default function LoadingButton(props: LoadingButtonProps) {
  const { disabled, isLoading, icon, loaderColor, ...rest } = props;
  return (
    <Button
      {...rest}
      disabled={disabled || isLoading}
      leftSection={
        !isLoading ? (
          icon?.(16)
        ) : (
          <Loader color={loaderColor || colors.mainWhite} size={16} />
        )
      }
    />
  );
}

export function LoadingActionIcon(props: LoadingActionIconProps) {
  const { disabled, isLoading, loaderColor, size, ...rest } = props;
  return isLoading ? (
    <Loader color={loaderColor || mantineColors()} size={size} />
  ) : (
    <ActionIcon {...rest} />
  );
}
