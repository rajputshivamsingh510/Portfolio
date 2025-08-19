import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-aurora pointer-events-none" />
      <div className="absolute inset-0 bg-grid bg-[length:24px_24px] opacity-[.35] dark:opacity-[.18] pointer-events-none" />
      <div className="mx-auto max-w-6xl px-4 py-24 md:py-32 relative">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white"
        >
          Shivam Singh
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: .1 }}
          className="mt-3 text-xl md:text-2xl text-neutral-700 dark:text-neutral-300"
        >
          AI/ML Engineer • Data Scientist • Python Developer
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: .2 }}
          className="mt-6 max-w-2xl text-neutral-600 dark:text-neutral-400"
        >
          Turning data into intelligent solutions. I build production-grade ML systems, insightful dashboards, and resilient data pipelines.
        </motion.p>
        <div className="mt-8 flex gap-3">
          <a href="/resume.pdf" className="px-4 py-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition">Download Resume</a>
          <a href="#contact" className="px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition">Contact Me</a>
        </div>
      </div>
    </section>
  )
}
