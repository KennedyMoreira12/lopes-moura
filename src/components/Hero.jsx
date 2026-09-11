import { Link } from 'react-router-dom'
import { buildWhatsAppLink } from '../config'
import './Hero.css'

export default function Hero() {
  return (
    <header className="hero" id="inicio">
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="hero__eyebrow">Compra · Venda · Locação</p>
        <h1 className="hero__title">
          Encontre o imóvel dos seus sonhos <span>com quem entende do assunto</span>
        </h1>
        <p className="hero__subtitle">
          O Grupo Lopes &amp; Moura atua há mais de 15 anos unindo pessoas a
          lares e negócios — com segurança, transparência e atendimento
          personalizado.
        </p>
        <div className="hero__actions">
          <Link to="/imoveis" className="btn btn--primary">
            Ver imóveis
          </Link>
          <a
            href={buildWhatsAppLink('Olá! Estou visitando o site da Lopes & Moura e gostaria de mais informações.')}
            className="btn btn--ghost btn--whatsapp"
            target="_blank"
            rel="noreferrer"
          >
            Falar no WhatsApp
          </a>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <strong>+500</strong>
            <span>Imóveis vendidos</span>
          </div>
          <div className="hero__stat">
            <strong>15 anos</strong>
            <span>De experiência</span>
          </div>
          <div className="hero__stat">
            <strong>98%</strong>
            <span>Clientes satisfeitos</span>
          </div>
        </div>
      </div>
    </header>
  )
}