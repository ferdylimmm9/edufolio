import { ActionIcon } from '@mantine/core';
import Button from 'components/elements/button/button';
import React from 'react';

export interface ActionButtonProps
  extends Omit<React.ComponentProps<typeof ActionIcon<'button'>>, 'type'> {
  type: 'icon';
}

export interface ButtonProps
  extends Omit<React.ComponentProps<typeof Button>, 'type'> {
  type: 'button';
}

export default function ActionButton(props: ActionButtonProps | ButtonProps) {
  if (props.type === 'button') {
    return <Button {...props} />;
  }

  if (props.type === 'icon') {
    return <ActionIcon {...props} type="button" />;
  }

  return null;
}
