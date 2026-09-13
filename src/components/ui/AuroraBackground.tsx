import React from 'react';
import { motion } from 'framer-motion';

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Aurora Wave 1: Sky Blue & Royal Indigo Fluid Pillar */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -25, 0],
          opacity: [0.45, 0.65, 0.45],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-24 -right-12 w-[650px] h-[700px] rounded-full bg-gradient-to-tl from-sky-400/40 via-indigo-500/35 to-transparent dark:from-blue-600/35 dark:via-indigo-600/30 dark:to-transparent blur-[130px]"
      />

      {/* Aurora Wave 2: Electric Purple / Violet Arc */}
      <motion.div
        animate={{
          scale: [1.08, 0.95, 1.08],
          x: [0, -35, 0],
          y: [0, 35, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/4 right-1/4 w-[550px] h-[580px] rounded-full bg-gradient-to-tr from-violet-500/35 via-purple-400/30 to-transparent dark:from-purple-600/30 dark:via-violet-600/20 dark:to-transparent blur-[140px]"
      />

      {/* Aurora Wave 3: Warm Peach / Rose Coral Wave in Light Mode, Magenta in Dark Mode */}
      <motion.div
        animate={{
          scale: [0.95, 1.12, 0.95],
          x: [0, 25, 0],
          y: [0, -30, 0],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-36 right-1/3 w-[580px] h-[520px] rounded-full bg-gradient-to-t from-rose-400/35 via-orange-300/25 to-transparent dark:from-fuchsia-600/25 dark:via-pink-500/15 dark:to-transparent blur-[120px]"
      />

      {/* Aurora Wave 4: Teal & Soft Azure Left Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-cyan-400/30 via-indigo-400/20 to-transparent dark:from-indigo-600/15 dark:via-blue-600/8 dark:to-transparent blur-[130px]"
      />
    </div>
  );
}
