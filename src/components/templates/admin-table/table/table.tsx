import React, { FC } from 'react';
import './table.scss';
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
import TopArrowIcon from '@/public/icons/arrow-top.svg';
import BottomArrowIcon from '@/public/icons/arrow-bottom.svg';

interface ITable {
  columns: Array<AdminTableColumnType>;
  rows: Array<AdminTableRowType>;
  onHandleSortTable?: (sortBy: string, sortType: 'asc' | 'desc') => void;
  onHandleMultiSelect?: (id: number) => void;
  actions?: {
    onHandleEdit?: (row: AdminTableRowType) => void;
    onHandleDelete?: (row: AdminTableRowType) => void;
    onHandlePreview?: (id: number) => void;
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
    <div style={{ maxWidth: '70dvw' }} className={'table'}>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <TableContainer>
          <MuiTable stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    className={'table--header-cl'}
                    key={column.id}
                    align={column.align || 'center'}
                    style={column.style}>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '30px' }}>
                      <span>{column.name}</span>
                      {onHandleSortTable && column.isSortable && (
                        <span className={'table--header-cl--sort-block'}>
                          <button onClick={() => onHandleSortTable(column.key, 'asc')}>
                            <TopArrowIcon />
                          </button>
                          <button onClick={() => onHandleSortTable(column.key, 'desc')}>
                            <BottomArrowIcon />
                          </button>
                        </span>
                      )}
                    </div>
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
                      <TableRow
                        key={row.id}
                        sx={{
                          height: '60px',
                        }}>
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
                        <TableCell
                          className={'table--actions-tc'}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            height: '60px',
                          }}>
                          {actions.onHandleEdit && (
                            <button onClick={() => actions.onHandleEdit!(row)}>Edit</button>
                          )}
                          {actions.onHandleDelete && (
                            <button onClick={() => actions.onHandleDelete!(row)}>Delete</button>
                          )}
                          {actions.onHandlePreview && (
                            <button onClick={() => actions.onHandlePreview!(row.id)}>
                              Preview
                            </button>
                          )}
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
