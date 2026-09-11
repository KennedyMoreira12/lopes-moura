import { useState } from 'react'
import { buildWhatsAppLink, buildMapsEmbedUrl, CONTACT } from '../config'
import './Contact.css'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  interest: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const lines = [
      `Olá! Meu nome é ${form.name}.`,
      `Telefone: ${form.phone}`,
      form.email && `E-mail: ${form.email}`,
      form.interest && `Interesse: ${form.interest}`,
      form.message && `Mensagem: ${form.message}`,
    ]
      .filter(Boolean)
      .join('\n')

    const link = buildWhatsAppLink(
      `${lines}\n\n(Enviado pelo site da Lopes & Moura)`
    )
    window.open(link, '_blank', 'noreferrer')
    setSent(true)
    setForm(initialForm)
    setTimeout(() => setSent(false), 6000)
  }

  return (
    <section className="contact" id="contato">
      <div className="contact__container">
        <div className="section-header">
          <p className="section-eyebrow">Fale conosco</p>
          <h2 className="section-title">Vamos conversar sobre seu próximo imóvel?</h2>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            <h3>Nosso contato</h3>
            <div className="contact__item">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.9V21a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 1 4.2 2 2 0 0 1 3 2h4.2a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8.3 9.7a16 16 0 0 0 6 6l1.2-1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z" />
              </svg>
              <div>
                <span>Telefone / WhatsApp</span>
                <a href={buildWhatsAppLink('Olá! Gostaria de falar com a Lopes & Moura.')} target="_blank" rel="noreferrer">
                  {CONTACT.phone}
                </a>
              </div>
            </div>

            <div className="contact__item">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 6 10-6" />
              </svg>
              <div>
                <span>E-mail</span>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
            </div>

            <div className="contact__item">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <span>Endereço</span>
                <p>{CONTACT.address}</p>
              </div>
            </div>

            <div className="contact__item">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <div>
                <span>Horário</span>
                <p>{CONTACT.hours}</p>
              </div>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__row">
              <label className="field">
                <span>Nome completo *</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome"
                />
              </label>
              <label className="field">
                <span>Telefone / WhatsApp *</span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="(00) 00000-0000"
                />
              </label>
            </div>

            <label className="field">
              <span>E-mail</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="voce@email.com"
              />
            </label>

            <label className="field">
              <span>Interesse</span>
              <select name="interest" value={form.interest} onChange={handleChange}>
                <option value="">Selecione uma opção...</option>
                <option>Comprar imóvel</option>
                <option>Vender imóvel</option>
                <option>Alugar imóvel</option>
                <option>Novos empreendimentos</option>
                <option>Avaliação de imóvel</option>
                <option>Outro assunto</option>
              </select>
            </label>

            <label className="field">
              <span>Mensagem</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                placeholder="Conte um pouco sobre o que você procura..."
              />
            </label>

            <button type="submit" className="btn btn--primary btn--submit">
              Enviar pelo WhatsApp
            </button>

            {sent && (
              <p className="contact__success">
                Mensagem preparada! Seu WhatsApp será aberto para confirmação do
                envio.
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="contact__map">
        <iframe
          src={buildMapsEmbedUrl()}
          title="Localização do Grupo Lopes & Moura"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  )
}