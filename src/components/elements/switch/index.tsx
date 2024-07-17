import {
  Switch as RawSwitch,
  SwitchProps as RawSwitchProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { switchStyles } from './styles.css';

export interface SwitchProps extends RawSwitchProps {
  type?: 'switch';
  noMargin?: boolean;
  thumbSize?: number;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const {
    className,
    noMargin = false,
    type,
    size = 'md',
    radius = 'sm',
    style,
    thumbSize = 16,
    ...rest
  } = props;

  return (
    <RawSwitch
      {...rest}
      size={size}
      radius={radius}
      ref={combinedRef}
      style={{
        '--switch-thumb-size': `${thumbSize}px`,
        ...style,
      }}
      className={classNames(switchStyles[`${noMargin}`], className)}
    />
  );
});

Switch.displayName = 'Switch';

export default Switch;
