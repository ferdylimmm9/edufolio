import size from 'common/styles/size';
import typography from 'common/styles/typography';
import { style, styleVariants, globalStyle } from 'styles';

const base = style({});
const noMargin = {
  true: 0,
  false: size.spacing.md,
};

export const textareaStyles = styleVariants(noMargin, (margin) => [
  base,
  { marginBottom: margin },
]);

globalStyle(`${base} .mantine-Textarea-label`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-Textarea-input`, {
  ...typography.body1Regular,
  minHeight: 160,
});

globalStyle(`${base} .mantine-Textarea-description`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
  ...typography.body2Regular,
});

globalStyle(`${base} .mantine-Textarea-error`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
});
