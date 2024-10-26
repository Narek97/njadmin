'use client';

import React, { FC, useCallback, useState } from 'react';
import AdminTable from '@/components/templates/admin-table/admin-table';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';
import { axiosGetFetcher, axiosPostFetcher } from '@/utils/helpers/swr';
import { useQueryParam } from '@/hooks/useQueryParam';
import { InputTypeEnum } from '@/utils/ts/enums/global.enums';
import useSWRMutation from 'swr/mutation';
import { EmployeeType } from '@/utils/ts/types/employee.types';
import { formInputs } from '@/client_pages/employees/constants';
import { useRecoilValue } from 'recoil';
import { cityState, countriesState } from '@/store/atoms/location.atom';
import { codeState } from '@/store/atoms/code.atom';
import { createFormData } from '@/utils/helpers/create-form-data';

interface IEmployees {}

const Employees: FC<IEmployees> = ({}) => {
  const t = useTranslations('jobs');
  const { getQueryParamValue } = useQueryParam();

  const [page, setPage] = useState(1);
  const [employeesCount, setEmployeesCount] = useState<number>(0);
  const [employees, setEmployees] = useState<EmployeeType[] | null>(null);
  const [statuses, setStatuses] = useState<Array<{ id: number; title: string }>>([]);
  const [userTypes, setUserTypes] = useState<Array<{ id: number; title: string }>>([]);
  const [locale, setLocale] = useState<Array<{ id: number; code: string; title: string }>>([]);

  const countries = useRecoilValue(countriesState);
  const city = useRecoilValue(cityState);
  const codes = useRecoilValue(codeState);

  let params = `?page=${page}`;

  const name = getQueryParamValue('name');
  const country = getQueryParamValue('country');
  const drivingLicense = getQueryParamValue('driving_license');
  const dateOfBirth = getQueryParamValue('date_of_birth');
  const order = getQueryParamValue('order');
  const sort_by = getQueryParamValue('sort_by');
  const status = getQueryParamValue('status');

  if (name) {
    params += `&name=${name}`;
  }
  if (country) {
    params += `&country=${country}`;
  }
  if (drivingLicense) {
    params += `&driving_license=${drivingLicense}`;
  }
  if (dateOfBirth) {
    params += `&date_of_birth=${dateOfBirth}`;
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
          setStatuses(data.foreignKeys?.status?.data);
          setUserTypes(data.foreignKeys?.user_type?.data);
          setLocale(data.foreignKeys?.locale?.data);
        }
      },
      onError: () => {
        console.log('error');
      },
    },
  );

  const { trigger: deleteRow } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/employees/delete`,
    axiosPostFetcher,
  );

  const { trigger: updateRow } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/employees/update`,
    axiosPostFetcher,
  );

  const { trigger: createRow } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/employees/create`,
    axiosPostFetcher,
  );

  const onHandleConfirmDelete = useCallback(
    async (ids: number[], onSuccess?: () => void, onError?: () => void) => {
      await deleteRow(
        { actionType: 'delete', ids },
        {
          onSuccess: () => {
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
        { ...forms },
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
    async (form: any) => {
      await createRow(createFormData({ ...form, user_id: 26 }), {
        onSuccess: () => {
          mutate();
        },
      });
    },
    [mutate, createRow],
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AdminTable
        title={t('title')}
        filter={{
          filterInputs: [
            {
              id: '1',
              name: 'name',
              value: name || '',
              type: InputTypeEnum.Text,
              attr: {
                label: 'Title',
              },
            },
            {
              id: '2',
              name: 'country',
              type: InputTypeEnum.Select,
              value: country || '',
              attr: {
                label: 'Country',
              },
              options: countries,
            },
            {
              id: '3',
              name: 'date_of_birth',
              type: InputTypeEnum.Date,
              value: dateOfBirth || null,
              attr: {
                label: 'Date of birth',
              },
            },
            {
              id: '4',
              name: 'driving_license',
              type: InputTypeEnum.Checkbox,
              value: drivingLicense === 'true',
              attr: {
                label: 'Driving license',
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
          formInputs: formInputs({
            countries,
            city,
            codes,
            statuses,
            userTypes,
            locale,
          }),
          onHandleConfirmCreate,
          onHandleConfirmUpdate,
        }}
        deleteRow={{
          onHandleConfirmDelete,
        }}
        tableRowItems={employees || []}
        isLoading={isLoading}
      />
    </>
  );
};

export default Employees;
