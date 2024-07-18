import { Loader, Text } from '@mantine/core';
import { X } from '@phosphor-icons/react';
import { ApiResult, UseQueryResultType } from 'api/type';
import notification from 'common/helpers/notification';
import colors from 'common/styles/colors';
import React from 'react';

function Container(props: React.ComponentProps<'div'>) {
  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        ...props.style,
      }}
    />
  );
}

interface LoaderViewProps<T> {
  query: UseQueryResultType<T>;
  children: (data: ApiResult<T>) => any;
  isFullScreen?: boolean;
}

export default function LoaderView<T>(props: LoaderViewProps<T>) {
  const { query, children, isFullScreen = false } = props;
  const { error, data, isFetching } = query;
  console.log(error);
  React.useEffect(() => {
    const message = error?.message;
    message &&
      notification.error({
        message,
      });
  }, [error?.message]);

  if (isFetching) {
    return (
      <Container
        style={
          isFullScreen
            ? { position: 'fixed', inset: 0 }
            : {
                margin: 'auto',
              }
        }
      >
        <Loader size={48} mb={24} />
        <Text ta="center" fw={600} fz={24}>
          Loading
        </Text>
      </Container>
    );
  }

  if (error)
    return (
      <Container>
        <X size={48} color={colors.sentimentNegative} />
        <Text fw={600} fz={24} color={colors.sentimentNegative}>
          Error
        </Text>
        <Text ta="center" fw={400} fz={16}>
          {error.message}
        </Text>
      </Container>
    );

  if (data === undefined) return data;

  return children(data);
}
