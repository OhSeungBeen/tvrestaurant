'use client';

import { useEffect, useState } from 'react';
import { useScrollDirection } from 'react-use-scroll-direction';

import BottomNavigation from '@components/BottomNavigation';
import Header from '@components/Header';

type Props = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: Props) {
  const [isVisibleNavigation, setIsVisibleNavigation] = useState<boolean>(true);
  const { scrollDirection, scrollTargetRef } = useScrollDirection();

  useEffect(() => {
    if (scrollDirection === 'UP') {
      setIsVisibleNavigation(true);
    } else if (scrollDirection === 'DOWN') {
      setIsVisibleNavigation(false);
    }
  }, [scrollDirection]);

  return (
    <div className="flex min-h-screen justify-center ">
      <div className="hidden w-full max-w-md lg:block"></div>
      <div
        ref={scrollTargetRef}
        className="max-h-screen w-full overflow-y-scroll shadow-2xl dark:bg-slate-700 sm:max-w-md"
      >
        <Header />
        <div className="p-5 px-4">{children}</div>
        {isVisibleNavigation && <BottomNavigation />}
      </div>
    </div>
  );
}
