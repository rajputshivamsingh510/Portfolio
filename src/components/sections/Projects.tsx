import { Project } from '@/types'
import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const projects: Project[] = [
  { title: 'Groovify — Song Recommender', description: 'Chatbot that recommends songs from mood using IBM Tone Analyzer + Last.fm.', tech: ['Python','NLP','Flask','Anvil'], code: 'https://github.com/', demo: '#' },
  { title: 'Student Marks Predictor', description: 'Regression model with feature engineering and fast API demo.', tech: ['scikit-learn','FastAPI','Docker'], code: 'https://github.com/', demo: '#' },
  { title: 'Breast Cancer Classifier', description: 'Binary classification with pipeline + metrics dashboard.', tech: ['sklearn','Streamlit'], code: 'https://github.com/', demo: '#' },
  { title: 'Wallet Risk Scoring', description: 'Transaction-based scoring model for DeFi wallets.', tech: ['XGBoost','LightGBM','Pandas'], code: 'https://github.com/', demo: '#' },
]

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-2xl md:text-3xl font-semibold">Projects</h2>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {projects.map((p, idx) => (
          <motion.article key={p.title} className="card p-5"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: idx * .06 }}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{p.description}</p>
              </div>
              <div className="flex gap-2">
                {p.code && <a className="p-2 rounded-full border hover:text-indigo-600 dark:hover:text-indigo-400" href={p.code} target="_blank" rel="noreferrer"><FiGithub /></a>}
                {p.demo && <a className="p-2 rounded-full border hover:text-indigo-600 dark:hover:text-indigo-400" href={p.demo} target="_blank" rel="noreferrer"><FiExternalLink /></a>}
              </div>
            </div>
            <ul className="mt-3 flex flex-wrap gap-2 text-xs">
              {p.tech.map(t => <li key={t} className="rounded-full border px-2 py-0.5">{t}</li>)}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
