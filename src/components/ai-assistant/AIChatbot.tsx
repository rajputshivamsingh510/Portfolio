import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, ArrowRight } from 'lucide-react';

const PRESET_QUESTIONS = [
  "What are Shivam's top AI & ML skills?",
  "Tell me about the Lloyds Banking internship",
  "What is the Wallet Risk Analyzer project?",
  "How can I contact or hire Shivam?"
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; actionLink?: string; actionText?: string }>>([
    {
      sender: 'bot',
      text: "👋 Hi! I'm Shivam's portfolio assistant. Ask me anything about his ML models, data science experience, or certifications!"
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg = textToSend.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "Shivam is an AI/ML Engineer with expertise in Python, PyTorch, TensorFlow, NLP, and Data Analytics.";
      let actionLink: string | undefined;
      let actionText: string | undefined;

      const lower = userMsg.toLowerCase();

      if (lower.includes('skill') || lower.includes('stack') || lower.includes('know') || lower.includes('pytorch')) {
        botResponse = "Shivam's core skills include Python (95%), TensorFlow & PyTorch (90%), Scikit-Learn (95%), SQL (90%), Power BI, Pandas, Java, and NLP. He builds end-to-end ML pipelines from data processing to model deployment.";
        actionLink = '#skills';
        actionText = 'View Full Skills Matrix';
      } else if (lower.includes('lloyd') || lower.includes('intern') || lower.includes('experience') || lower.includes('wabric')) {
        botResponse = "Shivam is currently an AI/ML Trainee at Wabric building RESTful APIs & predictive models. Previously, he completed a Data Science Internship at Lloyds Banking Group focused on customer churn prediction and EDA!";
        actionLink = '#experience';
        actionText = 'View Experience Timeline';
      } else if (lower.includes('wallet') || lower.includes('project') || lower.includes('traffic') || lower.includes('risk')) {
        botResponse = "One of Shivam's flagship projects is the Ethereum Wallet Risk Analyzer (DeFi risk scoring using Moralis API & RandomForest). He has also built a Smart Traffic System using U-Net3 segmentation and Weather Forecasting using Spatio-Temporal LSTMs!";
        actionLink = '#projects';
        actionText = 'Explore Projects Showcase';
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('reach')) {
        botResponse = "You can get in touch with Shivam directly via email at rajputshivamsingh510@gmail.com, connect on LinkedIn, or submit the contact form below!";
        actionLink = '#contact';
        actionText = 'Go to Contact Form';
      } else if (lower.includes('certif') || lower.includes('ibm') || lower.includes('power bi')) {
        botResponse = "Shivam holds over 15+ industry certifications including IBM Data Science, Microsoft Power BI Data Analyst, Machine Learning with Python, and Lloyds Banking Group Data Science Virtual Internship.";
        actionLink = '#certificates';
        actionText = 'View Verified Certificates';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse, actionLink, actionText }]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white dark:from-white dark:to-zinc-200 dark:text-zinc-950 shadow-2xl shadow-indigo-600/30 dark:shadow-none flex items-center space-x-2 border border-indigo-400/40 dark:border-zinc-200/50 group transition-all"
        aria-label="Open Shivam AI Assistant"
      >
        <Bot size={20} className="group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-semibold font-mono hidden sm:inline-block">Ask AI</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </motion.button>

      {/* Floating Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-24 right-4 sm:right-8 z-50 w-[92vw] sm:w-[380px] h-[520px] rounded-2xl border border-slate-200 dark:border-zinc-700/90 bg-white/95 dark:bg-[#11131C]/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-slate-50 dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-zinc-800 text-indigo-600 dark:text-zinc-200 border border-indigo-100 dark:border-transparent">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                    Portfolio Assistant
                    <Sparkles size={12} className="text-indigo-600 dark:text-zinc-400" />
                  </h4>
                  <p className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Online & Ready
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white dark:bg-white dark:text-zinc-900 rounded-br-none shadow-sm'
                        : 'bg-slate-100 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-800/80 rounded-bl-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.actionLink && (
                      <a
                        href={msg.actionLink}
                        onClick={() => setIsOpen(false)}
                        className="mt-2.5 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-zinc-800 dark:text-white font-mono text-[11px] font-semibold border border-indigo-200 dark:border-zinc-700 transition-all"
                      >
                        <span>{msg.actionText}</span>
                        <ArrowRight size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-zinc-900/80 p-3 rounded-2xl rounded-bl-none flex items-center space-x-1.5 border border-slate-200 dark:border-zinc-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompts Chips */}
            <div className="px-3 py-2 bg-slate-50 dark:bg-zinc-900/90 border-t border-slate-200 dark:border-zinc-800 flex overflow-x-auto gap-1.5 no-scrollbar">
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 text-[10px] font-mono text-zinc-700 dark:text-zinc-300 hover:text-indigo-700 dark:hover:text-white hover:border-indigo-300 hover:bg-indigo-50/50 border border-slate-200 dark:border-zinc-700 transition-all shadow-xs"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputVal);
              }}
              className="p-3 bg-slate-50 dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about Shivam's AI background..."
                className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-xs placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white dark:bg-white dark:text-zinc-900 disabled:opacity-40 transition-all shadow-md shadow-indigo-600/20"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
