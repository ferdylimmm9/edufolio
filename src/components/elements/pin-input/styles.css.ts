import size from 'common/styles/size';
import typography from 'common/styles/typography';
import { style, styleVariants, globalStyle, vars } from 'styles';

const base = style({});
const noMargin = {
  true: 0,
  false: size.spacing.md,
};

export const pinInputStyles = styleVariants(noMargin, (margin) => [
  base,
  { marginBottom: margin },
]);

globalStyle(`${base} .mantine-PinInput-input`, {
  ...typography.body1Regular,
});

globalStyle(`${base} .mantine-PinInput-input[data-disabled]`, {
  // backgroundColor: 'red',
  backgroundColor: vars.color.backgroundDisabled,
  border: 'none',
});
