import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.img
          src="/profile.jpg"
          alt="Profile"
          className="w-48 h-48 rounded-2xl object-cover shadow-lg md:justify-self-center"
          whileHover={{ rotate: 1.5, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        />
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">About Me</h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
            className="mt-4 text-neutral-600 dark:text-neutral-400"
          >
            I specialize in machine learning, deep learning, and NLP. I enjoy crafting clear interfaces over robust ML backends—deployed on cloud with CI/CD.
          </motion.p>
          <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
            {['Python','SQL','Pandas','Scikit-learn','TensorFlow','PyTorch','NLP','Computer Vision','AWS','GCP','Docker','FastAPI'].map(s => (
              <li key={s} className="rounded-full border px-3 py-1 border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60">{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
