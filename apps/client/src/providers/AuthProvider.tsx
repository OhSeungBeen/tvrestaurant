'use client';

import { apiClient } from '@lib/api/apiClient';
import { useUserActions } from '@stores/useUserStore';

type Props = {
  isLoggedIn: boolean;
  children: React.ReactNode;
};

export default function AuthProvider({ isLoggedIn, children }: Props) {
  const { loadUser } = useUserActions();

  apiClient.user.getUser.useQuery(
    ['user'],
    {},
    {
      enabled: isLoggedIn,
      onSuccess: (response) => {
        const user = response.body;
        loadUser(user);
      },
    },
  );

  return <>{children}</>;
}
