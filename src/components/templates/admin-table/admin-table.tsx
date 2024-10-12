'use client';

import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import './admin-table.scss';
import {
  AdminTableColumnType,
  AdminTableRowType,
  AdminTableType,
  RowType,
} from '@/utils/ts/types/admin-table.types';
import { validateUniqueFilterInputNames } from '@/utils/helpers/global';
import CustomModal from '@/components/atoms/modal/custom-modal';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { CRUDEnum } from '@/utils/ts/enums/global.enums';
import CreateUpdateModalContent from '@/components/templates/admin-table/create-update-modal-content/create-update-modal-content';
import FilterElement from '@/components/templates/admin-table/filter-element/filter-element';
import { ObjectKeysType } from '@/utils/ts/types/global.types';
import Table from '@/components/templates/admin-table/table/table';
import { useQueryParam } from '@/hooks/useQueryParam';
import PreviewModalContent from '@/components/templates/admin-table/preview-modal-content/preview-modal-content';

const AdminTable: FC<AdminTableType> = ({
  title,
  filter,
  actions,
  createUpdateRow,
  deleteRow,
  data,
  isLoading,
}) => {
  const { addNewQueryParam, addMultipleQueryParams, deleteQueryParam, removeQueryParams } =
    useQueryParam();

  const { onHandleConfirmDelete } = deleteRow;

  const { isSelect, isExport, buttons: leftButton } = actions?.leftButtons || {};
  const { isCreate, buttons: rightButtons } = actions?.rightButtons || {};

  const columns = useMemo(() => {
    const arr: AdminTableColumnType[] = [{ id: '1', key: 'checkbox', name: '', align: 'left' }];

    createUpdateRow.formInputs.forEach(input => {
      if (input.useOnPreview) {
        arr.push({
          id: input.id,
          key: input.name,
          name: input.attr?.label || input.name,
          align: 'left',
          isSortable: input.isSortable,
        });
      }
    });
    return arr;
  }, [createUpdateRow.formInputs]);

  const rows = useMemo(() => {
    const arr: Array<AdminTableRowType> = [];

    data.forEach(d => {
      arr.push({
        id: d.id,
        checked: false,
        row: createUpdateRow.formInputs.map(input => {
          return {
            key: input.name,
            value: d[input.name],
            type: input.type,
          };
        }),
      });
    });

    return arr;
  }, [createUpdateRow.formInputs, data]);

  const [tableRows, setTableRows] = useState<Array<AdminTableRowType>>([]);
  const [filtersValue, setFiltersValue] = useState<ObjectKeysType>({});
  const [formInitialData, setFormInitialData] = useState<ObjectKeysType>({});
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isLoadingDeleteRow, setIsLoadingDeleteRow] = useState<boolean>(false);
  const [selectedRowIds, setSelectedRowIds] = useState<Array<number>>([]);
  const [isOpenCreateUpdateModal, setIsOpenCreateUpdateModal] = useState<boolean>(false);
  const [createUpdateModalType, setCreateUpdateModalType] = useState<CRUDEnum>(CRUDEnum.Create);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onHandleCreateInitialFilterValue = useCallback(() => {
    if (filter) {
      filter.filterInputs.forEach(input => {
        setFiltersValue((prev: any) => ({
          ...prev,
          [input.name]: input.value || '',
        }));
      });
    }
  }, [filter]);

  const onHandleCreateFormInitialData = useCallback(() => {
    createUpdateRow.formInputs.forEach(input => {
      setFormInitialData((prev: any) => ({
        ...prev,
        [input.name]: '',
      }));
    });
  }, [createUpdateRow.formInputs]);

  const onHandleChangeFilterValue = useCallback((e: any) => {
    setFiltersValue((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const onHandleSearch = useCallback(() => {
    for (const property in filtersValue) {
      if (filtersValue[property]) {
        addNewQueryParam(property, filtersValue[property]);
      } else {
        deleteQueryParam(property);
      }
    }
  }, [addNewQueryParam, deleteQueryParam, filtersValue]);

  const onHandleSelectAll = () => {
    setIsSelectAll(prev => !prev);
    setTableRows(prev =>
      prev.map(row => {
        row.checked ? setSelectedRowIds([]) : setSelectedRowIds(prev => [...prev, row.id]);
        return {
          ...row,
          checked: !isSelectAll,
        };
      }),
    );
  };

  const onHandleExport = () => {};
  const onHandleToggleCreateUpdateModalModal = () => {
    setIsOpenCreateUpdateModal(prev => !prev);
  };

  const onHandleToggleDeleteModal = () => {
    setIsOpenDeleteModal(prev => !prev);
  };

  const convertArray = useCallback((arr: RowType[]) => {
    return arr.reduce((acc, item) => {
      (acc as any)[item.key] = item.value;
      return acc;
    }, {});
  }, []);

  const onHandleEdit = useCallback(
    (row: AdminTableRowType) => {
      setCreateUpdateModalType(CRUDEnum.Update);
      setFormInitialData(convertArray(row.row));
      onHandleToggleCreateUpdateModalModal();
    },
    [convertArray],
  );

  const onHandleDelete = useCallback((row: AdminTableRowType) => {
    setSelectedRowIds([row.id]);
    setIsOpenDeleteModal(prev => !prev);
  }, []);

  const onHandleEditPreviewRow = useCallback(() => {
    const row = rows.find(r => r.id === selectedRowId);
    if (row) {
      setSelectedRowId(null);
      setIsOpenPreview(false);
      onHandleEdit(row);
    }
  }, [onHandleEdit, rows, selectedRowId]);

  const onHandlePreview = useCallback((id: number) => {
    setSelectedRowId(id);
    setIsOpenPreview(prev => !prev);
  }, []);

  const onHandleMultiDelete = useCallback(() => {
    setIsOpenDeleteModal(prev => !prev);
  }, []);

  const onHandleMultiSelect = useCallback(
    (id: number) => {
      const isSelectedId = selectedRowIds.some(pid => pid === id);
      if (isSelectedId) {
        setTableRows(prev =>
          prev.map(row => {
            if (row.id === id) {
              row.checked = false;
            }
            return row;
          }),
        );
        setSelectedRowIds(prev => prev.filter(pid => pid !== id));
      } else {
        setTableRows(prev =>
          prev.map(row => {
            if (row.id === id) {
              row.checked = true;
            }
            return row;
          }),
        );
        setSelectedRowIds(prev => [...prev, id]);
      }
    },
    [selectedRowIds],
  );

  const onHandleSortTable = useCallback(
    async (sortBy: string, sortType: 'asc' | 'desc') => {
      addMultipleQueryParams({ order: sortType, sort_by: sortBy });
    },
    [addMultipleQueryParams],
  );

  useEffect(() => {
    setTableRows(rows.map(row => ({ ...row, checked: false })));
  }, [rows]);

  useEffect(() => {
    onHandleCreateInitialFilterValue();
    onHandleCreateFormInitialData();
  }, [onHandleCreateInitialFilterValue, onHandleCreateFormInitialData, filter]);

  if (filter?.filterInputs && !validateUniqueFilterInputNames(filter.filterInputs)) {
    return <div>Filter input names must be unique</div>;
  }

  return (
    <div className={'admin-table'}>
      <h3 className={'admin-table--title'}>{title}</h3>

      {isOpenDeleteModal && (
        <CustomModal
          isOpen={isOpenDeleteModal}
          handleClose={onHandleToggleDeleteModal}
          canCloseWithOutsideClick={true}>
          <div>
            <p>Are you sure to want delete this row</p>
            <div>
              <button
                disabled={isLoadingDeleteRow}
                onClick={() => {
                  setSelectedRowIds([]);
                  setIsOpenDeleteModal(false);
                }}>
                Close
              </button>
              <button
                disabled={isLoadingDeleteRow}
                onClick={async () => {
                  setIsLoadingDeleteRow(true);
                  const onSuccess = () => {
                    setSelectedRowIds([]);
                    setIsOpenDeleteModal(false);
                    setIsLoadingDeleteRow(false);
                  };
                  const onError = () => {
                    setIsLoadingDeleteRow(false);
                  };
                  await onHandleConfirmDelete(selectedRowIds!, onSuccess, onError);
                }}>
                Yes
              </button>
            </div>
          </div>
        </CustomModal>
      )}
      {isOpenCreateUpdateModal && (
        <CustomModal
          isOpen={isOpenCreateUpdateModal}
          handleClose={onHandleToggleCreateUpdateModalModal}
          canCloseWithOutsideClick={true}
          modalSize={'lg'}>
          <CreateUpdateModalContent
            createUpdateRow={{ ...createUpdateRow, formInitialData }}
            createUpdateModalType={createUpdateModalType}
            onHandleToggleCreateUpdateModalModal={onHandleToggleCreateUpdateModalModal}
          />
        </CustomModal>
      )}
      {isOpenPreview && (
        <CustomModal isOpen={isOpenPreview} handleClose={() => setIsOpenPreview(false)}>
          <PreviewModalContent
            previewData={data.find(d => d.id === selectedRowId) || {}}
            onHandleEditPreviewRow={onHandleEditPreviewRow}
          />
        </CustomModal>
      )}

      {filter ? (
        <div className={'admin-table--filters'}>
          <>
            {filter.filterInputs.map(input => (
              <React.Fragment key={input.id}>
                <FilterElement
                  input={input}
                  value={filtersValue[input.name] || ''}
                  onHandleChange={onHandleChangeFilterValue}
                />
              </React.Fragment>
            ))}
          </>

          <button
            onClick={() => {
              onHandleCreateInitialFilterValue();
              removeQueryParams();
            }}>
            Clear
          </button>
          {filter.isSearchButton && <button onClick={onHandleSearch}>Search</button>}
        </div>
      ) : null}
      {actions ? (
        <div className={'admin-table--actions'}>
          <div className={'admin-table--actions--left-button'}>
            <div>
              {isSelect && (
                <>
                  <input type="checkbox" onChange={onHandleSelectAll} />
                  <button onClick={onHandleMultiDelete} disabled={!selectedRowIds.length}>
                    Delete all
                  </button>
                </>
              )}
            </div>
            <div>{isExport && <button onChange={onHandleExport}>Export</button>}</div>
            {leftButton?.slice(0, 3).map(button => (
              <button key={button.id} style={{ ...button.style }} {...button.methods}>
                {button.icon}
                {button.text}
              </button>
            ))}

            {leftButton && leftButton.length > 3 ? (
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}>
                  click
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}>
                  {leftButton?.slice(3)?.map(button => (
                    <MenuItem key={button.id} onClick={handleClose}>
                      <button style={{ ...button.style }} {...button.methods}>
                        {button.icon}
                        {button.text}
                      </button>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ) : null}
          </div>

          <div className={'admin-table--actions--right-button'}>
            <div>
              {isCreate && (
                <button
                  onClick={() => {
                    onHandleCreateFormInitialData();
                    setCreateUpdateModalType(CRUDEnum.Create);
                    onHandleToggleCreateUpdateModalModal();
                  }}>
                  Create
                </button>
              )}
            </div>

            {rightButtons?.slice(0, 3).map(button => (
              <button key={button.id} style={{ ...button.style }} {...button.methods}>
                {button.icon}
                {button.text}
              </button>
            ))}

            {rightButtons && rightButtons.length > 3 ? (
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}>
                  click
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}>
                  {rightButtons?.slice(3)?.map(button => (
                    <MenuItem key={button.id} onClick={handleClose}>
                      <button style={{ ...button.style }} {...button.methods}>
                        {button.icon}
                        {button.text}
                      </button>
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      {isLoading && !columns.length ? (
        <div>Loading ...</div>
      ) : (
        <div className={'admin-table--table-block'}>
          <Table
            columns={columns}
            rows={tableRows}
            onHandleSortTable={onHandleSortTable}
            onHandleMultiSelect={onHandleMultiSelect}
            isLoading={isLoading}
          />
          {rows.length ? (
            <Table
              columns={[{ id: '1', key: 'Actions', name: 'Action' }]}
              rows={tableRows}
              actions={{ onHandleEdit, onHandleDelete, onHandlePreview }}
              isLoading={isLoading}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default AdminTable;
