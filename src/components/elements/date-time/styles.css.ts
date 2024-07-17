import size from 'common/styles/size';
import typography from 'common/styles/typography';
import { style, styleVariants, globalStyle } from 'styles';

const base = style({});
const noMargin = {
  true: 0,
  false: size.spacing.md,
};

export const dateTimePickerStyles = styleVariants(noMargin, (margin) => [
  base,
  { marginBottom: margin },
]);

globalStyle(`${base} .mantine-DateTimePicker-label`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-DateTimePicker-input`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-DateTimePicker-description`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
  ...typography.body2Regular,
});

globalStyle(`${base} .mantine-DateTimePicker-error`, {
  marginTop: size.spacing.xs,
  marginBottom: size.spacing.xs,
});
