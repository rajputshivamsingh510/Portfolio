import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Download, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  Moon,
  Sun,
  Menu,
  X,
  MapPin,
  Calendar,
  Award,
  Code,
  Database,
  Cloud,
  Brain,
  ChevronUp,
  Send,
  User,
  MessageSquare,
  Cpu,
  Layers
} from 'lucide-react';
import { ModernLoader, LoaderType } from './loaders/LoaderComponents';
import { LOADER_CONFIG } from './loaders/LoaderConfig';
import SkillsRadar from '../widgets/SkillsRadar';
import ProjectFilter from '../widgets/ProjectFilter';

// Simple Modal Component
const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative max-w-4xl max-h-[90vh] w-full mx-4 bg-white rounded-lg overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const Portfolio = () => {
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'resume.pdf';
    link.click();
  };

  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
   
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const certificatesRef = useRef(null);
  const contactRef = useRef(null);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), LOADER_CONFIG.duration);
    return () => clearTimeout(timer);
  }, []);

  // Animated background particles
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${darkMode ? 'bg-blue-400' : 'bg-blue-600'} rounded-full opacity-20`}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    );
  };

  // Loading Screen with typewriter effect
  const LoadingScreen = () => {
    const [loadingText, setLoadingText] = useState('');
     
    useEffect(() => {
      let textIndex = 0;
      let charIndex = 0;
       
      const typeWriter = () => {
        if (charIndex < LOADER_CONFIG.loadingTexts[textIndex].length) {
          setLoadingText(LOADER_CONFIG.loadingTexts[textIndex].substring(0, charIndex + 1));
          charIndex++;
        } else {
          setTimeout(() => {
            textIndex = (textIndex + 1) % LOADER_CONFIG.loadingTexts.length;
            charIndex = 0;
          }, LOADER_CONFIG.textPauseDuration);
        }
      };

      const interval = setInterval(typeWriter, LOADER_CONFIG.typewriterSpeed);
      return () => clearInterval(interval);
    }, []);

    return (
      <motion.div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${
          darkMode ? 'bg-gray-900' : 'bg-white'
        }`}
        exit={{ 
          opacity: 0, 
          scale: 0.8,
          filter: 'blur(10px)'
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(LOADER_CONFIG.particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 ${
                darkMode ? 'bg-blue-400' : 'bg-blue-600'
              } rounded-full opacity-30`}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: '100%',
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="text-center relative z-10">
          {/* Modern Loader */}
          <motion.div 
            className="mb-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.5, 
              ease: "easeOut",
              delay: 0.2 
            }}
          >
            <ModernLoader 
              type={LOADER_CONFIG.activeLoader} 
              darkMode={darkMode} 
            />
          </motion.div>

          {/* Typewriter Text */}
          <motion.div
            className={`text-xl font-semibold h-8 flex items-center justify-center min-w-[300px] ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span>{loadingText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className={`ml-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
            >
              |
            </motion.span>
          </motion.div>

          {/* Progress Bar */}
          {LOADER_CONFIG.showProgressBar && (
            <motion.div 
              className={`mt-6 w-64 h-1 ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              } rounded-full overflow-hidden mx-auto`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                animate={{ width: ['0%', '100%'] }}
                transition={{ 
                  duration: LOADER_CONFIG.duration / 1000, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </motion.div>
          )}

          {/* Subtitle */}
          <motion.p
            className={`mt-4 text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Crafting an exceptional AI/ML experience...
          </motion.p>

          {/* Version/Build Info (Optional) */}
          <motion.div
            className={`mt-8 text-xs ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            } flex items-center justify-center space-x-4`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span>v2.0.0</span>
            <span>•</span>
            <span>Portfolio Engine</span>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // Navigation
  const Navigation = () => (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 ${
        darkMode ? 'bg-gray-900/90' : 'bg-white/90'
      } backdrop-blur-md border-b ${
        darkMode ? 'border-gray-800' : 'border-gray-200'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            Portfolio
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {['Hero', 'About', 'Skills', 'Projects', 'Experience', 'Certificates', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`${
                  darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                } transition-colors duration-300`}
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700'
              }`}
              whileHover={{ scale: 1.1 }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );

  // Hero Section
  const HeroSection = () => (
    <section
      ref={heroRef}
      id="hero"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden pb-16 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
      }`}
    >
      <ParticleBackground />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className={`text-5xl md:text-7xl font-bold mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Shivam Singh
          </motion.h1>

          <motion.p
            className={`text-xl md:text-2xl mb-4 ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            } font-semibold`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            AI/ML Engineer | Data Scientist | Python Developer
          </motion.p>

          <motion.p
            className={`text-lg mb-8 ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Turning Data into Intelligent Solutions
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={handleResumeDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              <span>Download Resume</span>
            </motion.button>

            <motion.button
              className={`border-2 ${
                darkMode
                  ? 'border-blue-400 text-blue-400 hover:bg-blue-400'
                  : 'border-blue-600 text-blue-600 hover:bg-blue-600'
              } hover:text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              <span>Contact Me</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Down Arrow */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown
          size={32}
          className={darkMode ? 'text-white' : 'text-gray-900'}
        />
      </motion.div>
    </section>
  );

  // About Section
  const AboutSection = () => (
    <section
      ref={aboutRef}
      id="about"
      className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className={`text-4xl font-bold text-center mb-16 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative w-80 h-80 mx-auto"
              whileHover={{ scale: 1.05, rotateY: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`absolute inset-0 rounded-2xl ${
                darkMode ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-400 to-purple-400'
              } opacity-20 blur-xl`} />
              <div className={`relative w-full h-full rounded-2xl overflow-hidden ${
                darkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}>
                <img 
                  src={`${import.meta.env.BASE_URL}my_pic.jpg`} 
                  alt="My Portrait" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.p
              className={`text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              I am a passionate AI/ML Engineer and Data Scientist with hands-on experience in
              building predictive models, NLP chatbots, and automated data workflows. Skilled 
              in Python, Machine Learning, Deep Learning, and Data Visualization, I enjoy 
              solving complex problems and transforming raw data into actionable insights.
            </motion.p>

            <motion.p
              className={`text-lg leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Currently, I am enhancing my expertise with Google Advanced Data Analytics and
              Microsoft Power BI certifications, while working on real-world projects like stock
              market prediction, customer churn analysis, and wallet risk scoring.
            </motion.p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                'Python',
                'TensorFlow & PyTorch',
                'Java',
                'SQL & NoSQL',
                'Docker & Kubernetes',
                'Data Visualization',
                'Machine Learning',
                'Deep Learning'
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  className={`flex items-center space-x-2 p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-blue-50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  // Skills Section
  const SkillsSection = () => {
    const skillCategories = [
      {
        title: 'Programming',
        icon: <Code size={24} />,
        skills: [
          { name: 'Python', level: 95 },
          { name: 'Java', level: 80 },
          { name: 'HTML-CSS', level: 80 },
          { name: 'SQL', level: 90 }
        ]
      },
      {
        title: 'ML/DL Frameworks',
        icon: <Brain size={24} />,
        skills: [
          { name: 'TensorFlow', level: 90 },
          { name: 'PyTorch', level: 85 },
          { name: 'Scikit-learn', level: 95 },
          { name: 'Keras', level: 88 }
        ]
      },
      {
        title: 'Data Tools',
        icon: <Database size={24} />,
        skills: [
          { name: 'Pandas', level: 95 },
          { name: 'NumPy', level: 90 },
          { name: 'Matplotlib', level: 80 },
          { name: 'Power BI', level: 78 }
        ]
      },
      {
        title: 'Core Skills',
        icon: <Cpu size={24} />,
        skills: [
          { name: 'DSA', level: 88 },
          { name: 'OOPS', level: 95 },
        ]
      }
    ];

    return (
      <section
        ref={skillsRef}
        id="skills"
        className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className={`text-4xl font-bold text-center mb-16 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className={`p-6 rounded-xl ${
                  darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                } shadow-lg`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: darkMode 
                    ? "0 20px 40px rgba(59, 130, 246, 0.1)"
                    : "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-blue-600' : 'bg-blue-500'
                  } text-white`}>
                    {category.icon}
                  </div>
                  <h3 className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {skill.name}
                        </span>
                        <span className={`text-sm font-medium ${
                          darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className={`h-2 rounded-full ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 1.5, 
                            delay: categoryIndex * 0.1 + skillIndex * 0.1 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <SkillsRadar />
          </div>
        </div>
      </section>
    );
  };

// Projects Section
  const ProjectsSection = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [visibleProjects, setVisibleProjects] = useState(6);
    
    const projects = [
      {
        title: 'Portfolio Website',
        description: 'Personal portfolio showcasing projects and skills built with React, Framer Motion, and Tailwind CSS.',
        tech: ['React', 'Framer Motion', 'Tailwind CSS', 'Vercel'],
        category: 'Frontend',
        image: '🌐',
        github: 'https://github.com/rajputshivamsingh510/Wallet-Risk-Analyzer',
      },
      {
        title: 'PDF Content Analysis & Q-Gen',
        description: 'Analyzes PDFs and auto-generates questions via NLP.',
        tech: ['Python', 'NLP', 'question-generation'],
        category: 'AI/ML',
        image: '📑',
        github: 'https://github.com/rajputshivamsingh510/PDF-Content-Analysis-and-Question-Generation',
      },
      {
        title: 'Credit Score Analysis',
        description: 'Performs credit scoring on financial data with exploratory data analysis.',
        tech: ['Python', 'EDA', 'scikit-learn'],
        category: 'Data Science',
        image: '💳',
        github: 'https://github.com/rajputshivamsingh510/Credit_Score_Analysis',
      },
      {
        title: 'E-commerce Demo',
        description: 'HTML based e-commerce front-end showcasing product listings & layout.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        category: 'Frontend',
        image: '🛒',
        github: 'https://github.com/rajputshivamsingh510/e-commerce-',
      },
      {
        title: 'Flickyfy',
        description: 'JavaScript mini-project creating fun Flicky animations.',
        tech: ['JavaScript'],
        category: 'Frontend',
        image: '🎨',
        github: 'https://github.com/rajputshivamsingh510/Flickyfy',
      },
      {
        title: 'Cruptocreek',
        description: 'Interactive cryptocurrency UI built with HTML and JS.',
        tech: ['HTML', 'JavaScript'],
        category: 'Frontend',
        image: '💲',
        github: 'https://github.com/rajputshivamsingh510/Cruptocreek',
      },
      {
        title: 'Stock Prediction Model',
        description: 'Forecasts stock prices using machine learning algorithms.',
        tech: ['Python', 'ML', 'Time Series'],
        category: 'AI/ML',
        image: '📈',
        github: 'https://github.com/rajputshivamsingh510/Stock-prediction-ML-model',
      },
      {
        title: 'Twitter Sentiment Analysis',
        description: 'Classifies tweet sentiment using TF-IDF and ML models, deployed via Streamlit.',
        tech: ['Python', 'NLP', 'scikit-learn', 'Streamlit'],
        category: 'AI/ML',
        image: '🐦',
        github: 'https://github.com/rajputshivamsingh510/Twitter-Sentiment-Analysis',
      },
      {
        title: 'Weather Forecasting (LSTM)',
        description: 'Spatio-temporal LSTM deep learning model for weather forecasting.',
        tech: ['Python', 'TensorFlow', 'LSTM', 'Time Series'],
        category: 'AI/ML',
        image: '☁️',
        github: 'https://github.com/rajputshivamsingh510/Weather-Forcasting-using-Spatio-Temporal',
      },
      {
        title: 'Smart Traffic Management',
        description: 'Computer vision solution using U-Net3 for traffic analysis and management.',
        tech: ['Python', 'U-Net', 'Segmentation', 'CV'],
        category: 'AI/ML',
        image: '🚦',
        github: 'https://github.com/rajputshivamsingh510/Smart-traffic-management-system-using-Unet3-',
      },
      {
        title: 'YouTube Transcript Extractor',
        description: 'Automated extraction of YouTube video transcripts to Excel using Selenium.',
        tech: ['Python', 'Selenium', 'pandas'],
        category: 'Automation',
        image: '📄',
        github: 'https://github.com/rajputshivamsingh510/YouTube-Transcript-Extraction-Tool',
      },
      {
        title: 'LinkedIn Outreach Automation',
        description: 'Automates LinkedIn profile messaging workflow.',
        tech: ['Python', 'Automation', 'Selenium'],
        category: 'Automation',
        image: '🔗',
        github: 'https://github.com/rajputshivamsingh510/LinkedIn-Profile-Outreach-Automation',
      },
      {
        title: 'House Price Prediction',
        description: 'Predicts real estate prices via regression with data cleaning and model evaluation.',
        tech: ['Python', 'Regression', 'pandas', 'scikit-learn'],
        category: 'Data Science',
        image: '🏠',
        github: 'https://github.com/rajputshivamsingh510/House-Price-Prediction',
      },
      {
        title: 'Student Marks Predictor',
        description: 'Predicts student exam scores based on study hours using regression techniques.',
        tech: ['Python', 'Regression', 'KNN', 'scikit-learn'],
        category: 'Data Science',
        image: '📚',
        github: 'https://github.com/rajputshivamsingh510/Student-Marks-Predictor',
      },
      {
        title: 'Cross-Camera Player Mapping',
        description: 'Mapped player movements across multiple camera feeds (multi-view tracking).',
        tech: ['Python', 'CV', 'Tracking'],
        category: 'AI/ML',
        image: '🎥',
        github: 'https://github.com/rajputshivamsingh510/Cross_Camera_Player_Mapping',
      },
      {
        title: 'Wallet Risk Analyzer',
        description: 'Scores Ethereum wallets by DeFi risk using clustering and ML models based on Moralis data.',
        tech: ['Python', 'ML', 'Clustering', 'Random Forest', 'Moralis API'],
        category: 'AI/ML',
        image: '💳',
        github: 'https://github.com/rajputshivamsingh510/Wallet-Risk-Analyzer'
      }    
    ];

    const categories = ['All', 'AI/ML', 'Data Science', 'Frontend', 'Automation'];
    const filteredProjects = activeFilter === 'All' 
      ? projects 
      : projects.filter(project => project.category === activeFilter);

    return (
      <section
        ref={projectsRef}
        id="projects"
        className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className={`text-4xl font-bold text-center mb-16 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => {
                  setActiveFilter(category);
                  setVisibleProjects(6);
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProjects.slice(0, visibleProjects).map((project, index) => (
              <motion.div
                key={project.title}
                className={`group relative rounded-xl ${
                  darkMode
                    ? 'bg-gray-900 border border-gray-700'
                    : 'bg-white border border-gray-200'
                } shadow-lg overflow-hidden h-80`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                {/* Project Icon/Image */}
                <div className={`h-32 flex items-center justify-center ${
                  darkMode
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600'
                    : 'bg-gradient-to-br from-blue-500 to-purple-500'
                }`}>
                  <div className="text-4xl">{project.image}</div>
                </div>

                {/* Project Content */}
                <div className="p-4 h-48 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-bold text-lg mb-2 line-clamp-1 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {project.title}
                    </h3>

                    <p className={`text-sm mb-3 line-clamp-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className={`px-2 py-1 text-xs rounded-full ${
                            darkMode
                              ? 'bg-blue-600/20 text-blue-400'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                        }`}>
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center space-x-2 py-2 rounded-lg transition-all duration-300 ${
                      darkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } group-hover:bg-blue-600 group-hover:text-white`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github size={16} />
                    <span className="text-sm">View Code</span>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleProjects < filteredProjects.length && (
            <div className="text-center">
              <motion.button
                onClick={() => setVisibleProjects(prev => prev + 6)}
                className={`px-8 py-3 rounded-lg font-medium ${
                  darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Projects ({filteredProjects.length - visibleProjects} remaining)
              </motion.button>
            </div>
          )}
        </div>
      </section>
    );
  };
  // Experience Section
  const ExperienceSection = () => {
    const experiences = [
      {
        title: 'AI/ML Developer Intern',
        company: 'Scoreazy (Remote)',
        period: '2025',
        description: 'Built automation tools like LinkedIn Profile Outreach and YouTube Transcript Extractor using Python and Selenium.',
        icon: '🤖'
      },
      {
        title: 'Data Science Intern',
        company: 'SmartBank (Lloyds Banking Group)',
        period: '2025',
        description: 'Worked on customer churn prediction: data collection, EDA, preprocessing, and predictive modeling using ML.',
        icon: '📊'
      },
      {
        title: 'Python & ML Projects',
        company: 'Self-initiated Projects',
        period: '2024 - 2025',
        description: 'Developed multiple AI/ML projects including Wallet Risk Scoring, Stock Price Prediction, and PDF Content Analysis using Python, ML, LSTM, Transformers, and Deep Learning.',
        icon: '💻'
      }
    ];

    return (
      <section
        ref={experienceRef}
        id="experience"
        className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className={`text-4xl font-bold text-center mb-16 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Experience
          </motion.h2>

          <div className="relative">
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${
                darkMode ? 'bg-blue-600' : 'bg-blue-500'
              }`}
            />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                } mb-12`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <motion.div
                    className={`p-6 rounded-xl ${
                      darkMode
                        ? 'bg-gray-800 border border-gray-700'
                        : 'bg-white border border-gray-200'
                    } shadow-lg`}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="text-2xl">{exp.icon}</div>
                      <div>
                        <h3
                          className={`font-bold ${
                            darkMode ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {exp.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            darkMode ? 'text-blue-400' : 'text-blue-600'
                          }`}
                        >
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <Calendar
                        size={16}
                        className={darkMode ? 'text-gray-400' : 'text-gray-500'}
                      />
                      <span
                        className={`text-sm ${
                          darkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {exp.period}
                      </span>
                    </div>

                    <p
                      className={`text-sm ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {exp.description}
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${
                    darkMode ? 'bg-blue-600' : 'bg-blue-500'
                  } border-4 ${
                    darkMode ? 'border-gray-900' : 'border-gray-50'
                  }`}
                  whileHover={{ scale: 1.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

// Certificates Section
 // Enhanced certificate handling with path verification
const CertificatesSection = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeTab, setActiveTab] = useState('Programming & Development');
  const [certErrors, setCertErrors] = useState(new Set());
  
const certificateData = { 
  
  'Programming & Development': [ 
    { title: 'Programming in Python', year: '2025', file: 'https://drive.google.com/file/d/1sdGupfaClD0BLwKzxJ8tYrIrag1QIxkY/preview', icon: '🐍' }, 
    { title: 'Java as a Second Language', year: '2025', file: 'https://drive.google.com/file/d/1eWx4ZFrpRyaS1wEqOmHOtjxGV9egl_Dr/preview', icon: '☕' }, 
    { title: 'CSS', year: '2025', file:  'https://drive.google.com/file/d/1Jm9-f6iOv9eRP_xHO8WPKl7hERxOii3o/preview', icon: '🎨' }, 
    { title: 'React JS', year: '2025', file: 'https://drive.google.com/file/d/10dbIKH-BX1XoJpVBlnY5GbNBK0vHyGt4/preview', icon: '⚛️' }, 
    { title: 'DSA', year: '2025', file: 'https://drive.google.com/file/d/1oZTSvOnwh9EuPMHGZiBFd_yyWLTBxbrS/preview', icon: '🧮' }, ],
    
    'Data Science & AI': [
      // Keep the certificate subdirectory for these files
      { title: 'IBM Data Science', year: '2025', file: 'https://drive.google.com/file/d/19tQytxT-y38bqb_xXMjjRI5rwDSMyYgm/preview', icon: '📊' },
      { title: 'Data Analysis with Python', year: '2025', file: 'https://drive.google.com/file/d/1mktcdUnQBbAXYWjf2k4pbDV8eKpSrTVT/preview', icon: '🔍' },
      { title: 'Machine Learning with Python', year: '2025', file: 'https://drive.google.com/file/d/1J0zJiknKpZ1BQyF_9Tqy3nwfMcVM1fRL/preview', icon: '🤖' },
      { title: 'Data Science Methodology', year: '2025', file: 'https://drive.google.com/file/d/1Gxj-FyaAat_fOwzG8nuXVdrP4cr_zi_A/preview', icon: '📈' },
      { title: 'Data Visualization with Python', year: '2025', file: 'https://drive.google.com/file/d/1VOqE4BtC8eh9awU2Gh6uxeseK1i0Itdb/preview', icon: '📉' },
      { title: 'Databases and SQL for Data Science', year: '2025', file: 'https://drive.google.com/file/d/1Xu1hWcLBN_URHgkfcTkoVRendG2d_6kF/preview', icon: '🗄️' },
      { title: 'Python for Data Science & AI', year: '2025', file: 'https://drive.google.com/file/d/1kzxj0M1BwKOiBcJMNT5xIg-k8ewTqmL-/preview', icon: '🧠' },
      { title: 'Python Project for Data Science', year: '2025', file: 'https://drive.google.com/file/d/1DOioz8mecXGaND2BpXfW8S4Si1LC0ph4/preview', icon: '💼' },
    ],

    'Power BI & Analytics': [
      { title: 'Microsoft Power BI Data Analyst', year: '2025', file: 'https://drive.google.com/file/d/132qZsUb3JiwiXv6KXuvrqb4tJsTApHrv/preview', icon: '📊' },
      { title: 'Data Analysis with Power BI', year: '2025', file: 'https://drive.google.com/file/d/1lRRD3vlOjhriDyy-HXMsm4F1mY5UGjpF/preview', icon: '📈' },
      { title: 'Data Modeling in Power BI', year: '2025', file: 'https://drive.google.com/file/d/1j_yjh6eKW7wbjo4N1x4Xo3HTzdq3YIzY/preview', icon: '🏗️' },
      { title: 'Creative Design in Power BI', year: '2025', file: 'https://drive.google.com/file/d/1HJp9W4G8JTLL3tBmOIDFBFDWMAtzlMzw/preview', icon: '🎨' },
      { title: 'ETL Data in Power BI', year: '2025', file: 'https://drive.google.com/file/d/1GX6FYvIprNfmczKMZurOu0lTrQdlgv8h/preview, icon: '⚙️' },
      { title: 'Preparing Data with Excel', year: '2025', file: 'https://drive.google.com/file/d/18M9mlne1kefVpGNN4GZownZbDTO5Nv-u/preview', icon: '📋' },
    ],

    'Cybersecurity & Career': [
      { title: 'Automate Cybersecurity Tasks', year: '2025', file: 'https://drive.google.com/file/d/1OqkhaQrq01O4YKcsxsbaDx2_zrHkO8QC/preview', icon: '🔐' },
      { title: 'BCG Virtual Data Science Internship', year: '2025', file: 'https://drive.google.com/file/d/1Mm6Qh031MTF_X0l8paPGEdizFCevM-Zw/preview', icon: '💼' },
      { title: 'Lloyds Banking Internship', year: '2025', file: 'https://drive.google.com/file/d/1ll2BQVYbu7juJswatnttpczIP4dIVJdY/preview', icon: '🏦' },
      // These also use the certificate subdirectory

      { title: 'Generative AI for Data Science', year: '2025', file: 'https://drive.google.com/file/d/1hz_3dfYZ8GnInDqdpiY7O2xlZoKqCCBl/preview', icon: '🤖' },
      { title: 'Generative AI for Data Analytics', year: '2025', file: 'https://drive.google.com/file/d/1uEXC1Jt24oHk83SmFsTlUDwWsopT1vZ3/preview', icon: '✨' },
    ]
  };

  // Function to verify certificate exists before opening
  const handleCertificateClick = async (certFile) => {
    try {
      const response = await fetch(certFile, { method: 'HEAD' });
      if (response.ok) {
        setSelectedCert(certFile);
      } else {
        setCertErrors(prev => new Set([...prev, certFile]));
        alert(`Certificate not found: ${certFile.split('/').pop()}\nPlease check if the file exists in the correct location.`);
      }
    } catch (error) {
      setCertErrors(prev => new Set([...prev, certFile]));
      alert(`Error loading certificate: ${certFile.split('/').pop()}`);
    }
  };

  return (
    <section ref={certificatesRef} className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} id="certificates">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className={`text-4xl font-bold text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Certifications & Achievements
        </motion.h2>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {Object.keys(certificateData).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Certificates Grid */}
        <motion.div
          key={activeTab}
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {certificateData[activeTab].map((cert, index) => (
            <motion.div
              key={cert.title}
              className={`group cursor-pointer p-6 rounded-xl ${
                darkMode
                  ? 'bg-gray-900 border border-gray-700 hover:border-blue-500'
                  : 'bg-white border border-gray-200 hover:border-blue-400'
              } shadow-lg transition-all duration-300 h-48 flex flex-col justify-between`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: darkMode
                  ? '0 20px 40px rgba(59, 130, 246, 0.2)'
                  : '0 20px 40px rgba(0, 0, 0, 0.1)',
              }}
              onClick={() => setSelectedCert(cert.file)}
            >
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {cert.icon}
                </div>
                <h4 className={`font-bold text-sm mb-2 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {cert.title}
                </h4>
              </div>
              <div className="text-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                  {cert.year}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certificate Count Display */}
        <div className="text-center mt-8">
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className="font-bold text-blue-500">{certificateData[activeTab].length}</span> certificates in {activeTab}
          </p>
        </div>

        {/* Certificate Modal */}
        {selectedCert && (
          <Modal onClose={() => setSelectedCert(null)}>
            <div className="relative">
              <iframe src={selectedCert} className="w-full h-[80vh] rounded-lg" title="Certificate Viewer" />
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg text-sm">
                Certificate Preview
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};

  // Contact Section
  const ContactSection = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('https://portfolio-backend-jxnj.onrender.com/send-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        } else {
          alert('Failed to send message. Please try again.');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        alert('An error occurred. Please try again.');
      }
    };
  
    return (
      <section
        ref={contactRef}
        id="contact"
        className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className={`text-4xl font-bold text-center mb-16 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
  
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Let's collaborate on your next AI project
                </h3>
                <p className={`text-lg ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  I'm always excited to work on challenging AI/ML problems and help bring innovative ideas to life.
                </p>
              </div>
  
              <div className="space-y-4">
                {[
                  { icon: <Mail size={20} />, text: 'rajputshivamsingh510@gmail.com' },
                  { icon: <MapPin size={20} />, text: 'Punjab, IND' },
                  { icon: <Linkedin size={20} />, text: 'in/shivam-singh-243000232/' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    whileHover={{ x: 10 }}
                  >
                    <div className={`p-2 rounded-lg ${
                      darkMode ? 'bg-blue-600' : 'bg-blue-500'
                    } text-white`}>
                      {item.icon}
                    </div>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
  
              <div className="flex space-x-4">
                {[
                  { icon: <Github size={24} />, href: 'https://github.com/rajputshivamsingh510' },
                  { icon: <Linkedin size={24} />, href: 'https://www.linkedin.com/in/shivam-singh-243000232/' },
                  { icon: <Mail size={24} />, href: 'mailto:rajputshivamsingh510@gmail.com' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`p-3 rounded-lg ${
                      darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                    } hover:scale-110 transition-transform`}
                    whileHover={{ y: -5 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
  
            <motion.form
              onSubmit={handleSubmit}
              className={`space-y-6 p-8 rounded-xl ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
              } shadow-lg`}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Name
                </label>
                <motion.input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  whileFocus={{ scale: 1.02 }}
                  placeholder="Your name"
                  required
                />
              </div>
  
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email
                </label>
                <motion.input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  whileFocus={{ scale: 1.02 }}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
  
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Message
                </label>
                <motion.textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
                  whileFocus={{ scale: 1.02 }}
                  placeholder="Tell me about your project or idea..."
                  required
                />
              </div>
  
              <motion.button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={20} />
                <span>Send Message</span>
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>
    );
  };

  // Footer
  const Footer = () => (
    <footer className={`py-8 ${darkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 Shivam Singh. All rights reserved.
          </p>
          
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`mt-4 md:mt-0 p-3 rounded-full ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );

  // Scroll Progress Bar
  const ScrollProgress = () => (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );

  return (
    <div className={`${darkMode ? 'dark' : ''} transition-colors duration-300`}>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>
      
      {!loading && (
        <>
          <ScrollProgress />
          <Navigation />
          
          <main className={darkMode ? 'bg-gray-900' : 'bg-white'}>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <CertificatesSection />
            <ContactSection />
          </main>
          
          <Footer />

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className={`fixed inset-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                  {['Hero', 'About', 'Skills', 'Projects', 'Experience', 'Certificates', 'Contact'].map((item, index) => (
                    <motion.a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className={`text-2xl font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};
export default Portfolio;
