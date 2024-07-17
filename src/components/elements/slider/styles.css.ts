import colors from 'common/styles/colors';
import size from 'common/styles/size';
import typography from 'common/styles/typography';
import { globalStyle, recipe } from 'styles';

export const sliderStyles = recipe({
  variants: {
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
  },
});

globalStyle(`${sliderStyles({}).split(' ')[1]} .mantine-Slider-label`, {
  ...typography.body1Regular,
});

globalStyle(`${sliderStyles({}).split(' ')[1]} .mantine-Slider-input`, {
  ...typography.body1Regular,
});

globalStyle(`${sliderStyles({}).split(' ')[1]} .mantine-Slider-description`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
  ...typography.body2Regular,
});

globalStyle(`${sliderStyles({}).split(' ')[1]} .mantine-Slider-error`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
});

globalStyle(`${sliderStyles({}).split(' ')[1]} .mantine-Slider-thumb`, {
  backgroundColor: 'black',
  borderRadius: 9999,
});

globalStyle(`${sliderStyles({}).split(' ')[1]} .mantine-Slider-mark`, {
  backgroundColor: colors.backgroundDark,
});

globalStyle(`${sliderStyles({}).split(' ')[1]} .mantine-Slider-markLabel`, {
  ...typography.body1Regular,
  marginTop: 16,
});
