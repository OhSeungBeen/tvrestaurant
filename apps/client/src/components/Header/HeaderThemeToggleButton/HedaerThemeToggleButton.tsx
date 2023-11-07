import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

const HeaderThemeToggleButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const onToggleTheme = () => {
    if (theme === 'light') {
      return setTheme('dark');
    }
    return setTheme('light');
  };

  if (!mounted) {
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
        <div
          className="cursor-pointer text-2xl text-slate-700 dark:text-white"
          onClick={onToggleTheme}
        >
          {theme === 'dark' ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HeaderThemeToggleButton;
