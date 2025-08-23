import React, { useMemo, useState } from 'react';

type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
};

export default function ProjectFilter({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState('');
  const [stack, setStack] = useState<string>('All');

  const stacks = useMemo(() => {
    const s = new Set<string>(['All']);
    projects.forEach(p => p.tech.forEach(t => s.add(t)));
    return Array.from(s);
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter(p => {
      const matchesQuery = (p.title + ' ' + p.description + ' ' + p.tech.join(' ')).toLowerCase().includes(query.toLowerCase());
      const matchesStack = stack === 'All' || p.tech.includes(stack);
      return matchesQuery && matchesStack;
    });
  }, [projects, query, stack]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects or tech..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {stacks.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="text-sm text-gray-600 dark:text-gray-300">
        Showing <b>{filtered.length}</b> of {projects.length}
      </div>

      {/* This component intentionally only filters; the parent renders the cards. */}
    </div>
  );
}
