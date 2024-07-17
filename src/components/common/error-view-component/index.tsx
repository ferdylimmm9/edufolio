import { Loader } from '@mantine/core';
import { ArrowCounterClockwise } from '@phosphor-icons/react';
import { PageErrorSVG } from 'assets/svg';
import * as React from 'react';

import { errorViewStyles } from './style.css';
import Separator from '../separator';

export interface ErrorViewComponentProps {
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  refetch?: () => void;
  vertical?: boolean;
}

export default function ErrorViewComponent(props: ErrorViewComponentProps) {
  const { isLoading, vertical = false, refetch } = props;

  return (
    <div
      className={errorViewStyles.container({ vertical })}
      onClick={() => {
        if (!isLoading) {
          refetch && refetch();
        }
      }}
    >
      <div className={errorViewStyles.content({ vertical })}>
        <PageErrorSVG />
        <Separator gap={8} />
        <div className={errorViewStyles.errorSpan}>Data Gagal Ditampilkan</div>
      </div>
      <div>
        {isLoading ? (
          <Loader size={vertical ? 40 : 30} />
        ) : (
          <div className={errorViewStyles.refreshContainer}>
            <ArrowCounterClockwise
              width={vertical ? 40 : 30}
              height={vertical ? 40 : 30}
            />
          </div>
        )}
      </div>
    </div>
  );
}
