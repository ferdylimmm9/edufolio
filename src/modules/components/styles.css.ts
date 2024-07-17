import { recipe } from '@vanilla-extract/recipes';

export const commonStyles = {
  rootContainer: recipe({
    base: {
      minWidth: '100vw',
      minHeight: '100vh',
    },
  }),
};
