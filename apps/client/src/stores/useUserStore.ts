import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { env } from '@/env';
import { router } from '@tvrestaurant/contracts';

export interface User {
  id: string;
  email: string;
  provider: 'KAKAO' | 'GOOGLE' | 'NAVER' | 'EMAIL';
  nickName: string;
  thumbnail: string | null;
}

interface UserState {
  user: User | null;
  actions: {
    loadUser: (user: User) => void;
  };
}

const userStore = (set) => ({
  user: null,
  actions: {
    loadUser: (user) => set(() => ({ user })),
  },
});

const useUserStore = create<UserState>()(
  env.appEnv !== 'production' ? devtools(userStore) : userStore,
);

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);
