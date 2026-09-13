import React from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle2 } from 'lucide-react';
import { getDynamicCompetencies, experiences } from '../../data/portfolioData';

export default function About() {
  const coreCompetencies = getDynamicCompetencies();
  const currentRole = experiences[0] ? `${experiences[0].role} & Data Scientist` : 'AI/ML Engineer & Data Scientist';

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#F5F5F7] dark:bg-[#090A0F] bg-ambient-mesh transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait Image Glass Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group max-w-sm w-full">
              {/* Colorful Radiant Halo in Light Mode, Sleek Indigo in Dark Mode */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-br from-indigo-500/35 via-violet-500/25 to-sky-400/25 dark:from-indigo-600/15 dark:via-slate-500/10 dark:to-transparent blur-xl group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-3xl p-3 bg-gradient-to-b from-white to-indigo-50/30 dark:from-[#151825] dark:to-[#0C0E17] border border-slate-200/90 dark:border-zinc-800/90 shadow-xl overflow-hidden">
                <div className="top-rim-shimmer" />
                <img
                  src="/my_pic.jpg"
                  alt="Shivam Singh Portrait"
                  className="w-full h-[380px] object-cover rounded-2xl filter brightness-95 contrast-105 group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-slate-200/80 dark:border-zinc-700/80 backdrop-blur-xl">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Shivam Singh</h4>
                    <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">{currentRole}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio & Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-zinc-800/90 border border-indigo-200/80 dark:border-zinc-700/80 text-indigo-700 dark:text-zinc-300 text-xs font-mono font-medium shadow-sm">
              <Brain size={14} className="text-indigo-600 dark:text-zinc-400" />
              <span>ABOUT SHIVAM SINGH</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              About Me —{' '}
              <span className="name-gradient-diagonal">
                Data Precision
              </span>{' '}
              & AI Innovation
            </h2>

            <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed">
              I am a passionate AI/ML Engineer and Data Scientist with hands-on expertise in building predictive models, NLP text classifiers, and automated data processing workflows. Skilled in Python, Deep Learning, and Data Visualization, I specialize in transforming raw data into high-value actionable insights.
            </p>

            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
              Currently advancing my capabilities with Google Advanced Data Analytics and Microsoft Power BI Data Analyst certifications while building production solutions like Ethereum wallet DeFi risk scoring, stock price forecasting, and computer vision traffic management systems.
            </p>

            {/* Core Skills Chips */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
                Core Specialization Domains:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {coreCompetencies.map((skill) => (
                  <div
                    key={skill}
                    className="p-2.5 rounded-xl bg-white/90 hover:bg-indigo-50/60 dark:bg-[#121520] dark:hover:bg-zinc-800/90 border border-slate-200/90 hover:border-indigo-300 dark:border-zinc-800 dark:hover:border-zinc-700 flex items-center space-x-2 text-xs font-medium text-slate-800 dark:text-zinc-100 shadow-xs hover:shadow-md transition-all group"
                  >
                    <CheckCircle2 size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
