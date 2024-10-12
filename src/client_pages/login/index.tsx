'use client';
import React from 'react';
import './style.scss';
import { useForm } from 'react-hook-form';
import CustomInput from '@/components/atoms/input/input';
import { InputTypeEnum } from '@/utils/ts/enums/global.enums';
import { LoginType } from '@/utils/ts/types/global.types';
import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { axiosPostFetcher } from '@/utils/helpers/swr';
import { setCookies } from '@/utils/helpers/cookies';
import { accessToken, refreshToken } from '@/utils/constants/global';

const LoginPage = () => {
  const router = useRouter();

  const { trigger: userLogin } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    axiosPostFetcher,
    {
      onSuccess: response => {
        setCookies(accessToken, response.accessToken);
        setCookies(refreshToken, response.refreshToken);
        router.push('/en/home');
      },
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onHandleSubmit = (formData: LoginType) => {
    userLogin({ ...formData, remember_me: true });
  };

  return (
    <div>
      <form className={`login--form`} onSubmit={handleSubmit(onHandleSubmit)}>
        <CustomInput
          input={{
            id: '1',
            name: 'email',
            type: InputTypeEnum.Text,
            attr: {
              autoComplete: 'email',
            },
            validation: {
              required: 'This field is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            },
          }}
          errors={errors}
          register={register}
        />

        <CustomInput
          input={{
            id: '1',
            name: 'password',
            type: InputTypeEnum.Text,
            attr: {
              type: 'password',
              autoComplete: 'password',
            },
            validation: {
              required: 'This field is required',
              minLength: { value: 6, message: 'Min length is 10' },
            },
          }}
          errors={errors}
          register={register}
        />

        <input type="submit" />
      </form>
    </div>
  );
};

export default LoginPage;
