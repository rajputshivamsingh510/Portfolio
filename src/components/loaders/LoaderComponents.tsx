import React from 'react';
import { motion } from 'framer-motion';

// Loader Types Enum for easy switching
export enum LoaderType {
  DNA = 'dna',
  NEURAL = 'neural',
  MORPHING = 'morphing',
  PARTICLE = 'particle',
  GLITCH = 'glitch',
  RINGS = 'rings',
  GRADIENT = 'gradient'
}

// 1. DNA Helix Loader (Perfect for AI/ML theme)
export const DNALoader = ({ darkMode }: { darkMode: boolean }) => (
  <div className="relative w-16 h-20">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute w-3 h-3 rounded-full ${
          darkMode ? 'bg-blue-400' : 'bg-blue-600'
        }`}
        animate={{
          x: [0, 20, 0, -20, 0],
          y: [0, 10, 20, 10, 0],
          scale: [1, 1.2, 1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeInOut"
        }}
        style={{
          left: i === 1 ? '50%' : i === 0 ? '25%' : '75%',
          top: `${i * 25}%`,
        }}
      />
    ))}
  </div>
);

// 2. Neural Network Loader (AI/ML themed)
export const NeuralNetworkLoader = ({ darkMode }: { darkMode: boolean }) => (
  <div className="relative w-20 h-20">
    {/* Nodes */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={`node-${i}`}
        className={`absolute w-2 h-2 rounded-full ${
          darkMode ? 'bg-purple-400' : 'bg-purple-600'
        }`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: i * 0.2,
        }}
        style={{
          left: `${30 + (i % 3) * 20}%`,
          top: `${20 + Math.floor(i / 3) * 40}%`,
        }}
      />
    ))}
    
    {/* Connections */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={`line-${i}`}
        className={`absolute h-0.5 ${
          darkMode ? 'bg-blue-400' : 'bg-blue-600'
        } origin-left`}
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.3,
        }}
        style={{
          width: '25px',
          left: `${35 + (i % 2) * 15}%`,
          top: `${30 + Math.floor(i / 2) * 20}%`,
          transform: `rotate(${i * 45}deg)`,
        }}
      />
    ))}
  </div>
);

// 3. Morphing Shapes Loader
export const MorphingLoader = ({ darkMode }: { darkMode: boolean }) => (
  <motion.div
    className={`w-16 h-16 ${
      darkMode 
        ? 'bg-gradient-to-r from-cyan-400 to-purple-400' 
        : 'bg-gradient-to-r from-blue-500 to-purple-500'
    }`}
    animate={{
      borderRadius: ["50%", "25%", "50%", "25%", "50%"],
      rotate: [0, 90, 180, 270, 360],
      scale: [1, 1.2, 1, 0.8, 1],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

// 4. Particle Wave Loader
export const ParticleWaveLoader = ({ darkMode }: { darkMode: boolean }) => (
  <div className="flex space-x-2">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className={`w-3 h-3 rounded-full ${
          darkMode ? 'bg-emerald-400' : 'bg-emerald-500'
        }`}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          delay: i * 0.1,
          ease: "easeInOut"
        }}
      />
    ))}
  </div>
);

// 5. Glitch/Code Style Loader
export const GlitchLoader = ({ darkMode }: { darkMode: boolean }) => (
  <div className="relative">
    <motion.div
      className={`text-4xl font-mono font-bold ${
        darkMode ? 'text-green-400' : 'text-green-600'
      }`}
      animate={{
        opacity: [1, 0.5, 1, 0.3, 1],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
      }}
    >
      {'</>'}
    </motion.div>
    <motion.div
      className="absolute inset-0 text-4xl font-mono font-bold text-red-400"
      animate={{
        x: [0, 2, -2, 0],
        opacity: [0, 0.7, 0],
      }}
      transition={{
        duration: 0.3,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {'</>'}
    </motion.div>
  </div>
);

// 6. Pulsing Rings Loader
export const PulsingRingsLoader = ({ darkMode }: { darkMode: boolean }) => (
  <div className="relative w-16 h-16">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute inset-0 border-2 rounded-full ${
          darkMode ? 'border-blue-400' : 'border-blue-500'
        }`}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [1, 0.3, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.4,
        }}
      />
    ))}
  </div>
);

// 7. Modern Gradient Spinner
export const GradientSpinner = ({ darkMode }: { darkMode: boolean }) => (
  <motion.div
    className="w-12 h-12 rounded-full"
    style={{
      background: darkMode 
        ? 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)'
        : 'conic-gradient(from 0deg, #2563eb, #7c3aed, #db2777, #2563eb)',
      mask: 'radial-gradient(circle at center, transparent 30%, black 31%)',
      WebkitMask: 'radial-gradient(circle at center, transparent 30%, black 31%)',
    }}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

// Main Loader Component with type selection
export const ModernLoader = ({ 
  type = LoaderType.DNA, 
  darkMode 
}: { 
  type?: LoaderType;
  darkMode: boolean;
}) => {
  const loaders = {
    [LoaderType.DNA]: <DNALoader darkMode={darkMode} />,
    [LoaderType.NEURAL]: <NeuralNetworkLoader darkMode={darkMode} />,
    [LoaderType.MORPHING]: <MorphingLoader darkMode={darkMode} />,
    [LoaderType.PARTICLE]: <ParticleWaveLoader darkMode={darkMode} />,
    [LoaderType.GLITCH]: <GlitchLoader darkMode={darkMode} />,
    [LoaderType.RINGS]: <PulsingRingsLoader darkMode={darkMode} />,
    [LoaderType.GRADIENT]: <GradientSpinner darkMode={darkMode} />
  };

  return loaders[type];
};