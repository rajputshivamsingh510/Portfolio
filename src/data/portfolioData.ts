export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  bullets: string[];
  tech: string[];
}

export interface ProjectItem {
  title: string;
  category: string;
  description: string;
  impact: string;
  tech: string[];
  github: string;
  demo?: string;
  featured?: boolean;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  pdfFileName: string;
  category: 'AI/ML' | 'Data Science' | 'Power BI' | 'Python/SQL';
  date: string;
  skills: string[];
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  categoryKey: 'languages' | 'frameworks' | 'datascience' | 'engineering';
  skills: SkillItem[];
}

/* =========================================================================
   1. WORK EXPERIENCES & TRAINEESHIPS
   (Add, edit, or remove roles here - the frontend updates automatically!)
   ========================================================================= */
export const experiences: ExperienceItem[] = [
  {
    company: 'Kreativan',
    role: 'AI / ML Engineer',
    period: '2025 — 2026',
    location: 'India',
    type: 'Full-Time',
    description: 'Developed AI/ML solutions and backend services, integrating machine learning models with REST APIs and production-ready application workflows.',
    bullets: [
      'Developed and integrated Machine Learning models for real-world prediction and classification workflows.',
      'Built RESTful APIs using FastAPI to serve ML models and handle data processing and inference requests.',
      'Implemented data preprocessing, feature engineering, model evaluation, and validation workflows using Python and Scikit-Learn.',
      'Worked with AI/ML and Generative AI concepts to improve application functionality and automate data-driven processes.'
    ],
    tech: ['Python', 'FastAPI', 'Scikit-Learn', 'Machine Learning', 'Generative AI', 'REST API']
  },
  {
    company: 'Wabric',
    role: 'AI / ML Trainee',
    period: '2025 — Present',
    location: 'Remote',
    type: 'Traineeship',
    description: 'Developing end-to-end Machine Learning pipelines, backend REST API integrations, and feature extraction architectures for production deployment.',
    bullets: [
      'Engineered automated data preprocessing pipelines handling unstructured text & numerical vectors.',
      'Constructed RESTful API endpoints for serving ML model predictions with low latency.',
      'Collaborated on cross-functional model optimization, hyperparameter tuning, and cross-validation.'
    ],
    tech: ['Python', 'FastAPI', 'Scikit-Learn', 'PyTorch', 'Docker']
  },
  {
    company: 'Lloyds Banking Group',
    role: 'Data Science Virtual Intern',
    period: '2025',
    location: 'Remote',
    type: 'Virtual Internship',
    description: 'Conducted exploratory data analysis (EDA) and predictive modeling to analyze customer behavior and churn vectors for financial operations.',
    bullets: [
      'Built machine learning classification models to predict financial risk and customer attrition.',
      'Created clear diagnostic visual dashboards summarizing feature importance and model metrics.',
      'Formulated actionable recommendations for data-driven strategic planning.'
    ],
    tech: ['Python', 'Pandas', 'Matplotlib', 'Customer Analytics', 'Machine Learning']
  }
];

/* =========================================================================
   2. PORTFOLIO PROJECTS
   (Add or edit projects here - auto-updates showcase & skills!)
   ========================================================================= */
