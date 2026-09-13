import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

type Datum = { subject: string; A: number; fullMark: number };

const data: Datum[] = [
  { subject: 'Python', A: 95, fullMark: 100 },
  { subject: 'ML / Scikit', A: 95, fullMark: 100 },
  { subject: 'DL / PyTorch', A: 90, fullMark: 100 },
  { subject: 'Data Science', A: 92, fullMark: 100 },
  { subject: 'SQL & Analytics', A: 90, fullMark: 100 },
  { subject: 'Power BI', A: 88, fullMark: 100 },
  { subject: 'DSA & OOP', A: 88, fullMark: 100 },
];

export default function SkillsRadar({ className = '' }: { className?: string }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ isDark: boolean }>;
      setIsDark(customEvent.detail?.isDark ?? document.documentElement.classList.contains('dark'));
    };
    window.addEventListener('theme-change', handler);
    return () => window.removeEventListener('theme-change', handler);
  }, []);

  return (
    <div className={`w-full h-full min-h-[360px] rounded-3xl border border-slate-200/90 dark:border-zinc-800/90 bg-white dark:bg-[#11131F] p-6 sm:p-7 shadow-sm relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${className}`}>
      <div className="top-rim-shimmer" />

      <div className="flex items-center justify-between mb-2 relative z-10">
        <div>
          <h4 className="text-xs sm:text-sm font-bold font-mono text-zinc-900 dark:text-white uppercase tracking-wider">
            Domain Competency Radar
          </h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
            Quantitative proficiency balance across AI, Engineering, & Analytics
          </p>
        </div>
        <span className="px-2.5 py-1 text-[10px] font-mono font-semibold rounded-full bg-indigo-50 dark:bg-zinc-800 text-indigo-700 dark:text-zinc-300 border border-indigo-200/80 dark:border-zinc-700">
          Benchmark
        </span>
      </div>

      <div className="flex-1 w-full min-h-[260px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="72%" data={data}>
            <PolarGrid stroke={isDark ? "#282E40" : "#E0E7FF"} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: isDark ? '#94A3B8' : '#4338CA', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke={isDark ? "#3A4259" : "#C7D2FE"} tick={{ fill: isDark ? '#64748B' : '#6366F1', fontSize: 9 }} />
            <Radar
              name="Proficiency"
              dataKey="A"
              stroke={isDark ? "#F1F5F9" : "#4F46E5"}
              fill={isDark ? "#F1F5F9" : "#6366F1"}
              fillOpacity={isDark ? 0.25 : 0.22}
              strokeWidth={2}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#11131C' : '#FFFFFF',
                borderColor: isDark ? '#282E40' : '#E2E8F0',
                borderRadius: '12px',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono',
                color: isDark ? '#FFF' : '#18181B',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
