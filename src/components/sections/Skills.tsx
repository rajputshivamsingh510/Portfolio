import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Brain, Database, Cpu, Sparkles, Layers } from 'lucide-react';
import SkillsRadar from '../../widgets/SkillsRadar';

import { getDynamicSkillCategories, techEcosystemGroups, getAllUniqueSkills } from '../../data/portfolioData';

export default function Skills() {
  const dynamicCategories = getDynamicSkillCategories();
  const allSkills = getAllUniqueSkills();
  const [activeTab, setActiveTab] = useState<string>('All');

  const getFilteredTech = () => {
    if (activeTab === 'All') return allSkills;
    const group = techEcosystemGroups.find((g) => g.name === activeTab);
    return group ? group.skills : allSkills;
  };

  const displayedTech = getFilteredTech();

  const getCategoryMeta = (categoryKey: string) => {
    switch (categoryKey) {
      case 'languages':
        return {
          icon: <Code size={18} className="text-indigo-600 dark:text-zinc-300" />,
          badgeClass: 'bg-indigo-50 border-indigo-100 dark:bg-zinc-800 dark:border-zinc-800'
        };
      case 'frameworks':
        return {
          icon: <Brain size={18} className="text-violet-600 dark:text-zinc-300" />,
          badgeClass: 'bg-violet-50 border-violet-100 dark:bg-zinc-800 dark:border-zinc-800'
        };
      case 'datascience':
        return {
          icon: <Database size={18} className="text-sky-600 dark:text-zinc-300" />,
          badgeClass: 'bg-sky-50 border-sky-100 dark:bg-zinc-800 dark:border-zinc-800'
        };
      case 'engineering':
      default:
        return {
          icon: <Cpu size={18} className="text-emerald-600 dark:text-zinc-300" />,
          badgeClass: 'bg-emerald-50 border-emerald-100 dark:bg-zinc-800 dark:border-zinc-800'
        };
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-white/60 dark:bg-[#0C0E14] tech-squares-grid border-y border-slate-200/80 dark:border-zinc-800/80 transition-colors duration-200 overflow-hidden">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-indigo-500/10 to-violet-400/10 dark:from-indigo-600/5 dark:to-slate-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-zinc-800/90 border border-indigo-200/60 dark:border-zinc-700/80 text-indigo-700 dark:text-zinc-300 text-xs font-mono font-medium mb-4 shadow-sm backdrop-blur-md">
            <Sparkles size={14} />
            <span>TECHNICAL PROFICIENCY</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Skills &{' '}
            <span className="name-gradient-diagonal">
              Tool Ecosystem
            </span>
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Core architectural competencies, multi-agent frameworks, and end-to-end production toolchains.
          </p>
        </div>

        {/* 4 Balanced Core Skill Pillars (Compact, Uniform Height) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {dynamicCategories.map((category, catIdx) => {
            const meta = getCategoryMeta(category.categoryKey);
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.06 }}
                className="p-6 rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#11131F] shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-zinc-600 transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full"
              >
                <div className="top-rim-shimmer" />

                <div>
                  <div className="flex items-center space-x-3 mb-5 pb-3 border-b border-slate-200/80 dark:border-zinc-800/80">
                    <div className={`p-2 rounded-2xl border ${meta.badgeClass} shadow-xs`}>
                      {meta.icon}
                    </div>
                    <h3 className="font-bold text-zinc-900 dark:text-white text-sm font-mono truncate">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-xs font-mono mb-1.5">
                          <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate pr-2">{skill.name}</span>
                          <span className="text-indigo-600 dark:text-zinc-100 font-bold shrink-0">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-zinc-800/80 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 dark:from-zinc-400 dark:via-zinc-200 dark:to-white rounded-full shadow-xs"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: catIdx * 0.08 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dashboard Row: Radar Chart & Filterable Tech Stack Explorer Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Domain Competency Radar */}
          <div className="lg:col-span-5 h-full">
            <SkillsRadar />
          </div>

          {/* Right Column: Interactive Tech Stack Explorer */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#11131F] shadow-sm flex flex-col justify-between relative overflow-hidden h-full">
            <div className="top-rim-shimmer" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-2xl bg-indigo-50 dark:bg-zinc-800/80 border border-indigo-100 dark:border-zinc-700 text-indigo-600 dark:text-zinc-300">
                    <Layers size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold font-mono uppercase tracking-wider text-zinc-900 dark:text-white">
                      Active Production & Research Tech
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Technologies actively utilized in models & repositories
                    </p>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-2.5 py-1 text-[10px] font-mono font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700">
                  {displayedTech.length} Active Tools
                </span>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 mb-5 pb-3 border-b border-slate-200/80 dark:border-zinc-800/80">
                <button
                  onClick={() => setActiveTab('All')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                    activeTab === 'All'
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xs dark:from-white dark:to-zinc-200 dark:text-zinc-950'
                      : 'bg-slate-50 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white border border-slate-200/80 dark:border-zinc-800'
                  }`}
                >
                  All ({allSkills.length})
                </button>
                {techEcosystemGroups.map((g) => (
                  <button
                    key={g.name}
                    onClick={() => setActiveTab(g.name)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                      activeTab === g.name
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xs dark:from-white dark:to-zinc-200 dark:text-zinc-950'
                        : 'bg-slate-50 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white border border-slate-200/80 dark:border-zinc-800'
                    }`}
                  >
                    {g.name} ({g.skills.length})
                  </button>
                ))}
              </div>

              {/* Tech Pills Cluster */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap gap-2 max-h-[195px] overflow-y-auto pr-1"
                >
                  {displayedTech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-800 hover:border-indigo-400 dark:hover:border-zinc-600 font-mono text-xs font-medium shadow-xs transition-all hover:scale-105"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