export const projectsList: ProjectItem[] = [
  {
    title: 'Smart Spreadsheet Automation Agent',
    category: 'AI Agents',
    description:
      'Tool-using AI agent that converts natural-language spreadsheet requests into automated workflows and generates structured spreadsheet outputs.',
    impact:
      'Built an agentic workflow with LangGraph, FastAPI, MCP, real-time SSE streaming, spreadsheet generation, Google Sheets integration, Docker, and automated testing.',
    tech: [
      'Python',
      'LangGraph',
      'LangChain',
      'Groq',
      'FastAPI',
      'MCP',
      'Google Sheets API',
      'OpenPyXL',
      'Docker',
      'Pytest'
    ],
    github:
      'https://github.com/rajputshivamsingh510/smart-spreadsheet-automation-agent',
    demo: '#ai-lab',
    featured: true
  },
  {
    title: 'Multi-Agent AI Research System',
    category: 'AI Agents',
    description:
      'Multi-agent research system that coordinates specialized AI agents to search, analyze, synthesize, and critique information before producing a structured research output.',
    impact:
      'Demonstrates agent orchestration, tool usage, research automation, multi-step reasoning, and structured AI report generation.',
    tech: [
      'Python',
      'LangGraph',
      'LangChain',
      'LLMs',
      'AI Agents',
      'Web Search'
    ],
    github:
      'https://github.com/rajputshivamsingh510/-Multi-Agent-AI-Research-System',
    featured: true
  },
  {
    title: 'AI Video Assistant',
    category: 'Generative AI',
    description:
      'AI-powered video assistant designed to process video content and allow users to interact with and extract useful information from video through natural-language queries.',
    impact:
      'Combines multimodal AI processing, video analysis, and conversational interaction into a practical AI assistant.',
    tech: [
      'Python',
      'Generative AI',
      'LLMs',
      'Computer Vision',
      'Video Processing'
    ],
    github:
      'https://github.com/rajputshivamsingh510/AI-video-assistant-',
    featured: true
  },
  {
    title: 'DocMind',
    category: 'RAG/NLP',
    description:
      'AI document intelligence application that enables users to interact with documents and retrieve relevant information using natural-language queries.',
    impact:
      'Demonstrates document processing, semantic retrieval, RAG concepts, and LLM-powered question answering over user-provided knowledge.',
    tech: [
      'Python',
      'LLMs',
      'RAG',
      'NLP',
      'Document Processing'
    ],
    github:
      'https://github.com/rajputshivamsingh510/Docmind',
    featured: true
  },
  {
    title: 'LangGraph AI Content Pipeline',
    category: 'AI Agents',
    description:
      'Graph-based AI content generation pipeline that processes content through multiple structured LLM-powered stages.',
    impact:
      'Implemented modular multi-step AI workflows with LangGraph, demonstrating agent orchestration and controllable content-processing pipelines.',
    tech: [
      'Python',
      'LangGraph',
      'LangChain',
      'LLMs',
      'Agentic AI'
    ],
    github:
      'https://github.com/rajputshivamsingh510/langgraph-ai-content-pipeline',
    featured: true
  },
  {
    title: 'AI Content Safety Analyzer',
    category: 'Generative AI',
    description:
      'AI-powered content analysis system that evaluates text and identifies potentially unsafe or policy-sensitive content.',
    impact:
      'Demonstrates practical LLM-based content analysis, automated safety evaluation, and responsible AI implementation.',
    tech: [
      'Python',
      'LLMs',
      'Generative AI',
      'NLP',
      'Content Moderation'
    ],
    github:
      'https://github.com/rajputshivamsingh510/ai-content-safety-analyzer',
    featured: false
  },
  {
    title: 'Ethereum Wallet Risk Analyzer',
    category: 'ML/DL',
    description:
      'Machine learning system for analyzing Ethereum wallet transactions and identifying suspicious behavioral patterns from on-chain transaction data.',
    impact:
      'Built an end-to-end risk analysis pipeline using transaction feature engineering and ensemble machine learning for wallet behavior classification.',
    tech: [
      'Python',
      'Scikit-Learn',
      'Pandas',
      'RandomForest',
      'XGBoost',
      'Moralis API'
    ],
    github:
      'https://github.com/rajputshivamsingh510/Wallet-Risk-Analyzer',
    demo: '#ai-lab',
    featured: true
  },
  {
    title: 'Groovify — NLP Song Recommender',
    category: 'NLP',
    description:
      'NLP-powered music recommendation application that analyzes the emotional tone of user input and recommends songs based on detected mood.',
    impact:
      'Combined natural language processing, emotion analysis, and music metadata to create a personalized recommendation experience.',
    tech: [
      'Python',
      'NLP',
      'NLTK',
      'Flask',
      'IBM Tone Analyzer',
      'Last.fm API'
    ],
    github:
      'https://github.com/rajputshivamsingh510/Groovify',
    demo: '#ai-lab',
    featured: false
  },
  {
    title: 'Automated PDF Question Generator',
    category: 'NLP/GenAI',
    description:
      'NLP application that extracts meaningful information from PDF documents and automatically generates questions for learning and assessment.',
    impact:
      'Automated the transformation of educational documents into structured question sets using NLP and transformer-based language processing.',
    tech: [
      'Python',
      'spaCy',
      'Transformers',
      'Streamlit',
      'NLP'
    ],
    github:
      'https://github.com/rajputshivamsingh510',
    featured: false
  },
  {
    title: 'Smart Traffic Vision System',
    category: 'Computer Vision',
    description:
      'Computer vision pipeline for analyzing traffic footage and estimating vehicle presence and congestion levels from road scenes.',
    impact:
      'Applied deep learning-based image segmentation and OpenCV processing to analyze traffic video data.',
    tech: [
      'Python',
      'PyTorch',
      'U-Net',
      'OpenCV',
      'Computer Vision',
      'Matplotlib'
    ],
    github:
      'https://github.com/rajputshivamsingh510',
    featured: false
  },
  {
    title: 'Spatio-Temporal Weather LSTM',
    category: 'ML/DL',
    description:
      'Deep learning forecasting project using historical meteorological data to model temporal weather patterns and predict future conditions.',
    impact:
      'Implemented sequence-based forecasting with LSTM networks and evaluated model performance against traditional time-series approaches.',
    tech: [
      'Python',
      'TensorFlow',
      'Keras',
      'LSTM',
      'NumPy',
      'Pandas'
    ],
    github:
      'https://github.com/rajputshivamsingh510',
    featured: false
  },
  {
    title: 'FitMentor AI',
    category: 'AI Application',
    description:
      'AI-powered fitness assistant designed to provide interactive guidance and personalized recommendations through natural-language interaction.',
    impact:
      'Demonstrates the application of conversational AI to build a practical domain-specific intelligent assistant.',
    tech: [
      'Python',
      'Generative AI',
      'LLM',
      'NLP'
    ],
    github:
      'https://github.com/rajputshivamsingh510/fitmentor-ai',
    featured: false
  },
  {
    title: 'City Agent',
    category: 'AI Agents',
    description:
      'AI agent application that assists users with city-related information and recommendations through natural-language interaction.',
    impact:
      'Demonstrates agent-based reasoning and tool-oriented workflows for practical city information and recommendations.',
    tech: [
      'Python',
      'LLM',
      'AI Agents',
      'NLP'
    ],
    github:
      'https://github.com/rajputshivamsingh510/city-agent',
    featured: false
  },
  {
    title: 'Power BI Executive Sales Dashboard',
    category: 'Analytics',
    description:
      'Interactive business intelligence dashboard for analyzing sales performance, regional revenue, profitability, and key business KPIs.',
    impact:
      'Transforms raw business data into decision-ready visual reports using data modeling, DAX calculations, and interactive Power BI reporting.',
    tech: [
      'Power BI',
      'DAX',
      'SQL',
      'Data Modeling'
    ],
    github:
      'https://github.com/rajputshivamsingh510',
    featured: false
  },
  {
    title: 'English–Hindi Translator',
    category: 'NLP',
    description:
      'Natural language processing application for translating text between English and Hindi.',
    impact:
      'Demonstrates practical NLP preprocessing, language representation, and machine-learning-based translation workflows.',
    tech: [
      'Python',
      'NLP',
      'Machine Learning',
      'Translation'
    ],
    github:
      'https://github.com/rajputshivamsingh510/English-Hindi-Translator',
    featured: false
  },
  {
    title: 'Dog vs Cat Classifier',
    category: 'Computer Vision',
    description:
      'Deep learning image classification project that identifies whether an input image contains a dog or a cat.',
    impact:
      'Demonstrates CNN-based image classification, model training, image preprocessing, and evaluation.',
    tech: [
      'Python',
      'TensorFlow',
      'Keras',
      'CNN',
      'Computer Vision'
    ],
    github:
      'https://github.com/rajputshivamsingh510/dog-vs-cat-classifier',
    featured: false
  }
];

