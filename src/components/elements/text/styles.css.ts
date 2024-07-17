import { recipe } from '@vanilla-extract/recipes';
import typography from 'common/styles/typography';

export const styles = recipe({
  base: {},
  variants: {
    variant: typography,
    wrap: {
      true: {
        wordWrap: 'break-word',
        whiteSpace: 'break-spaces',
      },
      false: {
        wordWrap: 'normal',
        whiteSpace: 'nowrap',
      },
      undefined: {},
    },
  },
  defaultVariants: {
    variant: 'body1Regular',
    wrap: undefined,
  },
});
