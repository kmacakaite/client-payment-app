import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

export type ColumnConfig<T> = {
  header: string;
  field?: keyof T;
  render?: (item: T) => React.ReactNode;
};

type CustomTableProps<T> = {
  columns: ColumnConfig<T>[];
  items: T[];
};

export const CustomTable = <T,>({ columns, items }: CustomTableProps<T>) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell key={column.header}>{column.header}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            {columns.map(column => (
              <TableCell key={column.header}>
                {column.render ? column.render(item) : column.field ? item[column.field] as unknown as React.ReactNode : null}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
