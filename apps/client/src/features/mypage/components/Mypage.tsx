'use client';
import PageTitle from '@components/PageTitle';
import MypageMenus from '@features/mypage/components/MypageMenus';
import { apiClient } from '@lib/api/apiClient';
import { useUser } from '@stores/useUserStore';

export default function Mypage() {
  const user = useUser();
  const { mutate } = apiClient.auth.logout.useMutation({
    onSuccess: () => {
      location.href = '/';
    },
  });

  return (
    <>
      <PageTitle title="마이페이지" />
      <MypageMenus user={user} onLogout={() => mutate({})} />
    </>
  );
}
