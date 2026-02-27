import { useState } from 'react'
import { Link } from 'react-router-dom'

const links = [
  { to: '/categories', label: 'Collections' },
  { to: '/pinyin', label: 'Pinyin' },
]

function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Chinese Learning
          </Link>

          {/* Desktop links */}
          <div className="hidden sm:flex space-x-2">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Hamburger button */}
          <button
            className="sm:hidden p-2 rounded hover:bg-blue-700 transition-colors"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-0.5 bg-white mb-1"></span>
            <span className="block w-5 h-0.5 bg-white mb-1"></span>
            <span className="block w-5 h-0.5 bg-white"></span>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="sm:hidden pb-3 flex flex-col space-y-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="hover:bg-blue-700 px-3 py-2 rounded transition-colors"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
