'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IoHeartOutline,
  IoMapOutline,
  IoPersonCircle,
  IoRibbonOutline,
  IoSearchOutline,
} from 'react-icons/io5';

export default function BottomNavigation() {
  const path = usePathname();

  const navigationMenus = [
    {
      id: 1,
      name: '맛집랭킹',
      icon: <IoRibbonOutline className="h-5 w-5 sm:h-6 sm:w-6" />,
      path: '/ranking',
    },
    {
      id: 2,
      name: '검색',
      icon: <IoSearchOutline className="h-5 w-5 sm:h-6 sm:w-6" />,
      path: '/search',
    },
    {
      id: 3,
      name: '홈',
      icon: <IoMapOutline className="h-5 w-5 sm:h-6 sm:w-6" />,
      path: '/',
    },
    {
      id: 4,
      name: '좋아요',
      icon: <IoHeartOutline className="h-5 w-5 sm:h-6 sm:w-6" />,
      path: '/like-list',
    },
    {
      id: 5,
      name: '마이페이지',
      icon: <IoPersonCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
      path: '/mypage',
    },
  ];

  const isActiveMenu = (navigationMenuPath) =>
    (navigationMenuPath === '/' && path === '/') ||
    (navigationMenuPath !== '/' && path.startsWith(navigationMenuPath));

  return (
    <ul className="fixed bottom-0 flex h-16 w-full items-center justify-between rounded-t-3xl  bg-slate-50 px-8  dark:bg-slate-800 sm:max-w-md">
      {navigationMenus.map((navigationMenu) => {
        return (
          <li key={navigationMenu.id}>
            <Link
              href={navigationMenu.path}
              className={`flex flex-col items-center justify-center ${
                isActiveMenu(navigationMenu.path) &&
                'text-pink-500 dark:text-pink-400'
              }`}
            >
              <div>{navigationMenu.icon}</div>
              <div className="text-sm">{navigationMenu.name}</div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
