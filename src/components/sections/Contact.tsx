import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Github, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const message = String(data.get('message') || '');

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 8) {
      setTimeout(() => {
        setStatus({ type: 'error', message: 'Please enter a valid name, email address, and message.' });
        setIsSubmitting(false);
      }, 300);
      return;
    }

    setTimeout(() => {
      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent. Shivam will respond shortly.'
      });
      setIsSubmitting(false);
      form.reset();
    }, 500);
  }

  return (
    <section id="contact" className="py-24 relative bg-[#F5F5F7] dark:bg-[#090A0F] bg-ambient-mesh transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 dark:bg-zinc-800/90 border border-rose-200/80 dark:border-zinc-700/80 text-rose-700 dark:text-zinc-300 text-xs font-mono font-medium mb-4 shadow-sm">
            <Mail size={14} className="text-rose-600 dark:text-zinc-400" />
            <span>GET IN TOUCH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Let's Build Something{' '}
            <span className="name-gradient-diagonal">
              Intelligent
            </span>
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Have a project, role, or AI consultation in mind? Send a message or reach out through social channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 p-8 rounded-2xl border border-slate-200/90 dark:border-zinc-800/90 bg-gradient-to-b from-white via-white to-indigo-50/20 dark:from-[#151825] dark:via-[#11131E] dark:to-[#0C0E17] shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-zinc-600 transition-all duration-300 space-y-6 relative overflow-hidden"
          >
            <div className="top-rim-shimmer" />

            <h3 className="text-lg font-bold text-zinc-900 dark:text-white font-mono">Contact Information</h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Shivam is currently open to full-time AI/ML Engineering roles, Data Science opportunities, and technical consulting.
            </p>

            <div className="space-y-3.5">
              <a
                href="mailto:rajputshivamsingh510@gmail.com"
                className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-white dark:bg-gradient-to-r dark:from-zinc-900/90 dark:to-[#121520] border border-slate-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-zinc-600 hover:bg-indigo-50/50 dark:hover:from-zinc-850 dark:hover:to-[#181c2c] text-zinc-700 dark:text-zinc-300 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-zinc-800 text-indigo-600 dark:text-zinc-200 group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-violet-600 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-900 transition-colors">
                  <Mail size={16} />
                </div>
                <div className="truncate">
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 block font-semibold">Direct Email</span>
                  <span className="text-xs font-mono text-zinc-900 dark:text-zinc-100 font-semibold truncate group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                    rajputshivamsingh510@gmail.com
                  </span>
                </div>
              </a>

              <div className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-white dark:bg-gradient-to-r dark:from-zinc-900/90 dark:to-[#121520] border border-slate-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-zinc-800 text-indigo-600 dark:text-zinc-200">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 block font-semibold">Location</span>
                  <span className="text-xs font-mono text-zinc-900 dark:text-zinc-100 font-semibold">Punjab, INDIA (IST / Remote)</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-zinc-800">
              <span className="text-xs font-mono text-indigo-700 dark:text-zinc-400 block mb-3 font-semibold">SOCIAL CONNECTIONS</span>
              <div className="flex space-x-3">
                <a
                  href="https://www.linkedin.com/in/shivam-singh-243000232/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-white dark:bg-gradient-to-r dark:from-zinc-900 dark:to-[#111420] border border-slate-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-zinc-600 hover:bg-indigo-50/50 dark:hover:from-zinc-800 dark:hover:to-[#181c2c] text-zinc-700 hover:text-indigo-700 dark:text-zinc-100 dark:hover:text-white flex items-center justify-center space-x-2 text-xs font-mono transition-all shadow-xs font-semibold group"
                >
                  <Linkedin size={15} className="text-indigo-600 dark:text-zinc-300 group-hover:text-indigo-700 dark:group-hover:text-white transition-colors" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://github.com/rajputshivamsingh510"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-white dark:bg-gradient-to-r dark:from-zinc-900 dark:to-[#111420] border border-slate-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-zinc-600 hover:bg-indigo-50/50 dark:hover:from-zinc-800 dark:hover:to-[#181c2c] text-zinc-700 hover:text-indigo-700 dark:text-zinc-100 dark:hover:text-white flex items-center justify-center space-x-2 text-xs font-mono transition-all shadow-xs font-semibold group"
                >
                  <Github size={15} className="text-indigo-600 dark:text-zinc-300 group-hover:text-indigo-700 dark:group-hover:text-white transition-colors" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 p-8 rounded-2xl border border-slate-200/90 dark:border-zinc-800/90 bg-gradient-to-b from-white via-white to-indigo-50/20 dark:from-[#151825] dark:via-[#11131E] dark:to-[#0C0E17] shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-zinc-600 transition-all duration-300 relative overflow-hidden"
          >
            <div className="top-rim-shimmer" />

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-700 dark:text-zinc-400 mb-1.5 font-medium">YOUR NAME</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 focus:bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-mono shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-700 dark:text-zinc-400 mb-1.5 font-medium">EMAIL ADDRESS</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 focus:bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-mono shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-700 dark:text-zinc-400 mb-1.5 font-medium">PROJECT / INQUIRY DETAILS</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Describe your machine learning model requirements, dataset specs, or position opportunity..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 focus:bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-zinc-900 dark:text-white text-xs placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all font-mono resize-none shadow-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white dark:from-white dark:via-zinc-100 dark:to-zinc-200 dark:text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 border border-indigo-500/30 dark:border-white/60 disabled:opacity-50 transition-all"
              >
                <Send size={14} />
                <span>{isSubmitting ? 'Transmitting Message...' : 'Send Message'}</span>
              </button>

              {status && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-mono flex items-center space-x-2 ${
                    status.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-zinc-800 dark:text-white dark:border-zinc-700'
                      : 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
                  }`}
                >
                  {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{status.message}</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
