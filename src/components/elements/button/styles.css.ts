import typography from 'common/styles/typography';
import { RecipeVariants, recipe, vars } from 'styles';
const transition = 'all 180ms ease-in-out';

export const buttonStyles = recipe({
  base: { transition },
  variants: {
    size: {
      default: {
        ...typography.buttonDefault,
        height: 48,
        paddingTop: 12,
        paddingBottom: 12,
      },
      defaultLink: {
        ...typography.linkDefault,
        height: 48,
        paddingTop: 12,
        paddingBottom: 12,
      },
      small: {
        ...typography.buttonSmall,
        height: 32,
        paddingTop: 6,
        paddingBottom: 6,
      },
      smallLink: {
        ...typography.linkSmall,
        height: 32,
        paddingTop: 6,
        paddingBottom: 6,
      },
    },
    variant: {
      primary: {
        backgroundColor: vars.color.mainBlack,
        color: vars.color.foregroundLight,
        ':hover': {
          backgroundColor: vars.color.foregroundSecondary,
          color: vars.color.foregroundLight,
        },
        ':disabled': {
          backgroundColor: vars.color.borderPrimary,
          color: vars.color.foregroundLight,
        },
      },
      primaryError: {
        backgroundColor: vars.color.sentimentNegative,
        color: vars.color.mainWhite,
        ':hover': {
          backgroundColor: vars.color.sentimentNegativeHover,
        },
        ':disabled': {
          backgroundColor: vars.color.borderPrimary,
          color: vars.color.foregroundLight,
        },
      },
      secondary: {
        border: `1px solid ${vars.color.borderPrimary}`,
        color: vars.color.foregroundPrimary,
        backgroundColor: vars.color.backgroundScreen,
        ':hover': {
          border: `1px solid ${vars.color.borderActive}`,
        },
        ':disabled': {
          backgroundColor: vars.color.borderPrimary,
          color: vars.color.foregroundLight,
        },
      },
      secondaryError: {
        border: `1px solid ${vars.color.sentimentNegative}`,
        color: vars.color.sentimentNegative,
        backgroundColor: vars.color.backgroundScreen,
        ':hover': {
          color: vars.color.sentimentNegativeHover,
          border: `1px solid ${vars.color.sentimentNegativeHover}`,
        },
        ':disabled': {
          backgroundColor: vars.color.borderPrimary,
          color: vars.color.foregroundLight,
        },
      },
      secondaryBg: {
        backgroundColor: vars.color.lightCyan1,
        color: vars.color.foregroundPrimary,
        ':hover': {
          backgroundColor: vars.color.lightCyan2,
        },
        ':disabled': {
          backgroundColor: vars.color.borderPrimary,
          color: vars.color.foregroundLight,
        },
      },
      tertiary: {
        border: 'none',
        backgroundColor: vars.color.backgroundScreen,
        color: vars.color.mainBlack,
        ':hover': {
          backgroundColor: vars.color.backgroundDisabled,
        },
        ':disabled': {
          backgroundColor: vars.color.borderPrimary,
          color: vars.color.foregroundLight,
        },
      },

      tertiaryError: {
        border: 'none',
        backgroundColor: vars.color.backgroundScreen,
        color: vars.color.sentimentNegative,
        ':hover': {
          color: vars.color.mainWhite,
          backgroundColor: vars.color.sentimentNegative,
        },
        ':disabled': {
          backgroundColor: vars.color.borderPrimary,
          color: vars.color.foregroundLight,
        },
      },
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'primary',
  },
});

export type ButtonVariantType = RecipeVariants<typeof buttonStyles>;
