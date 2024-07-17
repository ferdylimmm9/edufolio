const primitiveSize = {
  radius: {
    zero: 0,
    sm: 4,
    md: 8,
    lg: 16,
    fullRound: 10000,
  },
  spacing: {
    zero: 0,
    quarter: 2,
    half: 4,
    one: 8,
    oneHalf: 12,
    two: 16,
    three: 24,
    four: 32,
    five: 40,
    six: 48,
  },
};

const size = {
  radius: {
    none: primitiveSize.radius.zero,
    minimal: primitiveSize.radius.sm,
    rounded: primitiveSize.radius.md,
    full: primitiveSize.radius.fullRound,
  },
  spacing: {
    none: primitiveSize.spacing.zero,
    xxs: primitiveSize.spacing.quarter,
    xs: primitiveSize.spacing.half,
    sm: primitiveSize.spacing.one,
    smd: primitiveSize.spacing.oneHalf,
    md: primitiveSize.spacing.two,
    lg: primitiveSize.spacing.three,
    xl: primitiveSize.spacing.four,
    xxl: primitiveSize.spacing.five,
    xxxl: primitiveSize.spacing.six,
  },
};

export default size;
