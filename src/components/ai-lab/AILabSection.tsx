import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Activity, Cpu, Code2 } from 'lucide-react';
import NLPSentimentWorkbench from './NLPSentimentWorkbench';
import WalletRiskPredictor from './WalletRiskPredictor';
import NeuralNetworkVisualizer from './NeuralNetworkVisualizer';

type TabType = 'nlp' | 'risk' | 'neural';

export default function AILabSection() {
  const [activeTab, setActiveTab] = useState<TabType>('nlp');

  const tabs = [
    {
      id: 'nlp' as TabType,
      title: 'NLP Sentiment & Intent',
      subtitle: 'Live Text Classification',
      icon: <Sparkles size={18} />,
    },
    {
      id: 'risk' as TabType,
      title: 'DeFi Risk Predictor',
      subtitle: 'Anomaly Scoring Model',
      icon: <Activity size={18} />,
    },
    {
      id: 'neural' as TabType,
      title: 'Neural Activation Graph',
      subtitle: 'Signal Propagation',
      icon: <Cpu size={18} />,
    }
  ];

  return (
    <section id="ai-lab" className="py-24 relative overflow-hidden bg-white/50 dark:bg-[#0C0E14] bg-ambient-mesh border-y border-zinc-200/80 dark:border-zinc-800/80 transition-colors duration-200">
      {/* Ambient Lighting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] bg-gradient-to-r from-indigo-500/6 to-slate-400/6 dark:from-indigo-600/6 dark:to-slate-400/6 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-violet-50 dark:bg-zinc-800/90 border border-violet-200/80 dark:border-zinc-700/80 text-violet-700 dark:text-zinc-300 text-xs font-mono font-medium mb-4 shadow-sm"
          >
            <Code2 size={14} className="text-violet-600 dark:text-zinc-400" />
            <span>INTERACTIVE DEMOS & BENCHMARKS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight"
          >
            Live{' '}
            <span className="name-gradient-diagonal">
              AI & ML Studio
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed"
          >
            Test live machine learning algorithms directly inside the browser. Try out NLP sentiment scoring, DeFi risk vector prediction, or neural layer activation.
          </motion.p>
        </div>

        {/* Tab Switcher - Apple Segmented Style */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-3 rounded-2xl flex items-center space-x-3 transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 text-white dark:from-white dark:to-zinc-200 dark:text-zinc-950 shadow-lg shadow-indigo-600/25 border border-indigo-500/30 dark:border-white/80'
                    : 'bg-white/90 dark:bg-[#121520]/80 text-zinc-700 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:bg-indigo-50/40 dark:hover:bg-zinc-800 hover:border-indigo-200 dark:hover:border-zinc-700 hover:text-indigo-600 dark:hover:text-white'
                }`}
              >
                <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20 text-white dark:bg-zinc-900 dark:text-zinc-900' : 'bg-indigo-50 text-indigo-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                  {tab.icon}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold font-mono">{tab.title}</div>
                  <div className={`text-[10px] ${isActive ? 'text-indigo-100 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-500'}`}>{tab.subtitle}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tool View */}
        <div className="min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'nlp' && <NLPSentimentWorkbench />}
              {activeTab === 'risk' && <WalletRiskPredictor />}
              {activeTab === 'neural' && <NeuralNetworkVisualizer />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
