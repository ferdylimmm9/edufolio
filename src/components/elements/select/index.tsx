import {
  Select as RawSelect,
  SelectProps as RawSelectProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { selectStyles } from './styles.css';

export interface SelectProps extends Omit<RawSelectProps, 'inputWrapperOrder'> {
  type?: 'select';
  noMargin?: boolean;
}

const Select = forwardRef<HTMLInputElement, SelectProps>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const {
    className,
    noMargin = false,
    size = 'md',
    radius = 'md',
    allowDeselect = false,
    clearable = true,
    ...rest
  } = props;

  return (
    <RawSelect
      {...rest}
      size={size}
      clearable={clearable}
      radius={radius}
      ref={combinedRef}
      allowDeselect={allowDeselect}
      className={classNames(selectStyles[`${noMargin}`], className)}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
    />
  );
});

Select.displayName = 'Select';

export default Select;
