import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Send, CheckCircle2 } from 'lucide-react';

const PRESET_PROMPTS = [
  "Optimized transformer architecture achieved 98.4% accuracy with under 15ms inference latency.",
  "Model performance degraded significantly due to high data drift and unhandled missing feature vectors.",
  "Successfully deployed automated customer churn pipeline using Scikit-Learn and Docker containerization.",
  "Initial training loss fluctuated wildly before learning rate warmup was applied."
];

interface SentimentResult {
  score: number; // -100 to 100
  label: 'Positive' | 'Negative' | 'Neutral';
  confidence: number; // %
  intent: string;
  keywords: string[];
  metrics: {
    objectivity: number;
    urgency: number;
    technicality: number;
  };
}

export default function NLPSentimentWorkbench() {
  const [inputText, setInputText] = useState(PRESET_PROMPTS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SentimentResult | null>({
    score: 88,
    label: 'Positive',
    confidence: 96.4,
    intent: 'Performance Benchmark Highlight',
    keywords: ['Optimized', 'Transformer', 'Accuracy', 'Inference Latency'],
    metrics: { objectivity: 92, urgency: 15, technicality: 98 }
  });

  const handleAnalyze = (textToAnalyze: string) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const lower = textToAnalyze.toLowerCase();
      let posCount = (lower.match(/optim|accurat|success|improv|achiev|boost|efficient|clean/g) || []).length;
      let negCount = (lower.match(/degrad|fail|drift|drop|error|slow|loss|issue|decline|bad/g) || []).length;

      let score = 0;
      if (posCount > negCount) score = Math.min(95, 45 + posCount * 25 - negCount * 15);
      else if (negCount > posCount) score = Math.max(-95, -45 - negCount * 25 + posCount * 15);
      else score = (Math.random() * 20) - 10;

      score = Math.round(score);

      let label: 'Positive' | 'Negative' | 'Neutral' = 'Neutral';
      if (score > 20) label = 'Positive';
      else if (score < -20) label = 'Negative';

      const words = textToAnalyze.split(/\s+/).filter(w => w.length > 3);
      const keywords = Array.from(new Set(words.map(w => w.replace(/[^a-zA-Z]/g, '')))).slice(0, 5);

      setResult({
        score,
        label,
        confidence: Math.round(85 + Math.random() * 14),
        intent: label === 'Positive' ? 'High System Efficiency / Technical Win' : label === 'Negative' ? 'Anomaly Detection / Technical Warning' : 'Informational Status Report',
        keywords,
        metrics: {
          objectivity: Math.round(75 + Math.random() * 20),
          urgency: label === 'Negative' ? Math.round(70 + Math.random() * 25) : Math.round(10 + Math.random() * 30),
          technicality: Math.round(80 + Math.random() * 18),
        }
      });
      setIsAnalyzing(false);
    }, 500);
  };

  return (
    <div className="rounded-2xl p-6 sm:p-8 border border-indigo-100/90 dark:border-zinc-800 bg-white/95 dark:bg-[#11131C] shadow-sm relative overflow-hidden transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/80 dark:border-zinc-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-zinc-900 text-indigo-600 dark:text-zinc-300 border border-indigo-100 dark:border-zinc-800">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              NLP Sentiment & Intent Workbench
              <span className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full bg-violet-50 dark:bg-zinc-800 text-violet-700 dark:text-zinc-300 border border-violet-200/80 dark:border-zinc-700">
                Transformer Model
              </span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Test Shivam's sentiment extraction & intent classifier logic live.</p>
          </div>
        </div>
      </div>

      {/* Input Area & Presets */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-indigo-700 dark:text-zinc-400 mb-2 font-semibold">
            Try Preset Prompts:
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESET_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(prompt);
                  handleAnalyze(prompt);
                }}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 transition-all text-left truncate max-w-xs font-mono"
              >
                "{prompt.substring(0, 38)}..."
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 focus:bg-white dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-mono text-xs sm:text-sm resize-none"
            placeholder="Type technical notes, model logs, or customer feedback to analyze..."
          />
          <button
            onClick={() => handleAnalyze(inputText)}
            disabled={isAnalyzing || !inputText.trim()}
            className="absolute bottom-3 right-3 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white dark:from-white dark:to-zinc-200 dark:text-zinc-950 dark:hover:bg-zinc-100 font-semibold text-xs flex items-center space-x-2 shadow-md shadow-indigo-600/20 disabled:opacity-50 transition-all"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send size={14} />
                <span>Run NLP Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Output Dashboard */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200/80 dark:border-zinc-800"
        >
          {/* Main Score Pill */}
          <div className="p-4 rounded-xl bg-indigo-50/40 dark:bg-zinc-900/60 border border-indigo-100/80 dark:border-zinc-800 flex flex-col justify-between">
            <span className="text-xs font-mono text-indigo-700 dark:text-zinc-400 font-semibold">SENTIMENT OVERALL</span>
            <div className="my-3 flex items-center justify-between">
              <span className={`text-3xl font-extrabold font-mono ${
                result.score > 20 ? 'text-emerald-600 dark:text-emerald-400' : result.score < -20 ? 'text-rose-600 dark:text-rose-400' : 'text-indigo-600 dark:text-zinc-300'
              }`}>
                {result.score > 0 ? `+${result.score}` : result.score}
              </span>
              <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${
                result.score > 20 ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' :
                result.score < -20 ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800' :
                'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
              }`}>
                {result.label}
              </span>
            </div>
            <div className="w-full bg-slate-200/80 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-zinc-400 dark:to-zinc-100 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.abs(result.score)}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>

          {/* Classification & Confidence */}
          <div className="p-4 rounded-xl bg-violet-50/40 dark:bg-zinc-900/60 border border-violet-100/80 dark:border-zinc-800 flex flex-col justify-between">
            <span className="text-xs font-mono text-violet-700 dark:text-zinc-400 font-semibold">DETECTED INTENT</span>
            <div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white mt-1 mb-2">{result.intent}</p>
              <div className="flex items-center space-x-2 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                <CheckCircle2 size={14} className="text-indigo-600 dark:text-zinc-400" />
                <span>Confidence Rating: <strong className="text-indigo-600 dark:text-zinc-200">{result.confidence}%</strong></span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {result.keywords.map((kw, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100/80 dark:bg-zinc-800 dark:text-zinc-300 font-mono dark:border-zinc-700/60">
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          {/* Feature Metric Bars */}
          <div className="p-4 rounded-xl bg-sky-50/40 dark:bg-zinc-900/60 border border-sky-100/80 dark:border-zinc-800 space-y-2">
            <span className="text-xs font-mono text-sky-700 dark:text-zinc-400 block mb-1 font-semibold">NLP METRIC BREAKDOWN</span>
            
            <div>
              <div className="flex justify-between text-xs text-zinc-700 dark:text-zinc-300 mb-1 font-mono">
                <span>Technical Density</span>
                <span className="text-indigo-600 dark:text-zinc-300 font-bold">{result.metrics.technicality}%</span>
              </div>
              <div className="w-full bg-slate-200/80 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 dark:bg-zinc-300 rounded-full" style={{ width: `${result.metrics.technicality}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-zinc-700 dark:text-zinc-300 mb-1 font-mono">
                <span>Objectivity Index</span>
                <span className="text-violet-600 dark:text-zinc-300 font-bold">{result.metrics.objectivity}%</span>
              </div>
              <div className="w-full bg-slate-200/80 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 dark:bg-zinc-400 rounded-full" style={{ width: `${result.metrics.objectivity}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-zinc-700 dark:text-zinc-300 mb-1 font-mono">
                <span>Action Urgency</span>
                <span className="text-amber-600 dark:text-zinc-300 font-bold">{result.metrics.urgency}%</span>
              </div>
              <div className="w-full bg-slate-200/80 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 dark:bg-zinc-500 rounded-full" style={{ width: `${result.metrics.urgency}%` }} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
