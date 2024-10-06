// 'use client';
//
// import React, { FC, useCallback, useState } from 'react';
// import AdminTable from '@/components/templates/admin-table/admin-table';
// import { useTranslations } from 'next-intl';
// import useSWR from 'swr';
// import { axiosGetFetcher, axiosPostFetcher } from '@/utils/helpers/swr';
// import { useQueryParam } from '@/hooks/useQueryParam';
// import { InputTypeEnum } from '@/utils/ts/enums/global.enums';
// import { JobListingType } from '@/utils/ts/types/jobs.types';
// import useSWRMutation from 'swr/mutation';
//
// interface IJobs {}
//
// const Jobs: FC<IJobs> = ({}) => {
//   const t = useTranslations('jobs');
//   const { getQueryParamValue } = useQueryParam();
//
//   const [page, setPage] = useState(1);
//   const [jobsCount, setJobsCount] = useState<number>(0);
//   const [jobs, setJobs] = useState<JobListingType[] | null>(null);
//
//   let params = `?page=${page}`;
//
//   const title = getQueryParamValue('title');
//   const order = getQueryParamValue('order');
//   const sort_by = getQueryParamValue('sort_by');
//   const status = getQueryParamValue('status');
//
//   if (title) {
//     params += `&title=${title}`;
//   }
//   if (order) {
//     params += `&order=${order}`;
//   }
//   if (sort_by) {
//     params += `&sort_by=${sort_by}`;
//   }
//   if (status) {
//     params += `&status=${status}`;
//   }
//
//   const { mutate, isLoading } = useSWR(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/jobs${params}`,
//     axiosGetFetcher,
//     {
//       onSuccess: data => {
//         if (data) {
//           setJobsCount(data.models.count);
//           setJobs(data.models.rows);
//         }
//       },
//     },
//   );
//
//   const { trigger: deleteRow } = useSWRMutation(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/jobs/delete`,
//     axiosPostFetcher,
//   );
//
//   const { trigger: updateRow } = useSWRMutation(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/jobs/update`,
//     axiosPostFetcher,
//   );
//
//   const { trigger: createRow } = useSWRMutation(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/jobs/create`,
//     axiosPostFetcher,
//   );
//
//   const onHandleConfirmDelete = useCallback(
//     async (ids: number[], onSuccess?: () => void, onError?: () => void) => {
//       await deleteRow(
//         { actionType: 'delete', ids },
//         {
//           onSuccess: () => {
//             // setJobs(prev => prev!.filter(job => !ids.includes(job.id)));
//             mutate();
//             onSuccess && onSuccess();
//           },
//           onError: () => {
//             onError && onError();
//           },
//         },
//       );
//     },
//     [mutate, deleteRow],
//   );
//
//   const onHandleConfirmUpdate = useCallback(
//     async (forms: any) => {
//       await updateRow(
//         { ...forms, actionType: 'update' },
//         {
//           onSuccess: () => {
//             mutate();
//           },
//         },
//       );
//     },
//     [mutate, updateRow],
//   );
//
//   const onHandleConfirmCreate = useCallback(
//     async (forms: any) => {
//       await createRow(
//         {
//           title: forms.title,
//           company_id: 2,
//           country: 10,
//           city: 500,
//           category: 'remote',
//           job_type: 'part-time',
//           payment_type: 'monthly',
//           industry: 'information technologies',
//           description: 'Create and execute marketing strategies.',
//           pay_from: 1500,
//           pay_to: 5000,
//           compensation: 'Project-based bonuses.',
//           benefits: 'orva verj pachikov barev',
//           responsibilites: "Master's in Computer Science and 5 years of experience.",
//           qualifications: "Master's in Computer Science and 5 years of experience.",
//           email: 'admin_jobs@example.com',
//           department: 'it',
//           skills: ['nodejs', 'laravel'],
//           urgently: 0,
//           multi_candidate: 1,
//           deadline: '2024-11-20 10:00:00',
//           actionType: 'create',
//         },
//         {
//           onSuccess: () => {
//             mutate();
//           },
//         },
//       );
//     },
//     [mutate, createRow],
//   );
//
//   // const columns = useMemo(() => {
//   //   const arr: AdminTableColumnType[] = [{ id: "1", key: 'checkbox', name: '', align: 'left' }];
//   //   if (jobs) {
//   //     let index = 2;
//   //     for (const property in jobs[0]) {
//   //       arr.push({ id: index, key: property, name: property, align: 'left', isSortable: true });
//   //       index++;
//   //     }
//   //   }
//   //
//   //   return arr;
//   // }, [jobs]);
//   //
//   // const rows: AdminTableRowType[] =
//   //   useMemo(() => {
//   //     return jobs?.map(job => ({
//   //       id: job.id,
//   //       row: Object.entries(job).map(([key, value]) => {
//   //         return { id: job.id, type: InputTypeEnum.Text, key, value };
//   //       }),
//   //     }));
//   //   }, [jobs]) || [];
//
//   return (
//     <>
//       <AdminTable
//         title={t('title')}
//         filter={{
//           filterInputs: [
//             {
//               id: '1',
//               name: 'title',
//               value: title || '',
//               type: InputTypeEnum.Text,
//               attr: {
//                 placeholder: 'Title',
//               },
//             },
//           ],
//           isSearchButton: true,
//         }}
//         actions={{
//           leftButtons: {
//             isSelect: true,
//             buttons: [],
//           },
//           rightButtons: {
//             isCreate: true,
//             buttons: [],
//           },
//         }}
//         createUpdateRow={{
//           formInputs: [],
//           onHandleConfirmCreate,
//           onHandleConfirmUpdate,
//         }}
//         deleteRow={{
//           onHandleConfirmDelete,
//         }}
//         rows={[]}
//         isLoading={isLoading}
//       />
//     </>
//   );
// };
//
// export default Jobs;

import React from 'react';

const Jobs = () => {
  return <div>Jobs</div>;
};

export default Jobs;
