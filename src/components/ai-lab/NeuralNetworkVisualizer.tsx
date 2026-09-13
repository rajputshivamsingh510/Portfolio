import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Play, Pause } from 'lucide-react';

export default function NeuralNetworkVisualizer() {
  const [activationFn, setActivationFn] = useState<'GELU' | 'ReLU' | 'Sigmoid' | 'Softmax'>('GELU');
  const [isRunning, setIsRunning] = useState(true);
  const [learningRate] = useState(0.01);
  const [loss, setLoss] = useState(0.042);
  const [epoch, setEpoch] = useState(148);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setEpoch((prev) => prev + 1);
      setLoss((prev) => Math.max(0.008, Number((prev * 0.992 + (Math.random() * 0.004 - 0.002)).toFixed(4))));
    }, 400);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Layers structure
  const layers = [
    { name: 'Input', count: 4 },
    { name: 'Hidden 1', count: 6 },
    { name: 'Hidden 2', count: 5 },
    { name: 'Output', count: 3 }
  ];

  return (
    <div className="rounded-2xl p-6 sm:p-8 border border-indigo-100/90 dark:border-zinc-800 bg-white/95 dark:bg-[#11131C] shadow-sm relative overflow-hidden transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-200/80 dark:border-zinc-800 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-zinc-900 text-indigo-600 dark:text-zinc-300 border border-indigo-100 dark:border-zinc-800">
            <Cpu size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              Neural Network Architecture Visualizer
              <span className="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full bg-indigo-50 dark:bg-zinc-800 text-indigo-700 dark:text-zinc-300 border border-indigo-200/80 dark:border-zinc-700">
                Live Activation Demo
              </span>
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Observe signal propagation, learning rate adjustments, and loss convergence live.</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-200 font-mono text-xs flex items-center space-x-2 border border-indigo-200/80 dark:border-zinc-700 transition-all shadow-xs"
          >
            {isRunning ? <Pause size={14} className="text-indigo-600 dark:text-zinc-400" /> : <Play size={14} className="text-indigo-600 dark:text-white" />}
            <span>{isRunning ? 'Pause' : 'Simulate'}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas & Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* SVG Network Visualizer Graph */}
        <div className="lg:col-span-8 bg-gradient-to-br from-indigo-50/40 via-white to-violet-50/30 dark:bg-zinc-950/80 rounded-2xl p-6 border border-slate-200/90 dark:border-zinc-800/90 relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
          <svg className="w-full h-64" viewBox="0 0 600 240">
            {/* Connecting Lines */}
            {layers.flatMap((layer, lIdx) => {
              if (lIdx === layers.length - 1) return [];
              const nextLayer = layers[lIdx + 1];
              const x1 = 80 + lIdx * 150;
              const x2 = 80 + (lIdx + 1) * 150;

              return Array.from({ length: layer.count }).flatMap((_, n1) => {
                const y1 = 120 - ((layer.count - 1) * 32) / 2 + n1 * 32;

                return Array.from({ length: nextLayer.count }).map((_, n2) => {
                  const y2 = 120 - ((nextLayer.count - 1) * 32) / 2 + n2 * 32;

                  return (
                    <line
                      key={`${lIdx}-${n1}-${n2}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="currentColor"
                      className="text-indigo-300/80 dark:text-zinc-700"
                      strokeWidth={1}
                      strokeDasharray={isRunning ? '3 3' : 'none'}
                      opacity={0.7}
                    />
                  );
                });
              });
            })}

            {/* Nodes */}
            {layers.flatMap((layer, lIdx) => {
              const x = 80 + lIdx * 150;
              return Array.from({ length: layer.count }).map((_, nIdx) => {
                const y = 120 - ((layer.count - 1) * 32) / 2 + nIdx * 32;

                return (
                  <g key={`node-${lIdx}-${nIdx}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r={10}
                      className="fill-white dark:fill-zinc-900 stroke-indigo-600 dark:stroke-zinc-300"
                      strokeWidth="2"
                    />
                    {isRunning && (
                      <motion.circle
                        cx={x}
                        cy={y}
                        r={4}
                        className="fill-indigo-600 dark:fill-zinc-100"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.3, 0.8] }}
                        transition={{
                          duration: 1 + Math.random() * 0.8,
                          repeat: Infinity,
                          delay: lIdx * 0.2 + nIdx * 0.1
                        }}
                      />
                    )}
                  </g>
                );
              });
            })}
          </svg>

          {/* Layer Labels */}
          <div className="w-full flex justify-between px-6 pt-3 border-t border-slate-200/80 dark:border-zinc-800 text-[11px] font-mono text-indigo-700 dark:text-zinc-400 font-semibold">
            {layers.map((l, i) => (
              <span key={i}>{l.name} Layer</span>
            ))}
          </div>
        </div>

        {/* Hyperparameters & Metrics */}
        <div className="lg:col-span-4 space-y-4">
          {/* Activation Function Switcher */}
          <div className="p-4 rounded-xl bg-slate-50/90 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800">
            <span className="text-xs font-mono text-indigo-700 dark:text-zinc-400 block mb-2 font-semibold">ACTIVATION FUNCTION</span>
            <div className="grid grid-cols-2 gap-2">
              {(['GELU', 'ReLU', 'Sigmoid', 'Softmax'] as const).map((fn) => (
                <button
                  key={fn}
                  onClick={() => setActivationFn(fn)}
                  className={`py-1.5 rounded-xl text-xs font-mono font-semibold border transition-all ${
                    activationFn === fn
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white dark:bg-white dark:text-zinc-900 border-indigo-600 dark:border-white shadow-sm shadow-indigo-600/20'
                      : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 border-slate-200 dark:border-zinc-700 hover:bg-indigo-50/50 hover:text-indigo-600 hover:border-indigo-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {fn}
                </button>
              ))}
            </div>
          </div>

          {/* Training Telemetry */}
          <div className="p-4 rounded-xl bg-slate-50/90 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 space-y-3">
            <span className="text-xs font-mono text-indigo-700 dark:text-zinc-400 block font-semibold">REAL-TIME TELEMETRY</span>
            
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-600 dark:text-zinc-400">Epoch Count:</span>
              <span className="text-emerald-600 dark:text-white font-bold">{epoch}</span>
            </div>

            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-600 dark:text-zinc-400">Loss (CrossEntropy):</span>
              <span className="text-violet-600 dark:text-zinc-200 font-bold">{loss}</span>
            </div>

            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-600 dark:text-zinc-400">Learning Rate (η):</span>
              <span className="text-indigo-600 dark:text-zinc-200 font-bold">{learningRate}</span>
            </div>

            <div className="pt-2 border-t border-slate-200/80 dark:border-zinc-800 text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
              * Forward & backward backpropagation simulation pass.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
