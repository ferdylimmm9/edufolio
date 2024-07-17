import { Notification, NotificationProps } from '@mantine/core';
import { CheckCircle, WarningCircle, XCircle } from '@phosphor-icons/react';
import colors from 'common/styles/colors';
import React from 'react';

export type AlertVariantType =
  | 'default'
  | 'info'
  | 'warn'
  | 'error'
  | 'success';

export interface AlertProps extends NotificationProps {
  alertVariant?: AlertVariantType;
}

export default function Alert(props: AlertProps) {
  const { alertVariant = 'default', style, ...rest } = props;

  const icon: NotificationProps['icon'] = React.useMemo(() => {
    switch (alertVariant) {
      case 'info':
        return (
          <WarningCircle weight="fill" size={24} color={colors.lightCyan5} />
        );
      case 'warn':
        return (
          <WarningCircle
            weight="fill"
            size={24}
            color={colors.sentimentWarning}
          />
        );
      case 'error':
        return (
          <XCircle weight="fill" size={24} color={colors.sentimentNegative} />
        );
      case 'success':
        return (
          <CheckCircle
            weight="fill"
            size={24}
            color={colors.sentimentPositive}
          />
        );
      case 'default':
      default:
        return undefined;
    }
  }, [alertVariant]);

  return (
    <Notification
      {...rest}
      icon={icon}
      style={{
        ...style,
        '--notification-color': 'transparent',
        boxShadow: 'none',
        backgroundColor: colors.backgroundDisabled,
        borderRadius: '8px',
      }}
    />
  );
}
