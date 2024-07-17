import {
  MultiSelect as RawMultiSelect,
  MultiSelectProps as RawMultiSelectProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { multiSelectStyles } from './styles.css';

export interface MultiSelectProps
  extends Omit<RawMultiSelectProps, 'inputWrapperOrder'> {
  type?: 'multi-select';
  noMargin?: boolean;
}

const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(
  (props, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const combinedRef: any = useCombinedRefs(ref, innerRef);
    const {
      className,
      noMargin = false,
      size = 'md',
      radius = 'md',
      ...rest
    } = props;

    return (
      <RawMultiSelect
        {...rest}
        size={size}
        radius={radius}
        ref={combinedRef}
        inputWrapperOrder={['label', 'input', 'description', 'error']}
        className={classNames(multiSelectStyles[`${noMargin}`], className)}
      />
    );
  },
);

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;
