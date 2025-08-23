import { Certificate } from '@/types'
import { motion } from 'framer-motion'

const certs: Certificate[] = [
  { title: 'Python Programming', issuer: 'Coursera', year: '2024', url: '#' },
  { title: 'Advanced Data Analytics', issuer: 'Google', year: '2025', url: '#' },
  { title: 'Power BI', issuer: 'Microsoft', year: '2025', url: '#' },
]

export default function Certificates() {
  return (
    <section id="certificates" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-2xl md:text-3xl font-semibold">Certificates</h2>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certs.map((c, i) => (
          <motion.a key={c.title} href={c.url || '#'} className="card p-5 group"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .05 }}>
            <div className="aspect-video rounded-xl bg-gradient-to-br from-indigo-500/15 to-cyan-500/15 group-hover:from-indigo-500/25 group-hover:to-cyan-500/25 transition mb-3" />
            <h3 className="font-medium">{c.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{c.issuer} • {c.year}</p>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
