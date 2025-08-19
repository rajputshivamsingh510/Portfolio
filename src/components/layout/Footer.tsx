export default function Footer() {
  return (
    <footer className="border-t border-neutral-200/60 dark:border-neutral-800/60 mt-10">
      <div className="mx-auto max-w-6xl px-4 py-8 flex items-center justify-between text-sm">
        <p className="text-neutral-600 dark:text-neutral-400">© {new Date().getFullYear()} Shivam Singh. All rights reserved.</p>
        <a href="#home" className="rounded-full border px-3 py-1 hover:text-indigo-600">↑ Top</a>
      </div>
    </footer>
  )
}
