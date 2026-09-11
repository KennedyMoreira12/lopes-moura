import { Link, useParams } from 'react-router-dom'
import PropertyGrid from '../components/PropertyGrid'
import FinancingCalculator from '../components/FinancingCalculator'
import { getPropertyById, formatPrice, properties } from '../data/properties'
import { buildWhatsAppLink } from '../config'
import usePageTitle from '../hooks/usePageTitle'
import './PropertyDetailPage.css'

function Gallery({ property }) {
  const gallery = [
    property.gradient,
    property.gradient.replace('135deg', '45deg'),
    property.gradient.replace('135deg', '200deg'),
    property.gradient.replace('135deg', '300deg'),
  ]

  return (
    <div className="gallery">
      <div className="gallery__main" style={{ background: gallery[0] }}>
        <span
          className={`card__badge card__badge--${property.status === 'Venda' ? 'sale' : 'rent'}`}
        >
          {property.status}
        </span>
        <svg width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M10 21v-6h4v6" />
        </svg>
      </div>
      <div className="gallery__thumbs">
        {gallery.slice(1).map((g, i) => (
          <span key={i} className="gallery__thumb" style={{ background: g }} />
        ))}
      </div>
    </div>
  )
}

export default function PropertyDetailPage() {
  const { id } = useParams()
  const property = getPropertyById(id)

  usePageTitle(
    property
      ? `${property.title} | Lopes & Moura`
      : 'Imóvel não encontrado | Lopes & Moura'
  )

  if (!property) {
    return (
      <div className="page">
        <div className="page__inner empty">
          <h3>Imóvel não encontrado</h3>
          <p>O imóvel que você procura não está mais na nossa lista.</p>
          <Link to="/imoveis" className="btn btn--primary">
            Ver todos os imóveis
          </Link>
        </div>
      </div>
    )
  }

  const related = properties
    .filter((p) => p.id !== property.id)
    .slice(0, 3)

  const features = [
    { label: 'Área', value: `${property.area} m²` },
    { label: 'Quartos', value: property.beds > 0 ? property.beds : '—' },
    { label: 'Banheiros', value: property.baths > 0 ? property.baths : '—' },
    { label: 'Vagas', value: property.garage > 0 ? property.garage : '—' },
    { label: 'Tipo', value: property.type },
    { label: 'Finalidade', value: property.status },
    { label: 'Cidade', value: property.city },
  ]

  return (
    <div className="page">
      <div className="page__inner">
        <Link to="/imoveis" className="back-link">
          ← Voltar para todos os imóveis
        </Link>

        <div className="detail">
          <Gallery property={property} />

          <aside className="detail__aside">
            <p className="card__type">{property.type}</p>
            <h1 className="detail__title">{property.title}</h1>
            <p className="detail__city" title={property.city}>
              {property.city}
            </p>
            <strong className="detail__price">{formatPrice(property)}</strong>

            <div className="detail__features">
              {features.map((f) => (
                <div className="detail__feature" key={f.label}>
                  <span>{f.label}</span>
                  <strong>{f.value}</strong>
                </div>
              ))}
            </div>

            <a
              href={buildWhatsAppLink(
                `Olá! Tenho interesse no imóvel: ${property.title} (${property.city}) — ${formatPrice(property)}. Gostaria de agendar uma visita.`
              )}
              className="btn btn--primary detail__cta"
              target="_blank"
              rel="noreferrer"
            >
              Tenho interesse — chamar no WhatsApp
            </a>
            <p className="detail__note">
              Resposta rápida pelo WhatsApp. Horário: seg a sáb.
            </p>
          </aside>
        </div>

        <p className="detail__description">{property.description}</p>

        {property.status === 'Venda' && (
          <FinancingCalculator price={property.price} compact />
        )}

        <section className="related">
          <h2 className="related__title">Você também pode gostar</h2>
          <PropertyGrid items={related} />
        </section>
      </div>
    </div>
  )
}