/* =========================================================================
   3. BASE SKILLS & DYNAMIC CATEGORIZATION ENGINE
   (Automatically incorporates all skills from Experiences and Projects!)
   ========================================================================= */
const baseSkillCategories: SkillCategory[] = [
  {
    title: 'Languages & Core CS',
    categoryKey: 'languages',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'SQL (PostgreSQL / MySQL)', level: 92 },
      { name: 'Data Structures & Algorithms', level: 88 },
      { name: 'TypeScript & JavaScript', level: 85 },
      { name: 'Java & OOP Principles', level: 80 }
    ]
  },
  {
    title: 'AI & Agentic Frameworks',
    categoryKey: 'frameworks',
    skills: [
      { name: 'Scikit-Learn & ML Ensembles', level: 95 },
      { name: 'PyTorch & Deep Learning', level: 90 },
      { name: 'LangGraph & Multi-Agent Systems', level: 92 },
      { name: 'LLMs, Prompt Eng & RAG', level: 90 },
      { name: 'Computer Vision & OpenCV', level: 86 }
    ]
  },
  {
    title: 'Data Science & BI',
    categoryKey: 'datascience',
    skills: [
      { name: 'Pandas & NumPy', level: 95 },
      { name: 'Microsoft Power BI & DAX', level: 92 },
      { name: 'Exploratory Data Analysis (EDA)', level: 94 },
      { name: 'Statistical Modeling & Time-Series', level: 88 },
      { name: 'Data Modeling & Pipelines', level: 90 }
    ]
  },
  {
    title: 'Engineering & Deployment',
    categoryKey: 'engineering',
    skills: [
      { name: 'FastAPI & REST Microservices', level: 92 },
      { name: 'Docker & Containerization', level: 88 },
      { name: 'MCP & Tool Integration Protocols', level: 90 },
      { name: 'Pytest & Automated Testing', level: 86 },
      { name: 'Git & Production CI/CD', level: 88 }
    ]
  }
];

