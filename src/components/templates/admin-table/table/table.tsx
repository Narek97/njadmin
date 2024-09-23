import React, { FC } from 'react';
import {
  Table as MuiTable,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { AdminTableColumnType, AdminTableRowType } from '@/utils/ts/types/admin-table.types';

interface ITable {
  columns: Array<AdminTableColumnType>;
  rows: Array<AdminTableRowType>;
  onHandleSortTable?: (sortBy: string, sortType: 'asc' | 'desc') => void;
  onHandleMultiSelect?: (id: number) => void;
  actions?: {
    onHandleEdit: (row: AdminTableRowType) => void;
    onHandleDelete: (row: AdminTableRowType) => void;
  };
  isLoading: boolean;
}

const Table: FC<ITable> = ({
  columns,
  rows,
  onHandleSortTable,
  onHandleMultiSelect,
  actions,

  isLoading,
}) => {
  // const user = useRecoilValue(userState);

  const isCheckbox = columns.some(colum => colum.key === 'checkbox');

  return (
    <div style={{ maxWidth: '70dvw' }}>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <TableContainer>
          <MuiTable stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align || 'center'} style={column.style}>
                    <span>{column.name}</span>
                    {onHandleSortTable && column.isSortable && (
                      <span>
                        <button onClick={() => onHandleSortTable(column.key, 'asc')}>ASC</button>
                        <button onClick={() => onHandleSortTable(column.key, 'desc')}>DESC</button>
                      </span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableBody>
                <TableRow>
                  <TableCell>
                    <>Loading ..</>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {!actions &&
                  rows.map(row => {
                    return (
                      <TableRow key={row.id}>
                        {isCheckbox && onHandleMultiSelect && (
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={row.checked}
                              onChange={() => onHandleMultiSelect(row.id)}
                            />
                          </TableCell>
                        )}

                        {row.row.map(rowItem => (
                          <TableCell key={rowItem.key} sx={rowItem.sx} {...rowItem.methods}>
                            {rowItem.value}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}

                {actions &&
                  rows.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell>
                          <button onClick={() => actions.onHandleEdit(row)}>Edit</button>
                          <button onClick={() => actions?.onHandleDelete(row)}>Delete</button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            )}
          </MuiTable>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Table;
