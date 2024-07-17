import size from 'common/styles/size';
import { recipe, style } from 'styles';

export const formControlStyles = {
  required: style({
    color: '#fa5252',
  }),
  container: recipe({
    base: {},
    variants: {
      noMargin: {
        true: {},
        false: {
          marginBottom: size.spacing.md,
        },
      },
    },
  }),
};
