import { forwardRef } from 'react';

import TextInput, { TextInputProps } from '../text-input';

interface ReadOnlyTextProps extends Omit<TextInputProps, 'withAsterisk'> {}

const ReadOnlyText = forwardRef<HTMLInputElement, ReadOnlyTextProps>(
  (props, ref) => {
    return <TextInput {...props} disabled ref={ref} withAsterisk={false} />;
  },
);

ReadOnlyText.displayName = 'ReadOnlyText';

export default ReadOnlyText;
