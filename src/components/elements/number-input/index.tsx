import {
  NumberInput as RawNumberInput,
  NumberInputProps as RawNumberInputProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { numberInputStyles } from './styles.css';

export interface NumberInputProps
  extends Omit<RawNumberInputProps, 'inputWrapperOrder' | 'type'> {
  type?: 'number';
  noMargin?: boolean;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
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
      <RawNumberInput
        {...rest}
        size={size}
        radius={radius}
        hideControls
        ref={combinedRef}
        inputWrapperOrder={['label', 'input', 'description', 'error']}
        className={classNames(numberInputStyles[`${noMargin}`], className)}
      />
    );
  },
);

NumberInput.displayName = 'NumberInput';

export default NumberInput;
