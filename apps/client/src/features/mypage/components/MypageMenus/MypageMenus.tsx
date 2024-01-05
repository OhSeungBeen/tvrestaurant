import { MdChevronRight } from 'react-icons/md';

import MypageMenu from '@features/mypage/components/MypageMenu/MypageMenu';
import { User } from '@stores/useUserStore';

type Props = {
  user: User | null;
  onLogout: () => void;
};

export default function MypageMenus({ user, onLogout }: Props) {
  const mypageMenus = [
    {
      id: 1,
      title: '계정관리',
      children: [
        user
          ? {
              id: 1,
              name: `${user.nickName}님`,
              href: '/mypage/profile',
            }
          : {
              id: 1,
              name: '로그인',
              href: '/login',
            },
        {
          id: 2,
          name: '좋아요',
          href: '/like-list',
        },
      ],
    },
    {
      id: 2,
      title: '기타',
      children: [
        {
          id: 1,
          name: '공지사항',
          href: '/notice',
        },
      ],
    },
  ];
  return (
    <>
      {mypageMenus.map((mypageMenu) => (
        <div key={mypageMenu.id}>
          <div className="mb-5 mt-2 font-medium">{mypageMenu.title}</div>
          {mypageMenu.children.map((mypageMenu) => (
            <MypageMenu
              key={mypageMenu.id}
              name={mypageMenu.name}
              href={mypageMenu.href}
            />
          ))}
        </div>
      ))}
      {user && (
        <div
          className="mb-4 flex cursor-pointer items-center justify-between border-b-[1px] border-b-slate-200 pb-4 text-slate-600 dark:border-b-slate-600 dark:text-slate-300"
          onClick={onLogout}
        >
          <div>로그아웃</div>
          <div>
            <MdChevronRight className="text-xl" />
          </div>
        </div>
      )}
    </>
  );
}
