import {
  Checkbox as RawCheckbox,
  CheckboxProps as RawCheckboxProps,
} from '@mantine/core';
import { Check, Minus } from '@phosphor-icons/react';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { checkboxStyles } from './styles.css';

export interface CheckboxProps extends RawCheckboxProps {
  type?: 'checkbox';
  noMargin?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const {
    className,
    noMargin = false,
    size = 'md',
    radius = 'md',
    style,
    ...rest
  } = props;

  const icon: CheckboxProps['icon'] = ({ indeterminate, className }) =>
    indeterminate ? (
      <Minus size={16} className={className} />
    ) : (
      <Check size={16} className={className} />
    );

  return (
    <RawCheckbox
      {...rest}
      size={size}
      icon={icon}
      radius={radius}
      ref={combinedRef}
      style={{
        '--checkbox-radius': '24px',
        ...style,
      }}
      className={classNames(checkboxStyles[`${noMargin}`], className)}
    />
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
