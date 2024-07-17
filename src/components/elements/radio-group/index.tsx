import {
  Radio as RawRadio,
  RadioProps as RawRadioProps,
  RadioGroupProps as RawRadioGroupProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { radioGroupStyles, radioStyles } from './styles.css';

interface RadioProps extends RawRadioProps {}

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const { className, size = 'md', ...rest } = props;

  return (
    <RawRadio
      {...rest}
      size={size}
      ref={combinedRef}
      variant="outline"
      style={
        {
          '--radio-icon-size': 'calc(var(--radio-size) * 0.7)',
        } as React.CSSProperties
      }
      className={classNames(radioStyles, className)}
    />
  );
});

Radio.displayName = 'Radio';

export interface RadioGroupItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<RawRadioGroupProps, 'children'> {
  disabled?: boolean;
  noMargin?: boolean;
  type?: 'radio-group';
  data: RadioGroupItem[];
  orientation?: 'vertical' | 'horizontal';
  gap?: number | string;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const {
    className,
    data,
    orientation = 'vertical',
    disabled,
    noMargin,
    ...rest
  } = props;

  return (
    <RawRadio.Group {...rest} ref={combinedRef}>
      <div
        className={classNames(
          radioGroupStyles({ orientation, noMargin }),
          className,
        )}
      >
        {data.map((datum, index) => (
          <Radio
            {...datum}
            key={`${datum.value}-${index}`}
            disabled={disabled || datum.disabled}
          />
        ))}
      </div>
    </RawRadio.Group>
  );
});

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
