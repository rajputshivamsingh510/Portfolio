import { LoaderType } from './LoaderComponents';

// Configuration for easy loader management
export const LOADER_CONFIG = {
  // Current active loader type
  activeLoader: LoaderType.DNA, // Change this to switch loaders
  
  // Loading screen settings
  duration: 2000, // milliseconds
  
  // Typewriter text options
  loadingTexts: [
    'Initializing AI...',
    'Loading Neural Networks...',
    'Preparing Portfolio...',
    'Almost Ready...'
  ],
  
  // Animation settings
  typewriterSpeed: 100, // milliseconds per character
  textPauseDuration: 1000, // pause between texts
  
  // Background particles
  particleCount: 30,
  
  // Progress bar
  showProgressBar: true,
  showPercentage: false,
  
  // Theme specific settings
  themes: {
    light: {
      primaryColor: '#2563eb',
      secondaryColor: '#7c3aed',
      accentColor: '#db2777'
    },
    dark: {
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      accentColor: '#ec4899'
    }
  }
};

// Loader descriptions for documentation
export const LOADER_DESCRIPTIONS = {
  [LoaderType.DNA]: 'DNA helix animation - perfect for scientific/AI themes',
  [LoaderType.NEURAL]: 'Neural network visualization - ideal for ML portfolios',
  [LoaderType.MORPHING]: 'Shape-shifting animation - creative and dynamic',
  [LoaderType.PARTICLE]: 'Wave particle effect - smooth and elegant',
  [LoaderType.GLITCH]: 'Code/matrix style - techy aesthetic',
  [LoaderType.RINGS]: 'Pulsing rings - clean and minimal',
  [LoaderType.GRADIENT]: 'Spinning gradient - modern and colorful'
};

// Easy preset configurations
export const LOADER_PRESETS = {
  aiml: {
    loader: LoaderType.NEURAL,
    texts: [
      'Training Models...',
      'Processing Data...',
      'Optimizing Algorithms...',
      'Ready to Showcase!'
    ]
  },
  
  creative: {
    loader: LoaderType.MORPHING,
    texts: [
      'Crafting Experience...',
      'Building Interface...',
      'Adding Magic...',
      'Welcome!'
    ]
  },
  
  minimal: {
    loader: LoaderType.GRADIENT,
    texts: [
      'Loading...',
      'Please wait...',
      'Almost there...',
      'Ready!'
    ]
  },
  
  techy: {
    loader: LoaderType.GLITCH,
    texts: [
      'Booting system...',
      'Connecting nodes...',
      'Executing scripts...',
      'System ready!'
    ]
  }
};