import {
  DatePickerInput as RawDatePickerInput,
  DatePickerInputProps as RawDatePickerInputProps,
} from '@mantine/dates';
import '@mantine/dates/styles.css';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { datePickerInputStyles } from './styles.css';

export interface DatePickerInputProps
  extends Omit<
    RawDatePickerInputProps,
    'inputWrapperOrder' | 'type' | 'firstDayOfWeek'
  > {
  type?: 'date';
  noMargin?: boolean;
}

const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(
  (props, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const combinedRef: any = useCombinedRefs(ref, innerRef);
    const {
      className,
      defaultValue = new Date(),
      valueFormat = 'DD MMM YYYY',
      type,
      noMargin = false,
      size = 'md',
      radius = 'md',
      ...rest
    } = props;

    return (
      <RawDatePickerInput
        {...rest}
        size={size}
        radius={radius}
        ref={combinedRef}
        firstDayOfWeek={0}
        valueFormat={valueFormat}
        defaultValue={defaultValue}
        inputWrapperOrder={['label', 'input', 'description', 'error']}
        className={classNames(datePickerInputStyles[`${noMargin}`], className)}
      />
    );
  },
);

DatePickerInput.displayName = 'DatePickerInput';

export default DatePickerInput;
