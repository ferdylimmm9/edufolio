import { ActionIcon, ActionIconProps } from '@mantine/core';
import { Eye } from '@phosphor-icons/react';
import { NavigationRoute } from 'common/routes/routes';
import { useRouter } from 'next/router';
import React from 'react';

interface TableActionRedirectProps extends ActionIconProps {
  route: NavigationRoute;
  id?: string;
}

export default function TableActionRedirect(props: TableActionRedirectProps) {
  const { route, id, ...rest } = props;
  const { push } = useRouter();

  const onClick = React.useCallback(() => {
    const query = id ? { id } : undefined;
    push({
      pathname: route,
      query,
    });
  }, [id, push, route]);

  return (
    <ActionIcon onClick={onClick} variant="transparent" {...rest}>
      <Eye />
    </ActionIcon>
  );
}
