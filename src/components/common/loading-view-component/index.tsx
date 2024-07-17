import { Loader } from '@mantine/core';
import classNames from 'classnames';
import colors from 'common/styles/colors';
import * as React from 'react';
import structuralStyles, { FlexBoxType } from 'styles/layout.css';

import { loadingViewStyles } from './style.css';

export interface LoadingViewComponentProps {
  children?: React.ReactNode;
  overlayOptions?: FlexBoxType;
  className?: string;
}

export default function LoadingViewComponent(props: LoadingViewComponentProps) {
  const { children, overlayOptions, className } = props;

  return (
    <div
      className={classNames(
        loadingViewStyles.container(),
        structuralStyles.flexbox({
          justify: 'center',
          direction: 'column',
          ...overlayOptions,
        }),
        className,
      )}
    >
      {children ?? (
        <div className={loadingViewStyles.loaderContainer()}>
          <Loader size={16} c={colors.foregroundPrimary} />
        </div>
      )}
    </div>
  );
}
