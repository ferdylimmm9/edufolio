import size from 'common/styles/size';
import typography from 'common/styles/typography';
import { style, globalStyle, styleVariants } from 'styles';

const base = style({});
const noMargin = {
  true: 0,
  false: size.spacing.md,
};

export const multiSelectStyles = styleVariants(noMargin, (margin) => [
  base,
  { marginBottom: margin },
]);

globalStyle(`${base} .mantine-MultiSelect-label`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-MultiSelect-input`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-MultiSelect-description`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
  ...typography.body2Regular,
});

globalStyle(`${base} .mantine-MultiSelect-error`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
});
