import { RecipeVariants, recipe, vars } from 'styles';

export const loadingViewStyles = {
  container: recipe({
    base: {
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: 'rgba(129, 131, 147, 0.25)', //opacity high,
    },
  }),
  loaderContainer: recipe({
    base: {
      padding: 12,
      backgroundColor: vars.color.backgroundScreen,
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 8,
    },
  }),
};

export type ContainerType = RecipeVariants<typeof loadingViewStyles.container>;
