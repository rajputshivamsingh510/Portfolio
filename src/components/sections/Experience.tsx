import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, Building2, CheckCircle2 } from 'lucide-react';

import { experiences } from '../../data/portfolioData';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative bg-[#F5F5F7] dark:bg-[#090A0F] bg-ambient-mesh transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-zinc-800/90 border border-emerald-200/80 dark:border-zinc-700/80 text-emerald-700 dark:text-zinc-300 text-xs font-mono font-medium mb-4 shadow-sm">
            <Briefcase size={14} className="text-emerald-600 dark:text-zinc-400" />
            <span>PROFESSIONAL TIMELINE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Work Experience &{' '}
            <span className="name-gradient-diagonal">
              Traineeships
            </span>
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Track record of building data science models, analytics dashboards, and software integrations.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="max-w-4xl mx-auto relative pl-4 sm:pl-8 border-l-2 border-indigo-200/80 dark:border-zinc-800 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company + exp.role}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[25px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 dark:from-zinc-500 dark:to-zinc-200 ring-4 ring-indigo-50 dark:ring-zinc-900/80 border-2 border-white dark:border-[#090A0F] group-hover:scale-125 transition-all shadow-sm" />

              <div className="p-6 sm:p-8 rounded-2xl border border-slate-200/90 dark:border-zinc-800/90 bg-gradient-to-b from-white via-white to-indigo-50/20 dark:from-[#151825] dark:via-[#11131E] dark:to-[#0C0E17] shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-zinc-600 space-y-4 transition-all duration-300 relative overflow-hidden">
                <div className="top-rim-shimmer" />

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-zinc-800/80 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{exp.role}</h3>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700">
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5 mt-1">
                      <Building2 size={14} className="text-indigo-600 dark:text-zinc-400" />
                      <span>{exp.company}</span>
                      <span className="text-zinc-400 dark:text-zinc-600">• {exp.location}</span>
                    </p>
                  </div>

                  <div className="flex items-center space-x-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400 shrink-0">
                    <Calendar size={14} className="text-indigo-500 dark:text-zinc-500" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {exp.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-2 pt-2">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start space-x-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <CheckCircle2 size={14} className="text-indigo-600 dark:text-zinc-500 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-indigo-50/70 text-indigo-900 border border-indigo-100/80 dark:bg-zinc-800/70 dark:text-zinc-300 dark:border-zinc-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
