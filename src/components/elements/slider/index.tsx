import {
  Slider as RawSlider,
  SliderProps as RawSliderProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { sliderStyles } from './styles.css';

export interface SliderProps extends RawSliderProps {
  type?: 'slider';
  noMargin?: boolean;
  sliderSize?: number;
  sliderRadius?: number;
  sliderThumbSize?: number;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const {
    className,
    noMargin,
    type,
    size = 'md',
    radius = 'sm',
    sliderSize = 16,
    sliderRadius = 24,
    sliderThumbSize = 36,
    style,
    ...rest
  } = props;

  return (
    <RawSlider
      {...rest}
      style={{
        '--slider-size': `${sliderSize}px`,
        '--slider-thumb-size': `${sliderThumbSize}px`,
        '--slider-radius': `${sliderRadius}px`,
        ...style,
      }}
      size={size}
      radius={radius}
      ref={combinedRef}
      className={classNames(sliderStyles({ noMargin }), className)}
    />
  );
});

Slider.displayName = 'Slider';

export default Slider;
