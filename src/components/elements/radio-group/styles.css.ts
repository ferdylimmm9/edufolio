import size from 'common/styles/size';
import typography from 'common/styles/typography';
import { globalStyle, style, recipe } from 'styles';

export const radioStyles = style({});

globalStyle(`${radioStyles} .mantine-Radio-label`, {
  ...typography.body1Regular,
});

globalStyle(`${radioStyles} .mantine-Radio-input`, {
  ...typography.body1Regular,
});

globalStyle(`${radioStyles} .mantine-Radio-description`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
  ...typography.body2Regular,
});

globalStyle(`${radioStyles} .mantine-Radio-error`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
});

export const radioGroupStyles = recipe({
  base: {
    display: 'flex',
    rowGap: 8,
    columnGap: 32,
    paddingTop: 8,
  },
  variants: {
    orientation: {
      vertical: {
        flexDirection: 'column',
      },
      horizontal: {
        flexDirection: 'row',
      },
    },
    noMargin: {
      true: {
        marginBottom: 0,
      },
      false: {
        marginBottom: size.spacing.md,
      },
    },
  },
  defaultVariants: {
    noMargin: false,
    orientation: 'horizontal',
  },
});

globalStyle(`${radioGroupStyles({}).split(' ')[1]} .mantine-RadioGroup-label`, {
  ...typography.body1Regular,
});

globalStyle(`${radioGroupStyles({}).split(' ')[1]} .mantine-RadioGroup-input`, {
  ...typography.body1Regular,
});

globalStyle(
  `${radioGroupStyles({}).split(' ')[1]} .mantine-RadioGroup-description`,
  {
    marginTop: size.spacing.xs,
    marginBottom: size.spacing.xs,
    ...typography.body2Regular,
  },
);

globalStyle(`${radioGroupStyles({}).split(' ')[1]} .mantine-RadioGroup-error`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
});
