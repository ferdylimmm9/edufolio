import { TypographyVariantType } from 'common/styles/typography';
import React from 'react';

export default function useTextVariantResponsive(
  textVariant: TypographyVariantType = 'body1Regular',
) {
  const textVariantResponsive = React.useMemo<TypographyVariantType>(() => {
    switch (textVariant) {
      case 'display':
        return 'h1';
      case 'h1':
        return 'h2';
      case 'h2':
        return 'h3';
      case 'h3':
        return 'body1Semibold';

      case 'body1Semibold':
        return 'body2Semibold';
      case 'body2Semibold':
        return 'body3Semibold';

      case 'body1Medium':
        return 'body2Medium';
      case 'body2Medium':
        return 'body3Medium';

      case 'body1Regular':
        return 'body2Regular';
      case 'body2Regular':
        return 'body3Regular';

      case 'buttonDefault':
        return 'buttonSmall';

      case 'linkDefault':
        return 'linkSmall';

      default:
        return 'body2Regular';
    }
  }, [textVariant]);
  return textVariantResponsive;
}
