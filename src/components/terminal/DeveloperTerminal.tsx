import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CornerDownLeft } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeveloperTerminal({ isOpen, onClose }: TerminalProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; output: React.ReactNode }>>([
    {
      cmd: 'welcome',
      output: (
        <div className="space-y-1 text-zinc-300">
          <p className="text-zinc-100 font-bold">ShivamOS Shell v2.4.0 (x86_64-pc-linux-gnu)</p>
          <p className="text-zinc-400">Type <span className="text-zinc-200 font-bold underline">help</span> to list available portfolio commands.</p>
        </div>
      )
    }
  ]);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleRunCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs font-mono text-zinc-300">
            <p className="text-zinc-100 font-bold mb-2">Available Shell Commands:</p>
            <p><span className="text-zinc-400 w-24 inline-block font-bold">about</span> - Shivam's engineering background & bio</p>
            <p><span className="text-zinc-400 w-24 inline-block font-bold">skills</span> - List core ML, DL, & Python stack</p>
            <p><span className="text-zinc-400 w-24 inline-block font-bold">projects</span> - View featured AI/ML repositories</p>
            <p><span className="text-zinc-400 w-24 inline-block font-bold">experience</span> - View traineeships & internships</p>
            <p><span className="text-zinc-400 w-24 inline-block font-bold">certs</span> - View verified certifications</p>
            <p><span className="text-zinc-400 w-24 inline-block font-bold">contact</span> - Show email, location, and links</p>
            <p><span className="text-zinc-400 w-24 inline-block font-bold">matrix</span> - Toggle retro matrix digital rain mode</p>
            <p><span className="text-zinc-400 w-24 inline-block font-bold">clear</span> - Clear terminal buffer</p>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="text-xs font-mono text-zinc-300 leading-relaxed space-y-2">
            <p className="text-white font-bold">Shivam Singh — AI/ML Engineer & Data Scientist</p>
            <p>Specialized in NLP chatbots, predictive modeling, U-Net image segmentation, spatio-temporal LSTMs, and data analytics automation.</p>
            <p className="text-zinc-400">Currently expanding capabilities with Google Advanced Data Analytics & Microsoft Power BI Data Analyst certifications.</p>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="text-xs font-mono space-y-1">
            <p className="text-white font-bold">Primary Technology Stack:</p>
            <p className="text-zinc-300"><span className="text-zinc-400">Languages:</span> Python (95%), Java (80%), SQL (90%), HTML/CSS</p>
            <p className="text-zinc-300"><span className="text-zinc-400">ML/DL Frameworks:</span> TensorFlow, PyTorch, Scikit-learn, Keras</p>
            <p className="text-zinc-300"><span className="text-zinc-400">Data Engineering:</span> Pandas, NumPy, Power BI, SQL, Matplotlib, Selenium</p>
            <p className="text-zinc-300"><span className="text-zinc-400">Core CS:</span> DSA, Object-Oriented Programming (OOP), REST APIs</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="text-xs font-mono space-y-2">
            <p className="text-white font-bold">Top Featured Repositories:</p>
            <p>1. <span className="text-zinc-200 font-bold">Wallet Risk Analyzer</span> — Ethereum DeFi risk scoring (RandomForest + Moralis API)</p>
            <p>2. <span className="text-zinc-200 font-bold">Smart Traffic System</span> — U-Net3 computer vision segmentation model</p>
            <p>3. <span className="text-zinc-200 font-bold">Weather LSTM</span> — Spatio-temporal deep learning weather forecasting</p>
            <p>4. <span className="text-zinc-200 font-bold">PDF Q-Gen</span> — Automated question generation via NLP pipeline</p>
            <p className="text-zinc-500">Run 'certs' or scroll to Projects section for full list of 25+ projects.</p>
          </div>
        );
        break;

      case 'certs':
        output = (
          <div className="text-xs font-mono text-zinc-300 space-y-1">
            <p className="text-white font-bold">Verified Credentials (Local PDFs):</p>
            <p>• IBM Data Science Professional Certificate</p>
            <p>• Microsoft Power BI Data Analyst</p>
            <p>• Machine Learning with Python (IBM)</p>
            <p>• Lloyds Banking Group Data Science Internship</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-xs font-mono text-zinc-300 space-y-1">
            <p className="text-white font-bold font-mono">Contact Details:</p>
            <p>Email: <a href="mailto:rajputshivamsingh510@gmail.com" className="text-zinc-200 underline">rajputshivamsingh510@gmail.com</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/shivam-singh-243000232/" target="_blank" rel="noreferrer" className="text-zinc-200 underline">in/shivam-singh-243000232</a></p>
            <p>GitHub: <a href="https://github.com/rajputshivamsingh510" target="_blank" rel="noreferrer" className="text-zinc-200 underline">github.com/rajputshivamsingh510</a></p>
            <p>Location: Punjab, INDIA</p>
          </div>
        );
        break;

      case 'matrix':
        setIsMatrixMode(!isMatrixMode);
        output = <p className="text-emerald-400 font-mono font-bold">Matrix mode {!isMatrixMode ? 'ENABLED 🟢' : 'DISABLED 🔴'}</p>;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <p className="text-rose-400 text-xs font-mono">
            zsh: command not found: <span className="font-bold">{cmd}</span>. Type <span className="text-zinc-200 underline">help</span> for commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { cmd: inputVal, output }]);
    setInputVal('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-3xl rounded-2xl border border-zinc-700 bg-[#0C0E14] text-white shadow-2xl overflow-hidden flex flex-col h-[520px] relative"
        >
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#11131C] border-b border-zinc-800">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer" onClick={onClose} />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-3 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <Terminal size={14} className="text-zinc-400" />
                shivam@ai-ml-node:~
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* Matrix Digital Rain Animation Overlay if enabled */}
          {isMatrixMode && (
            <div className="absolute inset-x-0 bottom-0 top-12 pointer-events-none opacity-20 overflow-hidden font-mono text-[10px] text-emerald-400 flex justify-between px-4">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="animate-pulse" style={{ animationDuration: `${1 + (i % 5) * 0.5}s` }}>
                  01101<br />10010<br />11100<br />00110<br />10101<br />01100
                </div>
              ))}
            </div>
          )}

          {/* Console Log Scroll Buffer */}
          <div className="flex-1 p-5 overflow-y-auto font-mono text-xs space-y-4">
            {history.map((item, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex items-center space-x-2 text-zinc-400">
                  <span className="text-zinc-500">shivam@ai-ml-node:~$</span>
                  <span className="text-white font-bold">{item.cmd}</span>
                </div>
                <div className="pl-4">{item.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Prompt Command Form */}
          <form onSubmit={handleRunCommand} className="flex items-center px-4 py-3 bg-[#11131C] border-t border-zinc-800">
            <span className="text-zinc-500 font-mono text-xs mr-2 shrink-0">shivam@ai-ml-node:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type 'help', 'skills', 'projects'..."
              className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-zinc-600"
              autoFocus
            />
            <button type="submit" className="text-xs text-zinc-300 hover:text-white font-mono flex items-center gap-1">
              <span>Execute</span>
              <CornerDownLeft size={12} />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
