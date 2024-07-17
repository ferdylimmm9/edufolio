import { recipe, style } from 'styles';

export const errorViewStyles = {
  container: recipe({
    base: {
      display: 'flex',
      flexDirection: 'row',
      maxWidth: '100%',
      alignItems: 'center',
      cursor: 'pointer',
    },
    variants: {
      vertical: {
        true: {
          flexDirection: 'column',
        },
        false: {},
      },
    },
  }),
  content: recipe({
    base: {
      marginTop: 0,
      marginRight: 8,
      marginBottom: 0,
      marginLeft: 8,
      textAlign: 'center',
    },
    variants: {
      vertical: {
        true: {
          marginTop: 16,
          marginRight: 0,
          marginBottom: 16,
          marginLeft: 0,
        },
        false: {},
      },
    },
  }),
  errorSpan: style({
    fontSize: '12px',
    lineHeight: 1.2,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
  }),
  refreshContainer: style({
    cursor: 'pointer',
  }),
};
