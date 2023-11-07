'use client';

import React from 'react';
import Link from 'next/link';

import HeaderThemeToggleButton from '@components/Header/HeaderThemeToggleButton';

const Header = () => {
  return (
    <div className="sticky top-0 left-0 h-16 w-full bg-white px-8 dark:bg-slate-700">
      <div className="flex h-full items-center justify-between">
        <Link
          href="/"
          className="font-fira text-2xl font-extrabold tracking-widest sm:text-2xl"
        >
          <span className="text-slate-700 dark:text-white">tv</span>
          <span className="text-3xl text-pink-500 dark:text-pink-400">.</span>
          <span className="text-slate-700 dark:text-white">restaurant</span>
        </Link>
        <div>
          <HeaderThemeToggleButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
