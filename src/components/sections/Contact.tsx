import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState<string>('')

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
      setStatus('Please fill all fields correctly.')
      return
    }
    setStatus('Thanks! Your message has been recorded locally. Hook this up to Formspree or a backend to receive emails.')
    form.reset()
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-2xl md:text-3xl font-semibold">Contact</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <form onSubmit={onSubmit} className="card p-5 space-y-3">
          <input name="name" placeholder="Your name" className="w-full rounded-xl border px-3 py-2 bg-transparent" />
          <input name="email" placeholder="you@example.com" className="w-full rounded-xl border px-3 py-2 bg-transparent" />
          <textarea name="message" placeholder="Your message..." rows={5} className="w-full rounded-xl border px-3 py-2 bg-transparent" />
          <button className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500">Send</button>
          {status && <p className="text-sm text-neutral-600 dark:text-neutral-400">{status}</p>}
        </form>
        <div className="card p-5">
          <h3 className="font-medium">Find me online</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a className="underline underline-offset-4 hover:text-indigo-600" href="https://www.linkedin.com/" target="_blank">LinkedIn</a></li>
            <li><a className="underline underline-offset-4 hover:text-indigo-600" href="https://github.com/" target="_blank">GitHub</a></li>
            <li><a className="underline underline-offset-4 hover:text-indigo-600" href="https://kaggle.com/" target="_blank">Kaggle</a></li>
            <li><a className="underline underline-offset-4 hover:text-indigo-600" href="mailto:you@example.com">Email</a></li>
          </ul>
        </div>
      </div>
    </section>
  )
}
