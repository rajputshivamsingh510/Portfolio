import React from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, Terminal } from 'lucide-react';
import AIMLParticleNetwork from './AIMLParticleNetwork';
import AuroraBackground from '../ui/AuroraBackground';

interface HeroProps {
  onOpenTerminal?: () => void;
}

export default function Hero({ onOpenTerminal }: HeroProps) {
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Shivam_Singh_Resume.pdf';
    link.click();
  };

  return (
    <section id="hero" className="min-h-[92vh] relative flex items-center justify-center overflow-hidden py-16 tech-squares-grid">
      {/* Aurora Fluid Wave Gradient in Background (Reference Image 2) */}
      <AuroraBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-zinc-800/90 border border-indigo-200/60 dark:border-zinc-700/80 text-indigo-900 dark:text-zinc-300 text-xs font-mono font-medium shadow-sm backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for AI/ML Engineering & Data Science</span>
            </motion.div>

            {/* Name Heading with Diagonal Gradient */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none">
                <span className="name-gradient-diagonal">
                  Shivam Singh
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-bold font-mono text-indigo-600 dark:text-zinc-400">
                AI/ML Engineer & Data Scientist
              </p>
            </div>

            {/* Description with Classy Accents */}
            <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg max-w-2xl leading-relaxed">
              Transforming complex data into intelligent end-to-end solutions using{' '}
              <span className="font-semibold text-indigo-600 dark:text-white">Machine Learning</span>,{' '}
              <span className="font-semibold text-violet-600 dark:text-white">Deep Learning</span>, and{' '}
              <span className="font-semibold text-blue-600 dark:text-white">NLP Pipelines</span>.
              Experienced in building predictive models, computer vision systems, and automated data architectures.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3.5 pt-2">
              <motion.button
                onClick={handleResumeDownload}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white dark:from-white dark:via-zinc-100 dark:to-zinc-200 dark:text-zinc-950 font-semibold text-sm flex items-center space-x-2 shadow-lg shadow-indigo-600/20 dark:shadow-none border border-indigo-500/30 dark:border-white/60 transition-all"
              >
                <Download size={18} />
                <span>Download Resume</span>
              </motion.button>

              <motion.a
                href="#ai-lab"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3.5 rounded-xl bg-white/95 hover:bg-indigo-50/60 dark:bg-white dark:hover:bg-zinc-100 text-slate-900 dark:text-zinc-950 border border-slate-200/90 dark:border-white/60 font-semibold text-sm flex items-center space-x-2 shadow-sm transition-all"
              >
                <Sparkles size={18} className="text-indigo-600 dark:text-zinc-950" />
                <span>Launch AI Studio</span>
              </motion.a>

              <button
                onClick={onOpenTerminal}
                className="p-3.5 rounded-xl bg-white dark:bg-[#181B26] text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-white border border-slate-200 dark:border-zinc-800 shadow-sm transition-colors"
                title="Launch CLI Shell"
                aria-label="Launch CLI Shell"
              >
                <Terminal size={20} />
              </button>
            </div>

            {/* Metrics Counters */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-indigo-100 dark:border-zinc-800/80 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-950 dark:text-white">25+</div>
                <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">ML & Data Repos</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-600 dark:text-zinc-300">15+</div>
                <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">Certifications</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-violet-600 dark:text-zinc-300">2+ Yrs</div>
                <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">Hands-on Exp.</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Particle Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center relative min-h-[400px] lg:min-h-[500px]"
          >
            <div className="w-full h-full relative flex items-center justify-center">
              <AIMLParticleNetwork />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
