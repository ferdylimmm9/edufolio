import size from 'common/styles/size';
import typography from 'common/styles/typography';
import { style, styleVariants, globalStyle } from 'styles';

const base = style({});
const noMargin = {
  true: 0,
  false: size.spacing.md,
};

export const numberInputStyles = styleVariants(noMargin, (margin) => [
  base,
  { marginBottom: margin },
]);

globalStyle(`${base} .mantine-NumberInput-label`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-NumberInput-input`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-NumberInput-description`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
  ...typography.body2Regular,
});

globalStyle(`${base} .mantine-NumberInput-error`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
});
