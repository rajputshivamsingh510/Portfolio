/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        apple: {
          canvas: '#F5F5F7',
          card: '#FFFFFF',
          border: '#E5E5EA',
          borderSubtle: '#F0F0F2',
          text: '#1D1D1F',
          muted: '#86868B',
          secondary: '#F2F2F7',
        },
        charcoal: {
          950: '#090A0F',
          900: '#10121A',
          850: '#161924',
          800: '#1C202E',
          700: '#282E40',
          600: '#3A4259',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        obsidian: {
          950: '#090A0F',
          900: '#10121A',
          850: '#161924',
          800: '#1C202E',
          700: '#282E40',
          600: '#3A4259',
        },
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'metallic': 'linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%)',
        'metallic-dark': 'linear-gradient(180deg, #18181B 0%, #71717A 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-spin': 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
