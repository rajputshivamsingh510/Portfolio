import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return document.documentElement.classList.contains('dark') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    window.dispatchEvent(new CustomEvent('theme-change', { detail: { isDark } }));
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      aria-label={isDark ? 'Switch to Apple Light theme' : 'Switch to Charcoal Dark theme'}
      title={isDark ? 'Switch to Light theme' : 'Switch to Dark theme'}
      className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-200/80 hover:bg-zinc-300 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/90 border border-zinc-300/70 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-zinc-400"
    >
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ rotate: -40, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 40, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun size={17} className="text-amber-300 hover:text-amber-200" />
        ) : (
          <Moon size={17} className="text-zinc-700 hover:text-zinc-900" />
        )}
      </motion.div>
    </button>
  );
}
