import {
  DateTimePicker as RawDateTimePicker,
  DateTimePickerProps as RawDateTimePickerProps,
} from '@mantine/dates';
import '@mantine/dates/styles.css';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { dateTimePickerStyles } from './styles.css';

export interface DateTimePickerProps
  extends Omit<
    RawDateTimePickerProps,
    'inputWrapperOrder' | 'type' | 'firstDayOfWeek'
  > {
  type?: 'date-time';
  noMargin?: boolean;
}

const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
  (props, ref) => {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const combinedRef: any = useCombinedRefs(ref, innerRef);
    const {
      className,
      defaultValue = new Date(),
      valueFormat = 'DD MMM YYYY HH:mm',
      type,
      noMargin = false,
      size = 'md',
      radius = 'md',
      ...rest
    } = props;

    return (
      <RawDateTimePicker
        {...rest}
        size={size}
        radius={radius}
        ref={combinedRef}
        firstDayOfWeek={0}
        valueFormat={valueFormat}
        defaultValue={defaultValue}
        inputWrapperOrder={['label', 'input', 'description', 'error']}
        className={classNames(dateTimePickerStyles[`${noMargin}`], className)}
      />
    );
  },
);

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
