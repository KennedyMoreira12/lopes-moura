import { Link } from 'react-router-dom'
import { CONTACT, buildWhatsAppLink } from '../config'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <div className="footer__logo">LOPES &amp; MOURA</div>
          <p className="footer__tagline">
            Empreendimentos e imobiliária. Realizando sonhos há mais de 15 anos.
          </p>
        </div>

        <div className="footer__col">
          <h4>Navegação</h4>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/imoveis">Imóveis</Link></li>
            <li><Link to="/venda">Venda seu imóvel</Link></li>
            <li><Link to="/#sobre">Sobre</Link></li>
            <li><Link to="/#contato">Contato</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contato</h4>
          <ul>
            <li>
              <a href={buildWhatsAppLink('Olá! Gostaria de falar com a Lopes & Moura.')} target="_blank" rel="noreferrer">
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>{CONTACT.address}</li>
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <div className="footer__bar-inner">
          <span>© {year} Grupo Lopes &amp; Moura Empreendimentos e Imobiliária. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  )
}