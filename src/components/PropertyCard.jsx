import { Link } from 'react-router-dom'
import { formatPrice } from '../data/properties'
import { buildWhatsAppLink } from '../config'
import './Properties.css'

export default function PropertyCard({ property }) {
  return (
    <article className="card">
      <Link to={`/imovel/${property.id}`} className="card__link">
        <span className="card__image" style={{ background: property.gradient }}>
          <span
            className={`card__badge card__badge--${property.status === 'Venda' ? 'sale' : 'rent'}`}
          >
            {property.status === 'Venda' ? 'Venda' : 'Locação'}
          </span>
          <span className="card__placeholder" aria-hidden="true">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 9.5V21h14V9.5" />
              <path d="M10 21v-6h4v6" />
            </svg>
          </span>
        </span>
      </Link>

      <div className="card__body">
        <p className="card__type">{property.type}</p>
        <h3 className="card__title">
          <Link to={`/imovel/${property.id}`}>{property.title}</Link>
        </h3>
        <p className="card__city" title={property.city}>
          {property.city}
        </p>
        <div className="card__meta">
          <span>{property.area} m²</span>
          <span>{property.beds > 0 ? `${property.beds} quartos` : 'Comercial'}</span>
          <span>{property.baths > 0 ? `${property.baths} banheiros` : '—'}</span>
          {property.garage > 0 && <span>{property.garage} vagas</span>}
        </div>
        <div className="card__footer">
          <strong className="card__price">{formatPrice(property)}</strong>
          <Link to={`/imovel/${property.id}`} className="btn btn--primary btn--sm">
            Ver detalhes
          </Link>
        </div>
        <a
          href={buildWhatsAppLink(
            `Olá! Tenho interesse no imóvel: ${property.title} (${property.city}) — ${formatPrice(property)}. Gostaria de mais informações.`
          )}
          className="card__whatsapp"
          target="_blank"
          rel="noreferrer"
        >
          Tenho interesse — chamar no WhatsApp
        </a>
      </div>
    </article>
  )
}