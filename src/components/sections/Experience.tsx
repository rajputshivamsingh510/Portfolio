import { Experience } from '@/types'
import { motion } from 'framer-motion'
import { FiBriefcase } from 'react-icons/fi'

const items: Experience[] = [
  { company: 'SmartBank', role: 'Data Scientist (Project)', period: '03/2025-05/2025', bullets: ['Customer churn prediction','Feature engineering & model monitoring'] },
  { company: 'Akridata (Internship)', role: 'AI/ML Intern (Remote)', period: '09/2025-Present', bullets: ['Vision/NLP tasks','Fast prototyping & reporting'] }
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-2xl md:text-3xl font-semibold">Experience</h2>
      <div className="mt-8 space-y-4">
        {items.map((e, i) => (
          <motion.div key={e.company} className="card p-5 flex gap-4"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }}>
            <div className="shrink-0 p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"><FiBriefcase /></div>
            <div>
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="font-semibold">{e.role}</h3>
                <span className="text-sm text-neutral-500">— {e.company}</span>
                <span className="ml-auto text-xs rounded-full border px-2 py-0.5">{e.period}</span>
              </div>
              <ul className="mt-2 list-disc list-inside text-sm text-neutral-700 dark:text-neutral-300">
                {e.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
