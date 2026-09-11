import { testimonials } from '../data/testimonials'
import './Testimonials.css'

function Stars({ count }) {
  return (
    <div className="stars" aria-label={`${count} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= count ? '#d4af37' : '#d8dde7'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="testimonials" id="depoimentos">
      <div className="section-header">
        <p className="section-eyebrow">Depoimentos</p>
        <h2 className="section-title">Quem confiou, recomenda</h2>
        <p className="section-subtitle">
          Histórias reais de quem comprou, vendeu ou alugou conosco.
        </p>
      </div>

      <div className="testimonials__grid">
        {testimonials.map((t) => (
          <figure className="testimonial" key={t.name}>
            <Stars count={t.rating} />
            <blockquote>“{t.text}”</blockquote>
            <figcaption>
              <span className="testimonial__avatar">{t.name.charAt(0)}</span>
              <div>
                <strong>{t.name}</strong>
                <small>{t.role}</small>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="testimonials__cta">
        Confiando na Lopes &amp; Moura, você tem tranquilidade do primeiro
        contato à entrega das chaves.
      </div>
    </section>
  )
}