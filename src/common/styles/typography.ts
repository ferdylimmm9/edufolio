export const fontFamily = 'var(--font-ibm_plex_sans)';

const typography = {
  display: {
    fontFamily,
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: 700,
    letterSpacing: 0.02,
  },
  h1: {
    fontFamily,
    fontSize: '24px',
    lineHeight: '36px',
    fontWeight: 600,
    letterSpacing: 0.015,
  },
  h2: {
    fontFamily,
    fontSize: '20px',
    lineHeight: '30px',
    fontWeight: 600,
    letterSpacing: 0.01,
  },
  h3: {
    fontFamily,
    fontSize: '18px',
    lineHeight: '27px',
    fontWeight: 600,
    letterSpacing: 0.015,
  },

  body1Semibold: {
    fontFamily,
    fontSize: '14px',
    lineHeight: '21px',
    fontWeight: 600,
  },
  body1Medium: {
    fontFamily,
    fontSize: '14px',
    lineHeight: '21px',
    fontWeight: 500,
  },
  body1Regular: {
    fontFamily,
    fontSize: '14px',
    lineHeight: '21px',
    fontWeight: 400,
  },

  body2Semibold: {
    fontFamily,
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 600,
  },
  body2Medium: {
    fontFamily,
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 500,
  },
  body2Regular: {
    fontFamily,
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 400,
  },

  body3Semibold: {
    fontFamily,
    fontSize: '10px',
    lineHeight: '15px',
    fontWeight: 600,
  },
  body3Medium: {
    fontFamily,
    fontSize: '10px',
    lineHeight: '15px',
    fontWeight: 500,
  },
  body3Regular: {
    fontFamily,
    fontSize: '10px',
    lineHeight: '15px',
    fontWeight: 400,
  },

  buttonDefault: {
    fontFamily,
    fontSize: '14px',
    lineHeight: '21px',
    fontWeight: 600,
  },
  buttonSmall: {
    fontFamily,
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 600,
  },

  linkDefault: {
    fontFamily,
    textDecoration: 'underline',
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: 600,
  },
  linkSmall: {
    fontFamily,
    textDecoration: 'underline',
    fontSize: '12px',
    lineHeight: '15px',
    fontWeight: 600,
  },
};

export type TypographyVariantType = keyof typeof typography;

export default typography;
