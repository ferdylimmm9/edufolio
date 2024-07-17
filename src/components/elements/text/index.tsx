import { Text as RawText, TextProps as RawTextProps } from '@mantine/core';
import classNames from 'classnames';
import colors from 'common/styles/colors';
import { TypographyVariantType } from 'common/styles/typography';
import { useIsSmallScreen } from 'hooks/use-is-small-screen';
import { ReactNode, forwardRef } from 'react';

import { styles } from './styles.css';
import useTextVariantResponsive from './use-text-variant-responsive';

export interface TextProps extends Omit<RawTextProps, 'children'> {
  id?: string;
  textVariant?: TypographyVariantType;
  textColor?: keyof typeof colors;
  wrap?: boolean;
  isReponsive?: boolean;
  children?: ReactNode;
}

const Text = forwardRef<HTMLDivElement, TextProps>((props, ref) => {
  const {
    className,
    textVariant,
    textColor,
    style,
    wrap,
    isReponsive = true,
    ...rest
  } = props;
  const small = useIsSmallScreen();
  const textVariantResponsive = useTextVariantResponsive(textVariant);
  const _textVariant =
    small && isReponsive ? textVariantResponsive : textVariant;

  return (
    <RawText
      {...rest}
      ref={ref}
      style={{ color: textColor ? colors[textColor] : undefined, ...style }}
      className={classNames(styles({ variant: _textVariant, wrap }), className)}
    />
  );
});

Text.displayName = 'Text';

export default Text;
