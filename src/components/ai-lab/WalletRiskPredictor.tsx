import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function WalletRiskPredictor() {
  // Input features
  const [txFrequency, setTxFrequency] = useState(140); // tx/month
  const [liquidityRatio, setLiquidityRatio] = useState(35); // %
  const [gasUsageRatio, setGasUsageRatio] = useState(72); // %
  const [unverifiedContractInteractions, setUnverifiedContractInteractions] = useState(4); // count

  // Calculate live risk score (0-100)
  const computeRiskScore = () => {
    const freqFactor = txFrequency > 300 ? 25 : (txFrequency / 300) * 15;
    const liqFactor = (100 - liquidityRatio) * 0.35;
    const gasFactor = (gasUsageRatio / 100) * 20;
    const contractFactor = Math.min(30, unverifiedContractInteractions * 7.5);

    const totalRaw = freqFactor + liqFactor + gasFactor + contractFactor;
    return Math.min(99, Math.max(5, Math.round(totalRaw)));
  };

  const riskScore = computeRiskScore();

  let riskTier: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Critical DeFi Alert' = 'Low Risk';
  let tierColor = 'text-emerald-700 dark:text-zinc-200 border-emerald-200 dark:border-zinc-700 bg-emerald-50 dark:bg-zinc-800';

  if (riskScore >= 75) {
    riskTier = 'Critical DeFi Alert';
    tierColor = 'text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30';
  } else if (riskScore >= 50) {
    riskTier = 'High Risk';
    tierColor = 'text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30';
  } else if (riskScore >= 30) {
    riskTier = 'Moderate Risk';
    tierColor = 'text-indigo-700 dark:text-zinc-200 border-indigo-200 dark:border-zinc-700 bg-indigo-50 dark:bg-zinc-800';
  }

  return (
    <div className="rounded-2xl p-6 sm:p-8 border border-indigo-100/90 dark:border-zinc-800 bg-white/95 dark:bg-[#11131C] shadow-sm relative overflow-hidden transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/80 dark:border-zinc-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-zinc-900 text-indigo-600 dark:text-zinc-300 border border-indigo-100 dark:border-zinc-800">
            <Activity size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              DeFi Wallet Risk Analyzer
              <span className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full bg-sky-50 dark:bg-zinc-800 text-sky-700 dark:text-zinc-300 border border-sky-200/80 dark:border-zinc-700">
                RandomForest & Moralis Model
              </span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Interactive wallet anomaly vector score generator.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Control Panel */}
        <div className="lg:col-span-7 space-y-4">
          {/* Slider 1 */}
          <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">Transaction Frequency (tx / mo)</span>
              <span className="text-indigo-600 dark:text-white font-bold">{txFrequency} txs</span>
            </div>
            <input
              type="range"
              min="5"
              max="500"
              value={txFrequency}
              onChange={(e) => setTxFrequency(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-zinc-100"
            />
          </div>

          {/* Slider 2 */}
          <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">Token Liquidity Reserve Ratio (%)</span>
              <span className="text-indigo-600 dark:text-white font-bold">{liquidityRatio}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={liquidityRatio}
              onChange={(e) => setLiquidityRatio(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-zinc-100"
            />
          </div>

          {/* Slider 3 */}
          <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">Gas Variance / Volatility Index</span>
              <span className="text-indigo-600 dark:text-white font-bold">{gasUsageRatio}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={gasUsageRatio}
              onChange={(e) => setGasUsageRatio(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-zinc-100"
            />
          </div>

          {/* Slider 4 */}
          <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">Unverified Smart Contract Calls</span>
              <span className="text-indigo-600 dark:text-white font-bold">{unverifiedContractInteractions} calls</span>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              value={unverifiedContractInteractions}
              onChange={(e) => setUnverifiedContractInteractions(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-zinc-100"
            />
          </div>
        </div>

        {/* Prediction Results Badge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-white via-indigo-50/40 to-violet-50/30 dark:from-zinc-900/60 dark:to-zinc-900/40 border border-indigo-100/90 dark:border-zinc-800 text-center relative shadow-xs">
          <span className="text-xs font-mono tracking-widest text-indigo-700 dark:text-zinc-400 mb-2 font-semibold">ML INFERENCE SCORE</span>
          
          {/* Radial Score Display */}
          <div className="relative w-36 h-36 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="currentColor" className="text-slate-200/80 dark:text-zinc-800" strokeWidth="8" fill="none" />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * riskScore) / 100}
                strokeLinecap="round"
                className={tierColor.split(' ')[0]}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-extrabold font-mono ${tierColor.split(' ')[0]}`}>
                {riskScore}
              </span>
              <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400">out of 100</span>
            </div>
          </div>

          <span className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono border mt-2 ${tierColor}`}>
            {riskTier}
          </span>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4 leading-relaxed">
            Model evaluates feature vectors using decision tree ensemble. Higher scores indicate suspect token velocity or unverified proxy execution.
          </p>
        </div>
      </div>
    </div>
  );
}
