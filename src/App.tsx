import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import AILabSection from './components/ai-lab/AILabSection';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Certificates from './components/sections/Certificates';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import DeveloperTerminal from './components/terminal/DeveloperTerminal';
import AIChatbot from './components/ai-assistant/AIChatbot';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    // Artificial loader timer for initial neural model setup feel
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K to launch CLI
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] dark:bg-[#090A0F] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 relative transition-colors duration-200">
      {/* Top Header Navigation */}
      <Header onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Main Page Content */}
      <main>
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <About />
        <AILabSection />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Floating Developer CLI Terminal Modal */}
      <DeveloperTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Floating AI Assistant Chatbot */}
      <AIChatbot />
    </div>
  );
}
