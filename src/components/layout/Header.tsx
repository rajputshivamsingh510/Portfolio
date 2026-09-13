import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Download, Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

interface HeaderProps {
  onOpenTerminal?: () => void;
}

const navItems = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#ai-lab', label: 'AI Studio', badge: 'DEMOS' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
];

export default function Header({ onOpenTerminal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Shivam_Singh_Resume.pdf';
    link.click();
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#090A0F]/80 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Emblem Logo */}
        <a
          href="#hero"
          className="flex items-center group relative p-1 rounded-xl hover:bg-slate-100/80 dark:hover:bg-zinc-800/60 transition-all"
          aria-label="Shivam Singh Home"
        >
          {/* Light Theme: Sleek Charcoal Cyber Mask */}
          <img
            src="/logo-dark.png"
            alt="Shivam Singh Emblem"
            className="w-10 h-10 object-contain dark:hidden group-hover:scale-110 group-hover:drop-shadow-[0_4px_12px_rgba(99,102,241,0.25)] transition-all duration-300"
          />
          {/* Dark Theme: Radiant White/Silver Cyber Mask */}
          <img
            src="/logo-light.png"
            alt="Shivam Singh Emblem"
            className="w-10 h-10 object-contain hidden dark:block group-hover:scale-110 group-hover:drop-shadow-[0_4px_16px_rgba(255,255,255,0.4)] transition-all duration-300"
          />
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-medium">
          {navItems.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ y: -1 }}
              className="relative text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-colors py-1 flex items-center gap-1.5"
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-semibold rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/80 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700">
                  {item.badge}
                </span>
              )}
            </motion.a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Developer CLI Terminal Trigger */}
          <button
            onClick={onOpenTerminal}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50/60 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-indigo-700 dark:hover:text-white border border-slate-200 hover:border-indigo-300 dark:border-zinc-800 font-mono text-xs flex items-center space-x-1.5 transition-all shadow-xs group"
            title="Open Developer Terminal Shell"
          >
            <Terminal size={14} className="text-zinc-400 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-white" />
            <span className="hidden sm:inline-block font-semibold">CLI</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono hidden md:inline-block">Ctrl+K</span>
          </button>

          {/* Resume Download CTA */}
          <button
            onClick={handleResumeDownload}
            className="hidden sm:flex px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 font-semibold text-xs items-center space-x-1.5 shadow-md shadow-indigo-600/20 dark:shadow-none transition-all"
          >
            <Download size={14} />
            <span>Resume</span>
          </button>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 hover:text-indigo-600 dark:hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-[#090A0F]/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 px-5 py-4 space-y-3"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-white py-1.5"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal?.();
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-50 dark:bg-zinc-900 text-indigo-900 dark:text-zinc-200 border border-indigo-200 dark:border-zinc-800 font-mono text-xs flex items-center justify-center space-x-2"
              >
                <Terminal size={14} />
                <span>Launch CLI Shell</span>
              </button>
              <button
                onClick={handleResumeDownload}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 dark:bg-white text-white dark:text-zinc-900 font-semibold text-xs flex items-center justify-center space-x-2 shadow-md shadow-indigo-600/20"
              >
                <Download size={14} />
                <span>Download Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
