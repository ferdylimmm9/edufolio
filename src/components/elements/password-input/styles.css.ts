import size from 'common/styles/size';
import typography from 'common/styles/typography';
import { style, globalStyle, styleVariants } from 'styles';

const base = style({});
const noMargin = {
  true: 0,
  false: size.spacing.md,
};

export const passwordInputStyles = styleVariants(noMargin, (margin) => [
  base,
  { marginBottom: margin },
]);

globalStyle(`${base} .mantine-PasswordInput-label`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-PasswordInput-input`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-PasswordInput-description`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
  ...typography.body2Regular,
});

globalStyle(`${base} .mantine-PasswordInput-error`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
});
