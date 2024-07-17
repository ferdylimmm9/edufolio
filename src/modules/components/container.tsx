import classNames from 'classnames';
import React from 'react';
import structuralStyles, { FlexBoxType } from 'styles/layout.css';

export interface ContainerProps extends React.ComponentProps<'div'> {
  flexbox?: FlexBoxType;
  withHeader?: boolean;
}

export default function Container(props: ContainerProps) {
  const { className, flexbox, style, withHeader = false, ...rest } = props;

  return (
    <div
      className={classNames(
        structuralStyles.fill({
          width: true,
        }),
        structuralStyles.flexbox(
          flexbox ?? {
            direction: 'column',
            align: 'start',
            fill: true,
          },
        ),
        className,
      )}
      style={{
        minHeight: withHeader ? 'calc(100vh - 66px)' : undefined,
        ...style,
      }}
      {...rest}
    />
  );
}
