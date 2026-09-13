import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  FolderGit2,
  Sparkles,
  ArrowRight,
  Code2,
  Database,
  Brain,
  Cpu,
  Bot,
  Eye,
  ChevronDown
} from 'lucide-react';

import { projectsList } from '../../data/portfolioData';

const CATEGORIES = [
  'All',
  'AI Agents',
  'Generative AI',
  'RAG / NLP',
  'ML / DL',
  'Computer Vision',
  'Analytics'
] as const;

type CategoryFilter = (typeof CATEGORIES)[number];

export default function Projects() {
  const [filter, setFilter] = useState<CategoryFilter>('All');
  const [isExpanded, setIsExpanded] = useState(false);

  const isMatchingCategory = (category: string, selectedFilter: CategoryFilter) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'AI Agents') {
      return category === 'AI Agents' || category === 'AI Application';
    }
    if (selectedFilter === 'Generative AI') {
      return category === 'Generative AI' || category === 'NLP/GenAI';
    }
    if (selectedFilter === 'RAG / NLP') {
      return category.includes('NLP') || category.includes('RAG');
    }
    if (selectedFilter === 'ML / DL') {
      return category === 'ML/DL';
    }
    if (selectedFilter === 'Computer Vision') {
      return category === 'Computer Vision';
    }
    if (selectedFilter === 'Analytics') {
      return category === 'Analytics';
    }
    return false;
  };

  const filteredProjects = projectsList.filter((p) =>
    isMatchingCategory(p.category, filter)
  );

  // Show only 2 rows (6 cards on 3-col desktop layout) when collapsed
  const visibleProjects = isExpanded ? filteredProjects : filteredProjects.slice(0, 6);
  const hasMore = filteredProjects.length > 6;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI Agents':
      case 'AI Application':
        return <Bot size={18} className="text-violet-600 dark:text-violet-400" />;
      case 'Generative AI':
      case 'NLP/GenAI':
        return <Sparkles size={18} className="text-amber-600 dark:text-amber-400" />;
      case 'RAG/NLP':
      case 'NLP':
        return <Cpu size={18} className="text-blue-600 dark:text-blue-400" />;
      case 'ML/DL':
        return <Brain size={18} className="text-indigo-600 dark:text-indigo-400" />;
      case 'Computer Vision':
        return <Eye size={18} className="text-emerald-600 dark:text-emerald-400" />;
      case 'Analytics':
        return <Database size={18} className="text-sky-600 dark:text-sky-400" />;
      default:
        return <Code2 size={18} className="text-indigo-600 dark:text-indigo-400" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'AI Agents':
      case 'AI Application':
        return 'bg-violet-50 border-violet-200/80 dark:bg-zinc-800/90 dark:border-zinc-700/70';
      case 'Generative AI':
      case 'NLP/GenAI':
        return 'bg-amber-50 border-amber-200/80 dark:bg-zinc-800/90 dark:border-zinc-700/70';
      case 'RAG/NLP':
      case 'NLP':
        return 'bg-blue-50 border-blue-200/80 dark:bg-zinc-800/90 dark:border-zinc-700/70';
      case 'ML/DL':
        return 'bg-indigo-50 border-indigo-200/80 dark:bg-zinc-800/90 dark:border-zinc-700/70';
      case 'Computer Vision':
        return 'bg-emerald-50 border-emerald-200/80 dark:bg-zinc-800/90 dark:border-zinc-700/70';
      case 'Analytics':
        return 'bg-sky-50 border-sky-200/80 dark:bg-zinc-800/90 dark:border-zinc-700/70';
      default:
        return 'bg-indigo-50 border-indigo-200/80 dark:bg-zinc-800/90 dark:border-zinc-700/70';
    }
  };

  return (
    <section id="projects" className="py-24 relative bg-[#F8FAFC] dark:bg-[#080911] tech-squares-grid transition-colors duration-200 overflow-hidden">
      {/* Aurora Ambient Glow in Section Background */}
      <div className="absolute top-1/4 -left-24 w-[600px] h-[550px] bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-transparent dark:from-blue-600/18 dark:via-indigo-600/12 dark:to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-[550px] h-[500px] bg-gradient-to-l from-purple-600/15 via-fuchsia-600/10 to-transparent dark:from-purple-600/18 dark:via-pink-600/10 dark:to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-zinc-800/90 border border-indigo-200/80 dark:border-zinc-700/80 text-indigo-700 dark:text-zinc-300 text-xs font-mono font-medium mb-4 shadow-sm backdrop-blur-md">
            <FolderGit2 size={14} />
            <span>FEATURED PORTFOLIO PROJECTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Engineering{' '}
            <span className="name-gradient-diagonal">
              Showcase
            </span>
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Autonomous AI agents, multimodal generative AI, deep learning systems, and data analytics repositories built by Shivam.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setIsExpanded(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/20 dark:from-white dark:to-zinc-200 dark:text-zinc-950 border border-indigo-500/30 dark:border-white/80'
                  : 'bg-white dark:bg-[#121520]/80 text-zinc-700 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:text-indigo-600 dark:hover:text-white hover:bg-indigo-50/50 dark:hover:bg-zinc-800'
              }`}
            >
              {cat === 'All' ? `All Projects (${projectsList.length})` : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {visibleProjects.map((p, idx) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="p-7 rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#11131F] hover:border-indigo-400/80 dark:hover:border-zinc-600 transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(99,102,241,0.14)] flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Smooth Seamless Ambient Glow */}
                {p.featured ? (
                  <div className="card-featured-glow opacity-90 group-hover:opacity-100 group-hover:scale-110" />
                ) : (
                  <div className="card-subtle-glow opacity-90 group-hover:opacity-100 group-hover:scale-110" />
                )}

                {/* Top Rim Shimmer */}
                <div className="top-rim-shimmer" />

                <div className="relative z-10">
                  {/* Top Bar: Icon Badge & Status Pill */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shadow-xs ${getCategoryBadgeClass(p.category)}`}>
                      {getCategoryIcon(p.category)}
                    </div>

                    {p.featured ? (
                      <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-amber-500/15 dark:text-amber-300 border border-indigo-200/80 dark:border-amber-500/30 text-[10px] font-mono font-bold shadow-xs">
                        <Sparkles size={11} className="text-indigo-600 dark:text-amber-400" />
                        <span>FLAGSHIP</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-zinc-800/90 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700 text-[10px] font-mono font-bold shadow-xs">
                        <span>{p.category}</span>
                      </div>
                    )}
                  </div>

                  {/* Title (Crisp, High-Contrast Typography) */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                    {p.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal">
                    {p.description}
                  </p>

                  {/* Metric / Architecture Result Callout */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-200/90 dark:border-zinc-800 text-[11px] font-mono shadow-xs">
                    <span className="text-indigo-700 dark:text-indigo-400 font-bold block mb-0.5">Impact & Architecture:</span>
                    <span className="text-slate-900 dark:text-zinc-100 font-semibold leading-relaxed">{p.impact}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-zinc-800/80 space-y-4 relative z-10">
                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 dark:bg-zinc-800/80 dark:text-zinc-300 dark:border-zinc-700/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Row */}
                  <div className="flex items-center justify-between pt-1">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-indigo-600 hover:text-indigo-800 dark:text-zinc-200 dark:hover:text-white group-hover:translate-x-1 transition-transform"
                    >
                      <Github size={14} />
                      <span>View Repository</span>
                      <ArrowRight size={13} />
                    </a>

                    {p.demo ? (
                      <a
                        href={p.demo}
                        className="py-1.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-zinc-800/90 dark:hover:bg-zinc-700 dark:text-zinc-200 font-mono text-xs font-semibold flex items-center space-x-1 transition-all border border-indigo-200 dark:border-zinc-700 shadow-xs"
                      >
                        <ExternalLink size={12} />
                        <span>Try Demo</span>
                      </a>
                    ) : (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800/90 dark:hover:bg-zinc-700 dark:text-zinc-200 font-mono text-xs font-semibold flex items-center space-x-1 transition-all border border-slate-200 dark:border-zinc-700 shadow-xs"
                      >
                        <ExternalLink size={12} />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Expand / Collapse Button */}
        {hasMore && (
          <div className="mt-14 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-6 py-3.5 rounded-2xl bg-white/95 dark:bg-[#121520] hover:bg-indigo-50/70 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200/90 hover:border-indigo-300 dark:border-zinc-800 dark:hover:border-zinc-700 shadow-md hover:shadow-xl font-mono text-xs font-semibold flex items-center space-x-3 transition-all group backdrop-blur-sm"
            >
              <span>
                {isExpanded
                  ? 'Show Fewer Projects'
                  : `Explore All ${filteredProjects.length} Projects (${filteredProjects.length - 6} more)`}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-zinc-800 text-indigo-600 dark:text-zinc-300 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-950 transition-colors"
              >
                <ChevronDown size={14} />
              </motion.div>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
