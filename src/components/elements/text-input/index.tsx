import {
  TextInput as RawTextInput,
  TextInputProps as RawTextInputProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { textInputStyles } from './styles.css';

export interface TextInputProps
  extends Omit<RawTextInputProps, 'inputWrapperOrder' | 'type'> {
  type?: 'text' | 'email' | 'tel';
  noMargin?: boolean;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const combinedRef: any = useCombinedRefs(ref, innerRef);
  const {
    className,
    rightSection,
    noMargin = false,
    size = 'md',
    radius = 'md',
    ...rest
  } = props;

  return (
    <RawTextInput
      {...rest}
      size={size}
      radius={radius}
      ref={combinedRef}
      rightSection={rightSection}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      className={classNames(textInputStyles[`${noMargin}`], className)}
    />
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
