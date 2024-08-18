'use client';

import React, { FC, useCallback, useEffect, useState } from 'react';
import './admin-table.scss';
import { AdminTableType } from '@/utils/ts/types/admin-table.types';
import { validateUniqueFilterInputNames } from '@/utils/helpers/global';
import CustomModal from '@/components/atoms/modal/custom-modal';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { CRUDEnum } from '@/utils/ts/enums/global.enums';
import CreateUpdateModalContent from '@/components/templates/admin-table/create-update-modal-content/create-update-modal-content';
import FilterElement from '@/components/templates/admin-table/filter-element/filter-element';
import { ObjectKeysType } from '@/utils/ts/types/global.types';

const AdminTable: FC<AdminTableType> = ({ title, filter, actions, createUpdateRow }) => {
  const { isSelect, isExport, buttons: leftButton } = actions?.leftButtons || {};
  const { isCreate, buttons: rightButtons } = actions?.rightButtons || {};
  const [filtersValue, setFiltersValue] = useState<ObjectKeysType>({});
  const [formInitialData, setFormInitialData] = useState<ObjectKeysType>({});
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenCreateUpdateModal, setIsOpenCreateUpdateModal] = useState<boolean>(false);
  const [createUpdateModalType, setCreateUpdateModalType] = useState<CRUDEnum>(CRUDEnum.Create);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(isSelectAll, 'isSelectAll');

  const onHandleCreateInitialFilterValue = useCallback(() => {
    if (filter) {
      filter.filterInputs.forEach(input => {
        setFiltersValue((prev: any) => ({
          ...prev,
          [input.name]: '',
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
    console.log(filter?.searchUrl);
  }, [filter?.searchUrl]);

  const onHandleSelectAll = () => {
    setIsSelectAll(prev => !prev);
  };

  const onHandleExport = () => {};
  const onHandleToggleCreateUpdateModalModal = () => {
    setIsOpenCreateUpdateModal(prev => !prev);
  };

  const onHandleToggleDeleteModal = () => {
    setIsOpenDeleteModal(prev => !prev);
  };

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
      {isOpenUpdateModal && (
        <CustomModal
          isOpen={isOpenUpdateModal}
          handleClose={() => setIsOpenUpdateModal(false)}
          canCloseWithOutsideClick={true}>
          <div>hello</div>
        </CustomModal>
      )}

      {isOpenDeleteModal && (
        <CustomModal
          isOpen={isOpenDeleteModal}
          handleClose={onHandleToggleDeleteModal}
          canCloseWithOutsideClick={true}>
          <div>delete</div>
        </CustomModal>
      )}
      {isOpenCreateUpdateModal && (
        <CustomModal
          isOpen={isOpenCreateUpdateModal}
          handleClose={onHandleToggleCreateUpdateModalModal}
          canCloseWithOutsideClick={true}>
          <CreateUpdateModalContent
            createUpdateRow={{ ...createUpdateRow, formInitialData }}
            createUpdateModalType={createUpdateModalType}
            onHandleToggleCreateUpdateModalModal={onHandleToggleCreateUpdateModalModal}
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

          <button onClick={onHandleCreateInitialFilterValue}>Clear</button>
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
                  <button>Delete all</button>
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

      <div>
        <div>
          <button
            onClick={() => {
              setCreateUpdateModalType(CRUDEnum.Update);
              setFormInitialData({ name: 'helll', surname: 'barev' });
              onHandleToggleCreateUpdateModalModal();
            }}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
