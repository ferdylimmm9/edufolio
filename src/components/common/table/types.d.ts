import { TableTdProps } from '@mantine/core';

export type Column<T> = {
  label: string;
  data: (row: T) => any;
  tdProps?: (row: T) => TableTdProps;
};
