import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';

interface FooterProps {
  onOpenTerminal?: () => void;
}

export default function Footer({ onOpenTerminal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#090A0F] text-zinc-600 dark:text-zinc-400 py-12 relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-200 dark:border-zinc-800">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1.5">
            <div className="flex items-center space-x-2.5">
              <img src="/logo-dark.png" alt="Logo" className="w-6 h-6 object-contain dark:hidden" />
              <img src="/logo-light.png" alt="Logo" className="w-6 h-6 object-contain hidden dark:block" />
              <span className="font-extrabold text-zinc-900 dark:text-white text-base tracking-tight">
                Shivam Singh<span className="text-indigo-600 dark:text-zinc-500 font-bold">.ai</span>
              </span>
            </div>
            <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
              Building Next-Generation Machine Learning & Data Systems
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono">
            <a href="#about" className="hover:text-indigo-600 dark:hover:text-white transition-colors">About</a>
            <a href="#ai-lab" className="hover:text-indigo-600 dark:hover:text-white transition-colors">AI Studio</a>
            <a href="#skills" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Projects</a>
            <a href="#certificates" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Certificates</a>
            <a href="#contact" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Contact</a>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenTerminal}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/60 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-zinc-700 hover:text-indigo-700 hover:border-indigo-300 dark:text-zinc-400 dark:hover:text-white transition-all shadow-xs"
              title="Open CLI Shell"
              aria-label="Open CLI Shell"
            >
              <Terminal size={15} />
            </button>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/60 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-zinc-700 hover:text-indigo-700 hover:border-indigo-300 dark:text-zinc-400 dark:hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono shadow-xs"
            >
              <ArrowUp size={15} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Shivam Singh. All rights reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Engineered with Python, PyTorch & React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
