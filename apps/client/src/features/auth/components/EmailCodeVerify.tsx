'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { PacmanLoader } from 'react-spinners';

import { apiClient } from '@lib/api/apiClient';

export default function EmailCodeVerify() {
  const { code } = useParams();

  const { mutate } = apiClient.auth.loginByEmail.useMutation({
    onSuccess: () => {
      location.replace('/');
    },
  });

  useEffect(() => {
    mutate({ body: { code } });
  }, [code, mutate]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <PacmanLoader color="#ec4899" />
    </div>
  );
}
