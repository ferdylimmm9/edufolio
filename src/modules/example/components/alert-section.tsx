import { SimpleGrid } from '@mantine/core';
import Text from 'components/elements/text';
import Alert, { AlertProps } from 'components/widgets/alert';
import React from 'react';

const AlertTypeEnum = {
  default: 'default',
  warning: 'warning',
  success: 'success',
  info: 'info',
  error: 'error',
} as const;

type AlertTypeEnumValue = keyof typeof AlertTypeEnum;

export default function AlertSection() {
  const options = Object.keys(AlertTypeEnum).map((key) => AlertTypeEnum[key]);
  const props = React.useCallback<(value: AlertTypeEnumValue) => AlertProps>(
    (value) => {
      switch (value) {
        case 'warning':
          return { alertVariant: 'warn' };
        case 'success':
          return { alertVariant: 'success' };
        case 'info':
          return { alertVariant: 'info' };
        case 'error':
          return { alertVariant: 'error' };
        case 'default':
        default:
          return {};
      }
    },
    [],
  );
  return (
    <>
      <Text textVariant="h1">Alert Section</Text>
      <SimpleGrid cols={2}>
        {options.map((option) => (
          <Alert {...props(option)}>
            <Text textVariant="body2Regular">
              This is a warning alert. Please keep the messages compact
            </Text>
          </Alert>
        ))}
      </SimpleGrid>
    </>
  );
}
