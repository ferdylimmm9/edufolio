import { EmptyDataSVG } from 'assets/svg';
import Text from 'components/elements/text';
import React from 'react';

import ErrorView, { ErrorViewComponentProps } from './error-view-component';
import LoadingViewComponent, {
  LoadingViewComponentProps,
} from './loading-view-component';
import Separator from './separator';

export interface WrapperProps {
  isLoading?: boolean;
  error?: React.ReactNode;
  component?: React.ReactNode;
  errorVertical?: boolean;
  onRetry?: () => void;
  showEmptyComponent?: boolean;
  loadingViewComponentProps?: LoadingViewComponentProps;
  errorViewComponentProps?: ErrorViewComponentProps;
}

export default function FetchWrapperComponent(props: WrapperProps) {
  const {
    isLoading = false,
    error,
    onRetry,
    component,
    loadingViewComponentProps,
    errorVertical = false,
    showEmptyComponent,
    errorViewComponentProps,
  } = props;

  if (isLoading) {
    return <LoadingViewComponent {...loadingViewComponentProps} />;
  }

  if (error) {
    return (
      <ErrorView
        vertical={errorVertical}
        refetch={onRetry}
        {...errorViewComponentProps}
      />
    );
  }

  if (showEmptyComponent) {
    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
        }}
      >
        <EmptyDataSVG />
        <Separator gap={16} />
        <Text>Tidak ada data</Text>
      </div>
    );
  }

  return <>{component}</>;
}
