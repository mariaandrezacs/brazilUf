import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Início' },
  { to: '/estados', label: 'Estados' },
  { to: '/municipios', label: 'Municípios' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/imgs/uf-br.jpg" alt="BrazilUF" className="h-10 w-auto" />
        </Link>
        <nav>
          <ul className="flex gap-1 sm:gap-4">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-neutral-600 hover:text-brand-700'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
