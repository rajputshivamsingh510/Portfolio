import ThemeToggle from '@/components/ui/ThemeToggle'
import { motion } from 'framer-motion'

const items = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#certificates', label: 'Certificates' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-neutral-950/70 backdrop-blur border-b border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#home" className="font-semibold tracking-tight text-lg">Shivam<span className="text-indigo-500">.</span></a>
        <nav className="hidden md:flex gap-6 text-sm">
          {items.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="text-neutral-600 dark:text-neutral-300 hover:text-indigo-500"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="#contact" className="rounded-full px-3 py-1.5 text-sm bg-indigo-600 text-white hover:bg-indigo-500 transition">Hire me</a>
        </div>
      </div>
    </header>
  )
}
