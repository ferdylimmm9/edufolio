import {
  TagsInput as RawTagsInput,
  TagsInputProps as RawTagsInputProps,
} from '@mantine/core';
import classNames from 'classnames';
import useCombinedRefs from 'hooks/use-combined-refs';
import { forwardRef, useRef } from 'react';

import { tagsInputStyles } from './styles.css';

export interface TagsInputProps
  extends Omit<RawTagsInputProps, 'inputWrapperOrder' | 'type'> {
  type?: 'tags';
  noMargin?: boolean;
}

const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>((props, ref) => {
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
    <RawTagsInput
      {...rest}
      size={size}
      radius={radius}
      ref={combinedRef}
      rightSection={rightSection}
      inputWrapperOrder={['label', 'input', 'description', 'error']}
      className={classNames(tagsInputStyles[`${noMargin}`], className)}
    />
  );
});

TagsInput.displayName = 'TagsInput';

export default TagsInput;
