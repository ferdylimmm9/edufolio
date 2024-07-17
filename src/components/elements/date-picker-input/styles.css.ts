import size from 'common/styles/size';
import typography from 'common/styles/typography';
import { style, globalStyle, styleVariants } from 'styles';

const base = style({});
const noMargin = {
  true: 0,
  false: size.spacing.md,
};

export const datePickerInputStyles = styleVariants(noMargin, (margin) => [
  base,
  { marginBottom: margin },
]);

globalStyle(`${base} .mantine-DatePickerInput-label`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-DatePickerInput-input`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-DatePickerInput-description`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
  ...typography.body2Regular,
});

globalStyle(`${base} .mantine-DatePickerInput-error`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
});
