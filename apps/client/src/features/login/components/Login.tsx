'use client';

import { toast } from 'react-toastify';

import LoginEmailForm from '@features/login/components/LoginEmailForm';
import LoginInfo from '@features/login/components/LoginInfo';
import LoginPolicy from '@features/login/components/LoginPolicy';
import LoginSnsLogin from '@features/login/components/LoginSnsLogin';
import { apiClient } from '@lib/api/apiClient';
import { validateEmail } from '@lib/validate';

export default function Login() {
  const { mutate, isLoading, isSuccess } =
    apiClient.auth.sendEmailLoginCode.useMutation();

  const onLogin = (email) => {
    if (!validateEmail(email)) {
      toast.error('올바른 이메일 형식을 입력하세요.');
      return;
    }

    mutate({
      body: {
        email,
      },
    });
  };

  return (
    <>
      <LoginInfo />
      <LoginEmailForm disabled={isLoading || isSuccess} onLogin={onLogin} />
      <LoginSnsLogin />
      <LoginPolicy />
    </>
  );
}
