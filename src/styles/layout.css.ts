import { RecipeVariants, recipe, vars } from './styles.css';

const structuralStyles = {
  flexbox: recipe({
    base: {
      display: 'flex',
      alignItems: 'center',
    },
    variants: {
      direction: {
        row: {
          flexDirection: 'row',
        },
        column: {
          flexDirection: 'column',
        },
        rowReverse: {
          flexDirection: 'row-reverse',
        },
        columnReverse: {
          flexDirection: 'column-reverse',
        },
      },
      justify: {
        between: {
          justifyContent: 'space-between',
        },
        around: {
          justifyContent: 'space-around',
        },
        center: {
          justifyContent: 'center',
        },
        end: {
          justifyContent: 'flex-end',
        },
        stretch: {
          justifyContent: 'stretch',
        },
      },
      align: {
        start: {
          alignItems: 'flex-start',
        },
        end: {
          alignItems: 'flex-end',
        },
        stretch: {
          alignItems: 'stretch',
        },
      },
      wrap: {
        true: {
          flexWrap: 'wrap',
          // https://caniuse.com/?search=row-gap
          // Tidak ada yang melebihi 0.3% kecuali IE11
          rowGap: vars.space[4],
        },
        false: {
          flexWrap: 'nowrap',
          rowGap: 0,
        },
      },
      fill: {
        true: {
          flex: 1,
        },
        false: {},
      },
      columnGap: {
        sm: {
          columnGap: 4,
        },
        md: {
          columnGap: 8,
        },
        lg: {
          columnGap: 16,
        },
        xl: {
          columnGap: 32,
        },
        xxl: {
          columnGap: 64,
        },
      },
      gap: {
        xs: {
          gap: 2,
        },
        sm: {
          gap: 4,
        },
        md: {
          gap: 8,
        },
        lg: {
          gap: 16,
        },
        xl: {
          gap: 32,
        },
      },
    },
  }),
  fill: recipe({
    variants: {
      flex: {
        true: {
          flex: 1,
        },
        false: {},
      },
      stretch: {
        true: {
          alignSelf: 'stretch',
        },
        false: {},
      },
      width: {
        true: {
          width: '100%',
        },
        false: {},
      },
      height: {
        true: {
          height: '100%',
        },
        false: {},
      },
    },
  }),
  overflow: recipe({
    base: {},
    variants: {
      x: {
        hidden: {
          overflowX: 'hidden',
        },
        auto: {
          overflowX: 'auto',
        },
        scroll: {
          overflowX: 'scroll',
        },
        visible: {
          overflowX: 'visible',
        },
      },
      y: {
        hidden: {
          overflowY: 'hidden',
        },
        auto: {
          overflowY: 'auto',
        },
        scroll: {
          overflowY: 'scroll',
        },
        visible: {
          overflowY: 'visible',
        },
      },
    },
  }),
};

export type FlexBoxType = RecipeVariants<typeof structuralStyles.flexbox>;
export type FillType = RecipeVariants<typeof structuralStyles.fill>;
export type OverflowType = RecipeVariants<typeof structuralStyles.overflow>;

export default structuralStyles;
