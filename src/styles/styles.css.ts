import { createGlobalTheme } from '@vanilla-extract/css';
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import colors from 'common/styles/colors';

export { globalStyle, style, styleVariants } from '@vanilla-extract/css';
export { recipe } from '@vanilla-extract/recipes';
export type { RecipeVariants } from '@vanilla-extract/recipes';

// vars

export const vars = createGlobalTheme(':root', {
  color: colors,
  space: {
    none: '0',
    2: '2px',
    4: '4px',
    8: '8px',
    16: '16px',
    32: '32px',
    64: '64px',
  },
  borderRadius: {
    none: '0',
    2: '2px',
    4: '4px',
    8: '8px',
    16: '16px',
    32: '32px',
    64: '64px',
    full: '99999px',
  },
  fontFamily: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  fontSize: {
    11: '11px',
    12: '12px',
    13: '13px',
    15: '15px',
    16: '16px',
    17: '17px',
    20: '20px',
    22: '22px',
    28: '28px',
    34: '34px',
  },
  lineHeight: {
    13: '13px',
    16: '16px',
    18: '18px',
    20: '20px',
    22: '22px',
    25: '25px',
    28: '28px',
    34: '34px',
    41: '41px',
  },
});

//sprinkles

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex'],
    flexDirection: ['row', 'column'],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    justifyContent: ['stretch', 'flex-start', 'center', 'flex-end'],
    gap: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    width: ['100vw'],
    height: ['100vh'],
    borderRadius: vars.borderRadius,
    fontFamily: vars.fontFamily,
    fontSize: vars.fontSize,
    lineHeight: vars.lineHeight,
    textAlign: ['center'],
  },
  shorthands: {
    p: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    m: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
    placeItems: ['alignItems', 'justifyContent'],
    typeSize: ['fontSize', 'lineHeight'],
  },
});

const colorModeProperties = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: { '@media': '(prefers-color-scheme: dark)' },
  },
  defaultCondition: 'lightMode',
  properties: {},
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  colorModeProperties,
);
