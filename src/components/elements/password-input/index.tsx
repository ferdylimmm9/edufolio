import {
  PasswordInput as RawPasswordInput,
  PasswordInputProps as RawPasswordInputProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { passwordInputStyles } from './styles.css';

export interface PasswordInputProps
  extends Omit<RawPasswordInputProps, 'inputWrapperOrder'> {
  type?: 'password';
  noMargin?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const combinedRef = useCombinedRefs(ref, innerRef);
    const {
      className,
      noMargin = false,
      type,
      size = 'md',
      radius = 'md',
      ...rest
    } = props;

    return (
      <RawPasswordInput
        {...rest}
        size={size}
        radius={radius}
        ref={combinedRef}
        inputWrapperOrder={['label', 'input', 'description', 'error']}
        className={classNames(passwordInputStyles[`${noMargin}`], className)}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
