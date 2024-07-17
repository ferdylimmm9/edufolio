import {
  TimeInput as RawTimeInput,
  TimeInputProps as RawTimeInputProps,
} from '@mantine/dates';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { timeInputStyles } from './styles.css';

export interface TimeInputProps
  extends Omit<RawTimeInputProps, 'inputWrapperOrder'> {
  type?: 'time';
  noMargin?: boolean;
}

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const {
    className,
    type,
    noMargin = false,
    size = 'md',
    radius = 'md',
    ...rest
  } = props;

  return (
    <RawTimeInput
      {...rest}
      size={size}
      radius={radius}
      ref={combinedRef}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      className={classNames(timeInputStyles[`${noMargin}`], className)}
    />
  );
});

TimeInput.displayName = 'TimeInput';

export default TimeInput;
