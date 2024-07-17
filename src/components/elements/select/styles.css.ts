import size from 'common/styles/size';
import typography from 'common/styles/typography';
import { style, styleVariants, globalStyle } from 'styles';

const base = style({});
const noMargin = {
  true: 0,
  false: size.spacing.md,
};

export const selectStyles = styleVariants(noMargin, (margin) => [
  base,
  { marginBottom: margin },
]);

globalStyle(`${base} .mantine-Select-label`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-Select-input`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-Select-description`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
  ...typography.body2Regular,
});

globalStyle(`${base} .mantine-Select-error`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
});

globalStyle(`.mantine-Select-option`, {
  ...typography.body1Regular,
});