export interface TechGroup {
  name: string;
  skills: string[];
}

export const techEcosystemGroups: TechGroup[] = [
  {
    name: 'Agentic AI & LLMs',
    skills: [
      'LangGraph',
      'LangChain',
      'Groq',
      'LLMs',
      'AI Agents',
      'RAG',
      'Agentic AI',
      'MCP',
      'Content Moderation',
      'Document Processing'
    ]
  },
  {
    name: 'ML, Deep Learning & CV',
    skills: [
      'PyTorch',
      'TensorFlow',
      'Keras',
      'Scikit-Learn',
      'Computer Vision',
      'OpenCV',
      'U-Net',
      'CNN',
      'LSTM',
      'RandomForest',
      'XGBoost',
      'Transformers',
      'spaCy',
      'NLTK'
    ]
  },
  {
    name: 'Data Science & BI',
    skills: [
      'Microsoft Power BI',
      'DAX',
      'SQL',
      'Pandas',
      'NumPy',
      'Data Modeling',
      'Customer Analytics',
      'Matplotlib',
      'Exploratory Data Analysis'
    ]
  },
  {
    name: 'Backend & Engineering',
    skills: [
      'Python',
      'FastAPI',
      'Docker',
      'Pytest',
      'REST API',
      'Google Sheets API',
      'OpenPyXL',
      'Streamlit',
      'Flask',
      'Moralis Web3 API'
    ]
  }
];

/**
 * Categorize any newly discovered skill tag automatically
 */
