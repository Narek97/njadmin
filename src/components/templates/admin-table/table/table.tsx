import React, { FC, useState } from 'react';
import './table.scss';
import {
  Table as MuiTable,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { AdminTableColumnType, AdminTableRowType } from '@/utils/ts/types/admin-table.types';
import TopArrowIcon from '@/public/icons/arrow-top.svg';
import LongMenu from '@/components/atoms/menu/menu';

interface ITable {
  columns: Array<AdminTableColumnType>;
  rows: Array<AdminTableRowType>;
  onHandleSortTable?: (sortBy: string, sortType: 'asc' | 'desc') => void;
  onHandleMultiSelect?: (id: number) => void;
  options: { option: any; onCLick: (menuItem: any) => void }[];
  isLoading: boolean;
}

const Table: FC<ITable> = ({
  columns,
  rows,
  onHandleSortTable,
  onHandleMultiSelect,
  options,
  isLoading,
}) => {
  // const user = useRecoilValue(userState);
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');

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
                        <span className={`table--header-cl--sort-block table--header-cl--${sort}`}>
                          <button
                            onClick={() => {
                              setSort(prevSort => (prevSort === 'asc' ? 'desc' : 'asc'));
                              onHandleSortTable(column.key, sort);
                            }}>
                            <TopArrowIcon />
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
                {!options.length
                  ? rows.map(row => {
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
                            <TableCell
                              key={rowItem.key}
                              sx={rowItem.sx}
                              {...rowItem.methods}
                              className={'table--cell'}>
                              {rowItem.renderFunction ? (
                                rowItem.renderFunction(rowItem)
                              ) : (
                                <Tooltip title={rowItem.value}>
                                  <span>{rowItem.value}</span>
                                </Tooltip>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })
                  : null}

                {options.length
                  ? rows.map(row => {
                      return (
                        <TableRow key={row.id}>
                          <TableCell
                            className={'table--actions-tc'}
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              height: '60px',
                            }}>
                            <LongMenu menuItem={row} options={options} />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : null}
              </TableBody>
            )}
          </MuiTable>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default Table;
