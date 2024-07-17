import {
  PinInput as RawPinInput,
  PinInputProps as RawPinInputProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { pinInputStyles } from './styles.css';

export interface PinInputProps extends Omit<RawPinInputProps, 'type'> {
  type?: 'pin';
  noMargin?: boolean;
}

const PinInput = forwardRef<HTMLInputElement, PinInputProps>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const {
    className,
    noMargin = false,
    type,
    size = 'md',
    radius = 'md',
    ...rest
  } = props;

  return (
    <RawPinInput
      {...rest}
      size={size}
      radius={radius}
      type="number"
      ref={combinedRef}
      className={classNames(pinInputStyles[`${noMargin}`], className)}
    />
  );
});

PinInput.displayName = 'PinInput';

export default PinInput;
