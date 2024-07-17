import {
  Textarea as RawTextarea,
  TextareaProps as RawTextareaProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { textareaStyles } from './styles.css';

export interface TextareaProps
  extends Omit<RawTextareaProps, 'inputWrapperOrder'> {
  type?: 'textarea';
  noMargin?: boolean;
}

const Textarea = forwardRef<HTMLInputElement, TextareaProps>((props, ref) => {
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
    <RawTextarea
      {...rest}
      size={size}
      radius={radius}
      ref={combinedRef}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      className={classNames(textareaStyles[`${noMargin}`], className)}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
