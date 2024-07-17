import { Table, TableProps, TableTrProps } from '@mantine/core';
import Text from 'components/elements/text';

import { Column } from './types';

export interface TableComponentProps<T> {
  data: T[];
  columns: Column<T>[];
  rowProps?: (row: T, index: number) => TableTrProps;
  tableScrollContainerProps?: React.ComponentProps<
    typeof Table.ScrollContainer
  >;
  tableProps?: TableProps;
  onClickRow?: (data: T, index: number) => void;
  rowKey: (row: T, index: number) => React.Key;
}

export default function TableComponent<T>(props: TableComponentProps<T>) {
  const { tableProps, data, columns, onClickRow, rowKey, rowProps } = props;

  return (
    <Table.ScrollContainer minWidth="800px">
      <Table
        stickyHeader
        stickyHeaderOffset={0}
        highlightOnHover
        {...tableProps}
      >
        <Table.Thead>
          <Table.Tr>
            {columns.map((column) => (
              <Table.Th key={column.label}>
                <Text textVariant="body1Semibold">{column.label}</Text>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((item, index) => {
            return (
              <>
                <Table.Tr
                  key={rowKey(item, index)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickRow?.(item, index);
                  }}
                  {...rowProps?.(item, index)}
                >
                  {columns.map((column) => {
                    const content = column.data(item);
                    return (
                      <Table.Td key={content} {...column.tdProps?.(item)}>
                        <Text textVariant="body1Regular">{content}</Text>
                      </Table.Td>
                    );
                  })}
                </Table.Tr>
              </>
            );
          })}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
