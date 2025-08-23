import { motion } from 'framer-motion'

const categories: Record<string, string[]> = {
  Programming: ['Python','JavaScript/TypeScript','SQL'],
  'ML/DL Frameworks': ['Scikit-learn','TensorFlow','PyTorch','XGBoost'],
  'Data Tools': ['Pandas','NumPy','Matplotlib','Power BI'],
  'Cloud & DevOps': ['AWS','GCP','Docker','GitHub Actions']
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-2xl md:text-3xl font-semibold">Skills</h2>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(categories).map(([cat, items], i) => (
          <motion.div key={cat} className="card p-4"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
            <h3 className="font-medium">{cat}</h3>
            <ul className="mt-3 space-y-2">
              {items.map(item => (
                <li key={item} className="flex items-center justify-between text-sm">
                  <span>{item}</span>
                  <span className="h-1 w-20 rounded-full bg-indigo-500/30 relative overflow-hidden">
                    <span className="absolute inset-0 bg-indigo-500 animate-[load_1.5s_ease-in-out]"
                      style={{animationName: 'none'}} />
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
