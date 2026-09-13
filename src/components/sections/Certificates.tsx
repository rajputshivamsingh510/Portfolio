import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Eye, X, FileText, ShieldCheck, ChevronDown } from 'lucide-react';

import { certificateList } from '../../data/portfolioData';

export default function Certificates() {
  const [selectedPdf, setSelectedPdf] = useState<{ title: string; pdfUrl: string } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredCerts = certificateList.filter(
    (c) => activeCategory === 'All' || c.category === activeCategory
  );

  // Show only 2 rows (8 certificates on desktop) when collapsed
  const visibleCerts = isExpanded ? filteredCerts : filteredCerts.slice(0, 8);
  const hasMore = filteredCerts.length > 8;

  return (
    <section id="certificates" className="py-24 relative bg-white/50 dark:bg-[#0C0E14] bg-ambient-mesh border-y border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-zinc-800/90 border border-blue-200/80 dark:border-zinc-700/80 text-blue-700 dark:text-zinc-300 text-xs font-mono font-medium mb-4 shadow-sm">
            <ShieldCheck size={14} className="text-blue-600 dark:text-zinc-400" />
            <span>VERIFIED CREDENTIALS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Certifications &{' '}
            <span className="name-gradient-diagonal">
              Accreditations
            </span>
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Click any certificate card to view the official verified PDF document directly in the interactive viewer modal.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(['All', 'AI/ML', 'Data Science', 'Power BI', 'Python/SQL'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setIsExpanded(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/20 dark:from-white dark:to-zinc-200 dark:text-zinc-950 border border-indigo-500/30 dark:border-white/80'
                  : 'bg-white/90 dark:bg-[#121520]/80 text-zinc-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:text-indigo-600 dark:hover:text-white hover:bg-indigo-50/50 dark:hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificate Cards Grid (Shows initial 2 rows / 8 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {visibleCerts.map((cert, idx) => {
              const getCoverGradient = () => {
                switch (cert.category) {
                  case 'AI/ML': return 'from-violet-100/80 to-indigo-50/60 border-violet-200/70 text-violet-700';
                  case 'Data Science': return 'from-sky-100/80 to-indigo-50/60 border-sky-200/70 text-sky-700';
                  case 'Power BI': return 'from-amber-100/80 to-orange-50/60 border-amber-200/70 text-amber-700';
                  default: return 'from-emerald-100/80 to-teal-50/60 border-emerald-200/70 text-emerald-700';
                }
              };

              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx < 8 ? idx * 0.04 : (idx - 8) * 0.03 }}
                  onClick={() => setSelectedPdf({ title: cert.title, pdfUrl: encodeURI(`/${cert.pdfFileName}`) })}
                  className="p-5 rounded-2xl border border-slate-200/90 dark:border-zinc-800/90 bg-gradient-to-b from-white via-white to-indigo-50/20 dark:from-[#151825] dark:via-[#11131E] dark:to-[#0C0E17] hover:border-indigo-300 dark:hover:border-zinc-600 cursor-pointer group transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="top-rim-shimmer" />

                  <div>
                    {/* Certificate Cover / Badge */}
                    <div className={`aspect-video rounded-xl bg-gradient-to-br ${getCoverGradient()} dark:from-zinc-850 dark:to-zinc-950 border dark:border-zinc-800 p-4 flex flex-col justify-between mb-4 group-hover:scale-[1.02] transition-all relative overflow-hidden shadow-xs`}>
                      <div className="flex items-center justify-between">
                        <Award size={22} className="text-indigo-600 dark:text-zinc-300 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-mono text-indigo-800 dark:text-zinc-400 bg-white/90 dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-zinc-700 shadow-xs font-semibold">
                          {cert.date}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-indigo-700 dark:text-zinc-400 uppercase tracking-wider block font-bold">
                          {cert.issuer}
                        </span>
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{cert.title}</h4>
                      </div>
                    </div>

                    <h3 className="font-bold text-zinc-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-zinc-300 transition-colors line-clamp-1">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{cert.issuer}</p>

                    {/* Skills tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {cert.skills.slice(0, 3).map((s) => (
                        <span key={s} className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-indigo-50/70 text-indigo-900 border border-indigo-100/80 dark:bg-zinc-800 dark:text-zinc-300 dark:border-transparent">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View PDF CTA */}
                  <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-indigo-600 dark:text-zinc-300 group-hover:text-indigo-700 dark:group-hover:text-white font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Eye size={14} />
                      <span>Inspect PDF</span>
                    </span>
                    <ExternalLink size={12} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Expand / Collapse Action Control with Down Arrow */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 rounded-2xl bg-white/95 dark:bg-[#121520] hover:bg-indigo-50/70 dark:hover:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200/90 hover:border-indigo-300 dark:border-zinc-800 dark:hover:border-zinc-700 shadow-md hover:shadow-xl font-mono text-xs font-semibold flex items-center space-x-3 transition-all group backdrop-blur-sm"
            >
              <span>
                {isExpanded
                  ? 'Show Fewer Certificates'
                  : `View All ${filteredCerts.length} Verified Certificates (${filteredCerts.length - 8} more)`}
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

      {/* PDF Modal Viewer */}
      <AnimatePresence>
        {selectedPdf && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-5xl h-[88vh] rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#11131C] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center space-x-3">
                  <FileText size={20} className="text-zinc-700 dark:text-zinc-300" />
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white font-mono truncate max-w-md sm:max-w-xl">{selectedPdf.title}</h3>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
                  <a
                    href={selectedPdf.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 font-mono text-xs font-semibold flex items-center space-x-1.5 transition-all border border-indigo-200/80 dark:border-zinc-700 shadow-xs"
                  >
                    <ExternalLink size={13} />
                    <span className="hidden sm:inline">Open in New Tab</span>
                    <span className="sm:hidden">Open</span>
                  </a>
                  <a
                    href={selectedPdf.pdfUrl}
                    download
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-950 text-white dark:from-white dark:to-zinc-200 dark:text-zinc-900 font-mono text-xs font-semibold hover:opacity-90 transition-all shadow-sm border border-zinc-700 dark:border-white"
                  >
                    Download
                  </a>
                  <button
                    onClick={() => setSelectedPdf(null)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* PDF Viewer Object / iFrame */}
              <div className="flex-1 bg-zinc-100 dark:bg-zinc-900 relative">
                <object
                  data={selectedPdf.pdfUrl}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <iframe
                    src={selectedPdf.pdfUrl}
                    className="w-full h-full border-none"
                    title={selectedPdf.title}
                  />
                </object>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
