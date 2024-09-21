'use client';

import React, { FC, useCallback, useMemo, useState } from 'react';
import AdminTable from '@/components/templates/admin-table/admin-table';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import { axiosGetFetcher, axiosPostFetcher } from '@/utils/helpers/swr';
import { useQueryParam } from '@/hooks/useQueryParam';
import { InputTypeEnum } from '@/utils/ts/enums/global.enums';
import useSWRMutation from 'swr/mutation';
import { EmployeeType } from '@/utils/ts/types/employee.types';
import { AdminTableColumnType, AdminTableRowType } from '@/utils/ts/types/admin-table.types';
import { formInputs } from '@/client_pages/employees/constants';

interface IEmployees {}

const Employees: FC<IEmployees> = ({}) => {
  const t = useTranslations('jobs');
  const { getQueryParamValue } = useQueryParam();

  const [page, setPage] = useState(1);
  const [employeesCount, setEmployeesCount] = useState<number>(0);
  const [employees, setEmployees] = useState<EmployeeType[] | null>(null);
  const [relations, setRelations] = useState({});

  let params = `?page=${page}`;

  const title = getQueryParamValue('title');
  const order = getQueryParamValue('order');
  const sort_by = getQueryParamValue('sort_by');
  const status = getQueryParamValue('status');

  if (title) {
    params += `&title=${title}`;
  }
  if (order) {
    params += `&order=${order}`;
  }
  if (sort_by) {
    params += `&sort_by=${sort_by}`;
  }
  if (status) {
    params += `&status=${status}`;
  }

  const { mutate, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/employees${params}`,
    axiosGetFetcher,
    {
      onSuccess: data => {
        if (data) {
          setEmployeesCount(data.models.count);
          setEmployees(data.models.rows);
          setRelations(data.relations);
        }
      },
    },
  );

  const { trigger: deleteRow } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/employee/delete`,
    axiosPostFetcher,
  );

  const { trigger: updateRow } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/employee/update`,
    axiosPostFetcher,
  );

  const { trigger: createRow } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/employee/create`,
    axiosPostFetcher,
  );

  const onHandleConfirmDelete = useCallback(
    async (ids: number[], onSuccess?: () => void, onError?: () => void) => {
      await deleteRow(
        { actionType: 'delete', ids },
        {
          onSuccess: () => {
            // setEmployees(prev => prev!.filter(job => !ids.includes(job.id)));
            mutate();
            onSuccess && onSuccess();
          },
          onError: () => {
            onError && onError();
          },
        },
      );
    },
    [mutate, deleteRow],
  );

  const onHandleConfirmUpdate = useCallback(
    async (forms: any) => {
      await updateRow(
        { ...forms, actionType: 'update' },
        {
          onSuccess: () => {
            mutate();
          },
        },
      );
    },
    [mutate, updateRow],
  );

  const onHandleConfirmCreate = useCallback(
    async (forms: any) => {
      await createRow(
        {
          title: forms.title,
        },
        {
          onSuccess: () => {
            mutate();
          },
        },
      );
    },
    [mutate, createRow],
  );

  const columns = useMemo(() => {
    const arr: AdminTableColumnType[] = [{ id: 1, key: 'checkbox', name: '', align: 'left' }];
    if (employees) {
      let index = 2;
      for (const property in employees[0]) {
        arr.push({ id: index, key: property, name: property, align: 'left', isSortable: true });
        index++;
      }
    }

    return arr;
  }, [employees]);

  const rows: AdminTableRowType[] =
    useMemo(() => {
      return employees?.map(employee => ({
        id: employee.id,
        row: Object.entries(employee).map(([key, value]) => {
          return { key, value };
        }),
      }));
    }, [employees]) || [];

  return (
    <>
      <AdminTable
        title={t('title')}
        filter={{
          filterInputs: [
            {
              id: 1,
              name: 'title',
              value: title || '',
              type: InputTypeEnum.Text,
              attr: {
                placeholder: 'Title',
              },
            },
          ],
          isSearchButton: true,
        }}
        actions={{
          leftButtons: {
            isSelect: true,
            buttons: [],
          },
          rightButtons: {
            isCreate: true,
            buttons: [],
          },
        }}
        createUpdateRow={{
          formInputs: formInputs(relations),
          onHandleConfirmCreate,
          onHandleConfirmUpdate,
        }}
        deleteRow={{
          onHandleConfirmDelete,
        }}
        columns={columns}
        rows={rows}
        isLoading={isLoading}
      />
    </>
  );
};

export default Employees;
