import size from 'common/styles/size';
import typography from 'common/styles/typography';
import { globalStyle, style, styleVariants } from 'styles';

const base = style({});
const noMargin = {
  true: 0,
  false: size.spacing.md,
};

export const checkboxStyles = styleVariants(noMargin, (margin) => [
  base,
  { marginBottom: margin },
]);

globalStyle(`${base} .mantine-Checkbox-label`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-Checkbox-input`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-Checkbox-description`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
  ...typography.body2Regular,
});

globalStyle(`${base} .mantine-Checkbox-error`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
});
