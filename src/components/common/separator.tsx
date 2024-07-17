import * as React from 'react';

interface Props {
  direction?: 'horizontal' | 'vertical' | 'both';
  gap: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function Separator(props: Props) {
  const { direction, gap: _gap, children, style, className } = props;
  const gap = React.useMemo(() => {
    const temp = children ? _gap : (_gap - 2) / 2;
    switch (direction) {
      case 'horizontal':
        return { marginLeft: temp, marginRight: temp };

      case 'vertical':
        return { marginTop: temp, marginBottom: temp };

      default:
        return { margin: temp };
    }
  }, [_gap, children, direction]);
  return (
    <div style={{ ...style, ...gap }} className={className}>
      {children || <div style={{ width: 2, height: 2 }} />}
    </div>
  );
}
