import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const LINKS = [
  { label: 'Início', to: '/' },
  { label: 'Imóveis', to: '/imoveis' },
  { label: 'Venda seu imóvel', to: '/venda' },
  { label: 'Sobre', to: '/#sobre' },
  { label: 'Contato', to: '/#contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-name">LOPES &amp; MOURA</span>
          <span className="navbar__logo-sub">Empreendimentos</span>
        </Link>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link to={link.to} className="navbar__link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  )
}