'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

import { useIsMounted } from '@toss/react';

export default function HeaderThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  const onToggleTheme = () => {
    if (theme === 'light') {
      return setTheme('dark');
    }
    return setTheme('light');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        layoutId="underline"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="cursor-pointer text-2xl" onClick={onToggleTheme}>
          {theme === 'dark' ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
