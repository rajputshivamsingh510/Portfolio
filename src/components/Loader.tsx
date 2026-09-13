import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles } from 'lucide-react';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090A0F] cyber-grid-bg text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center space-y-6 relative z-10"
      >
        {/* Animated Icon Ring */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-3xl border border-zinc-700"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-2 rounded-2xl border border-zinc-500/60"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <div className="w-14 h-14 rounded-xl bg-[#11131C] border border-zinc-800 flex items-center justify-center shadow-xl">
            <Cpu size={26} className="text-zinc-300 animate-pulse" />
          </div>
        </div>

        {/* Text Details */}
        <div className="text-center space-y-1 font-mono">
          <div className="flex items-center justify-center space-x-2 text-sm font-bold text-white tracking-widest">
            <span>SHIVAM SINGH AI</span>
            <Sparkles size={14} className="text-zinc-400" />
          </div>
          <p className="text-xs text-zinc-500">Initializing Neural Weights & Architecture...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-48 bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
          <motion.div
            className="h-full bg-gradient-to-r from-zinc-600 via-zinc-300 to-white rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