function categorizeSkill(skill: string): 'languages' | 'frameworks' | 'datascience' | 'engineering' {
  const s = skill.toLowerCase();
  if (s.includes('python') || s.includes('sql') || s.includes('java') || s.includes('c++') || s.includes('html') || s.includes('css') || s.includes('js')) {
    return 'languages';
  }
  if (
    s.includes('ml') || s.includes('machine learning') || s.includes('dl') || s.includes('deep learning') ||
    s.includes('scikit') || s.includes('pytorch') || s.includes('tensorflow') || s.includes('keras') ||
    s.includes('generative') || s.includes('gen ai') || s.includes('nlp') || s.includes('cv') ||
    s.includes('u-net') || s.includes('randomforest') || s.includes('xgboost') || s.includes('lstm') ||
    s.includes('transformers') || s.includes('spacy') || s.includes('nltk') || s.includes('langgraph') ||
    s.includes('langchain') || s.includes('llm') || s.includes('agent') || s.includes('rag') ||
    s.includes('groq') || s.includes('vision') || s.includes('cnn')
  ) {
    return 'frameworks';
  }
  if (
    s.includes('data') || s.includes('pandas') || s.includes('numpy') || s.includes('power bi') ||
    s.includes('dax') || s.includes('eda') || s.includes('analytics') || s.includes('matplotlib') ||
    s.includes('seaborn') || s.includes('tableau') || s.includes('sql')
  ) {
    return 'datascience';
  }
  return 'engineering';
}

/**
 * Returns balanced core skill categories with uniform 5 proficiencies per pillar
 */
export function getDynamicSkillCategories(): SkillCategory[] {
  return JSON.parse(JSON.stringify(baseSkillCategories));
}

/**
 * Returns a clean, deduplicated list of every single skill/tech in the portfolio
 */
export function getAllUniqueSkills(): string[] {
  const set = new Set<string>();
  techEcosystemGroups.forEach((group) => group.skills.forEach((s) => set.add(s)));
  experiences.flatMap((e) => e.tech).forEach((t) => set.add(t));
  projectsList.flatMap((p) => p.tech).forEach((t) => set.add(t));
  return Array.from(set);
}

/**
 * Returns top competencies for the About section
 */
export function getDynamicCompetencies(): string[] {
  const latestSkills = [
    ...experiences[0]?.tech || [],
    'Deep Learning (PyTorch)',
    'NLP & Transformers',
    'SQL & Data Engineering',
    'Power BI & Analytics',
    'FastAPI & REST APIs'
  ];
  return Array.from(new Set(latestSkills)).slice(0, 8);
}

/* =========================================================================
   4. VERIFIED CERTIFICATES & CREDENTIALS
   (Exact mapping to verified PDF documents in public/)
   ========================================================================= */
