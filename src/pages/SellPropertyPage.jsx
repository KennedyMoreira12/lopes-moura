import { useState } from 'react'
import { buildWhatsAppLink } from '../config'
import usePageTitle from '../hooks/usePageTitle'
import './SellPropertyPage.css'

const initialForm = {
  name: '',
  phone: '',
  type: 'Casa',
  location: '',
  price: '',
  details: '',
}

const TYPE_OPTIONS = [
  'Casa',
  'Apartamento',
  'Cobertura',
  'Sala Comercial',
  'Terreno',
  'Chácara',
  'Outro',
]

export default function SellPropertyPage() {
  usePageTitle('Venda seu imóvel | Lopes & Moura')

  const [form, setForm] = useState(initialForm)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const lines = [
      `Olá! Quero vender meu imóvel com a Lopes & Moura.`,
      `Nome: ${form.name}`,
      `Telefone: ${form.phone}`,
      `Tipo: ${form.type}`,
      `Localização: ${form.location}`,
      form.price && `Valor estimado: R$ ${form.price}`,
      form.details && `Detalhes: ${form.details}`,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(buildWhatsAppLink(`${lines}`), '_blank', 'noreferrer')
    setSent(true)
    setForm(initialForm)
    setTimeout(() => setSent(false), 6000)
  }

  return (
    <div className="page sell">
      <div className="page__header">
        <p className="section-eyebrow">Avaliação gratuita</p>
        <h1 className="section-title">Venda seu imóvel com a gente</h1>
        <p className="section-subtitle">
          Preencha as informações e receba no WhatsApp uma avaliação gratuita e
          uma proposta de como anunciar seu imóvel.
        </p>
      </div>

      <div className="page__inner sell__inner">
        <form className="sell__form" onSubmit={handleSubmit}>
          <div className="sell__row">
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

          <div className="sell__row">
            <label className="field">
              <span>Tipo de imóvel</span>
              <select name="type" value={form.type} onChange={handleChange}>
                {TYPE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Cidade / Bairro</span>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Ex.: Centro, Montes Claros"
              />
            </label>
          </div>

          <label className="field">
            <span>Valor estimado (R$)</span>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Ex.: 850000"
              min="0"
            />
          </label>

          <label className="field">
            <span>Fale sobre o imóvel</span>
            <textarea
              name="details"
              value={form.details}
              onChange={handleChange}
              rows="5"
              placeholder="Área, quartos, vagas, estado de conservação, diferenciais..."
            />
          </label>

          <button type="submit" className="btn btn--primary sell__submit">
            Enviar pelo WhatsApp
          </button>

          {sent && (
            <p className="sell__success">
              Mensagem preparada! Seu WhatsApp será aberto para confirmação do
              envio.
            </p>
          )}
        </form>

        <aside className="sell__side">
          <div className="sell__card">
            <h3>Por que vender com a Lopes &amp; Moura?</h3>
            <ul>
              <li>Avaliação gratuita de mercado</li>
              <li>Fotos profissionais e anúncio em vários portais</li>
              <li>Divulgação para a nossa base de clientes</li>
              <li>Análise documental completa e negociação segura</li>
              <li>Acompanhamento da venda até a assinatura</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}