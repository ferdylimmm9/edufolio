import {
  Button as RawButton,
  ButtonProps as RawButtonProps,
} from '@mantine/core';
import classNames from 'classnames';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { ButtonVariantType, buttonStyles } from './styles.css';

export interface ButtonProps
  extends Omit<RawButtonProps, 'variant' | 'radius'>,
    Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'children' | 'color' | 'style'
    > {
  error?: boolean;
  noPadding?: boolean;
  variant?: ButtonVariantType;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    type = 'button',
    className,
    error: isError,
    noPadding,
    variant,
    leftSection = <span />,
    rightSection = <span />,
    ...rest
  } = props;

  return (
    <RawButton
      {...rest}
      ref={ref}
      type={type}
      radius="md"
      className={classNames(buttonStyles(variant), className)}
      leftSection={leftSection}
      rightSection={rightSection}
    />
  );
});

Button.displayName = 'Button';

export default Button;