export const certificateList: CertificateItem[] = [
  {
    title: 'IBM Data Science Professional Certificate',
    issuer: 'IBM / Coursera',
    pdfFileName: 'IBM-Data-Science.pdf',
    category: 'Data Science',
    date: '2024',
    skills: ['Python', 'Data Science', 'SQL', 'Predictive Modeling']
  },
  {
    title: 'Microsoft Power BI Data Analyst Professional Certificate',
    issuer: 'Microsoft / Coursera',
    pdfFileName: 'Microsoft-Power-BI-Data-Analyst.pdf',
    category: 'Power BI',
    date: '2025',
    skills: ['Power BI', 'DAX', 'Data Modeling', 'Business Intelligence']
  },
  {
    title: 'Machine Learning with Python',
    issuer: 'IBM',
    pdfFileName: 'Machine-Learning-with-Python.pdf',
    category: 'AI/ML',
    date: '2024',
    skills: ['Supervised Learning', 'Scikit-Learn', 'Classification', 'Regression']
  },
  {
    title: 'Lloyds Banking Data Science Internship',
    issuer: 'Lloyds Banking Group / Forage',
    pdfFileName: 'Lloyds-Intern.pdf',
    category: 'Data Science',
    date: '2025',
    skills: ['Customer Analytics', 'EDA', 'Financial Modeling']
  },
  {
    title: 'Data Modeling in Power BI',
    issuer: 'Microsoft',
    pdfFileName: 'Data-Modeling-in-Power-BI.pdf',
    category: 'Power BI',
    date: '2025',
    skills: ['Star Schema', 'DAX Calculations', 'Data Relationships']
  },
  {
    title: 'Generative AI: Elevate Your Data Science Career',
    issuer: 'IBM / Coursera',
    pdfFileName: 'Generative-AI-Elevate-Your-Data-Science-Career.pdf',
    category: 'AI/ML',
    date: '2025',
    skills: ['Generative AI', 'LLMs', 'Prompt Engineering']
  },
  {
    title: 'Generative AI: Enhance Your Data Analytics Career',
    issuer: 'IBM / Coursera',
    pdfFileName: 'Generative-AI-Enhance-Your-Data-Analytics-Career.pdf',
    category: 'AI/ML',
    date: '2025',
    skills: ['GenAI Analytics', 'Automation', 'AI Workflows']
  },
  {
    title: 'Databases and SQL for Data Science with Python',
    issuer: 'IBM',
    pdfFileName: 'Databases-and-SQL-for-Data-Science-with-Python.pdf',
    category: 'Python/SQL',
    date: '2024',
    skills: ['SQL', 'Relational DBs', 'Python DB-API']
  },
  {
    title: 'Python for Data Science, AI & Development',
    issuer: 'IBM',
    pdfFileName: 'Python-for-Data-Science-AI-and-Development.pdf',
    category: 'Python/SQL',
    date: '2024',
    skills: ['Python', 'Pandas', 'NumPy', 'APIs']
  },
  {
    title: 'Data Analysis with Python',
    issuer: 'IBM',
    pdfFileName: 'Data-Analysis-with-Python.pdf',
    category: 'Data Science',
    date: '2024',
    skills: ['Pandas', 'Scikit-Learn', 'Statistical Analysis']
  },
  {
    title: 'Data Visualization with Python',
    issuer: 'IBM',
    pdfFileName: 'Data-Visualization-with-Python.pdf',
    category: 'Data Science',
    date: '2024',
    skills: ['Matplotlib', 'Seaborn', 'Folium', 'Dashboards']
  },
  {
    title: 'Data Science Methodology',
    issuer: 'IBM',
    pdfFileName: 'Data-Science-Methodology.pdf',
    category: 'Data Science',
    date: '2024',
    skills: ['Problem Formulation', 'Data Requirements', 'Modeling Pipeline']
  },
  {
    title: 'Python Project for Data Science',
    issuer: 'IBM',
    pdfFileName: 'Python-Project-for-Data-Science.pdf',
    category: 'Python/SQL',
    date: '2024',
    skills: ['Web Scraping', 'Financial Data Extraction', 'Dashboarding']
  },
  {
    title: 'Data Analysis and Visualization using Power BI',
    issuer: 'Microsoft',
    pdfFileName: 'Data-Analysis-and-Visualization-using-Power-BI.pdf',
    category: 'Power BI',
    date: '2025',
    skills: ['Power BI Reports', 'Visual Analytics', 'KPI Cards']
  },
  {
    title: 'Creative Design in Power BI',
    issuer: 'Microsoft',
    pdfFileName: 'Creative-Design-in-Power-BI.pdf',
    category: 'Power BI',
    date: '2025',
    skills: ['UI/UX for BI', 'Custom Themes', 'Executive Storytelling']
  },
  {
    title: 'Extract, Transform, and Load Data in Power BI',
    issuer: 'Microsoft',
    pdfFileName: 'Extract-Transform-and-Load-Data-in-Power-BI.pdf',
    category: 'Power BI',
    date: '2025',
    skills: ['Power Query', 'ETL Pipelines', 'M Language']
  },
  {
    title: 'Deploy and Maintain Power BI Assets and Capstone Project',
    issuer: 'Microsoft',
    pdfFileName: 'Deploy and Maintain Power BI Assets and Capstone projec.pdf',
    category: 'Power BI',
    date: '2025',
    skills: ['Workspaces', 'Row-Level Security', 'Scheduled Refresh']
  },
  {
    title: 'Harnessing the Power of Data with Power BI',
    issuer: 'Microsoft',
    pdfFileName: 'Harnesing the Power of Data woith Power BI.pdf',
    category: 'Power BI',
    date: '2025',
    skills: ['Enterprise BI', 'Data Strategy', 'Governance']
  },
  {
    title: 'Preparing Data for Analysis with Microsoft Excel',
    issuer: 'Microsoft',
    pdfFileName: 'Preparing-Data-for-Analysis-with-Microsoft-Excel.pdf',
    category: 'Data Science',
    date: '2025',
    skills: ['Excel Advanced', 'Pivot Tables', 'Data Cleansing']
  },
  {
    title: 'Programming in Python',
    issuer: 'Meta / Coursera',
    pdfFileName: 'Programming-in-Python.pdf',
    category: 'Python/SQL',
    date: '2024',
    skills: ['OOP', 'Functional Programming', 'Data Structures']
  },
  {
    title: 'Automate Cybersecurity Tasks with Python',
    issuer: 'Google',
    pdfFileName: 'Automate-Cybersecurity-Tasks-with-Python.pdf',
    category: 'Python/SQL',
    date: '2024',
    skills: ['Python Automation', 'Scripting', 'Log Parsing']
  },
  {
    title: 'BCG Strategy Consulting & Analytics Internship',
    issuer: 'Boston Consulting Group / Forage',
    pdfFileName: 'BCG-Virtual-Internship.pdf',
    category: 'Data Science',
    date: '2025',
    skills: ['Strategy Analytics', 'Client Presentation', 'Business Modeling']
  },
  {
    title: 'Data Structures & Algorithms',
    issuer: 'Accredited Certification',
    pdfFileName: 'DSA.pdf',
    category: 'Python/SQL',
    date: '2024',
    skills: ['Trees & Graphs', 'Dynamic Programming', 'Complexity Analysis']
  },
  {
    title: 'Java as a Second Language',
    issuer: 'Coursera',
    pdfFileName: 'Java-as-a-Second-Language.pdf',
    category: 'Python/SQL',
    date: '2024',
    skills: ['Java Core', 'OOP Architecture', 'JVM Ecosystem']
  },
  {
    title: 'React JS Web Development',
    issuer: 'Meta / Coursera',
    pdfFileName: 'React-JS.pdf',
    category: 'Python/SQL',
    date: '2024',
    skills: ['React Components', 'State Management', 'Web Apps']
  },
  {
    title: 'Advanced CSS & Modern Web Styling',
    issuer: 'Coursera',
    pdfFileName: 'CSS.pdf',
    category: 'Python/SQL',
    date: '2024',
    skills: ['Flexbox & Grid', 'Responsive Layouts', 'CSS Variables']
  },
  {
    title: 'Data Analyst Career Guide & Interview Preparation',
    issuer: 'IBM',
    pdfFileName: 'Data-Analyst-Career-Guide-and-Interview-Preparation.pdf',
    category: 'Data Science',
    date: '2024',
    skills: ['Technical Interviews', 'Portfolio Reviews', 'Case Studies']
  },
  {
    title: 'Data Scientist Career Guide & Interview Preparation',
    issuer: 'IBM',
    pdfFileName: 'Data-Scientist-Career-Guide-and-Interview-Preparation.pdf',
    category: 'Data Science',
    date: '2024',
    skills: ['ML Systems Design', 'Behavioral Interviews', 'Case Studies']
  },
  {
    title: 'Enterprise Design Thinking Practitioner',
    issuer: 'IBM',
    pdfFileName: 'IBMDesign20250204-28-os1011.pdf',
    category: 'AI/ML',
    date: '2025',
    skills: ['Design Thinking', 'User Centric AI', 'Agile Product']
  }
];
