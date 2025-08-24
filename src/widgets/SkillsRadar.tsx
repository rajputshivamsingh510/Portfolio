import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

type Datum = { subject: string; A: number; fullMark: number };

const data: Datum[] = [
  { subject: 'Python', A: 95, fullMark: 100 },
  { subject: 'Java', A: 90, fullMark: 100 }, 
  { subject: 'ML', A: 92, fullMark: 100 },
  { subject: 'DL', A: 88, fullMark: 100 },
  { subject: 'Data Science', A: 90, fullMark: 100 },
  { subject: 'SQL', A: 80, fullMark: 100 },
  { subject: 'OOPS & DSA', A: 85, fullMark: 100 },
];

export default function SkillsRadar() {
  return (
    <div className="w-full h-72 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
      <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">Skills Radar</h4>
      <ResponsiveContainer width="100%" height="90%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Score" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
