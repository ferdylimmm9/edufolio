import { NotificationData, showNotification } from '@mantine/notifications';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import colors from 'common/styles/colors';

interface NotificationProps extends NotificationData {}

const notification = {
  info: (props: NotificationProps) => {
    return showNotification({
      ...props,
      c: 'blue',
      message: props.message,
    });
  },
  success: (props: NotificationProps) =>
    showNotification({
      ...props,
      icon: <CheckCircle size={50} color={colors.sentimentPositive} />,
      styles: {
        root: { backgroundColor: colors.statusPositive1 },
        description: { color: colors.sentimentPositive },
        icon: {
          backgroundColor: 'transparent',
        },
      },
      message: props.message,
    }),
  error: (props: NotificationProps) =>
    showNotification({
      ...props,
      icon: <XCircle size={50} color={colors.sentimentNegative} />,
      styles: {
        root: { backgroundColor: colors.statusNegative1 },
        description: { color: colors.sentimentNegative },
        icon: {
          backgroundColor: 'transparent',
        },
      },
      message: props.message,
    }),
};

export default notification;
