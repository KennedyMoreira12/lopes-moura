import { useMemo, useState } from 'react'
import SearchFilters from '../components/SearchFilters'
import PropertyGrid from '../components/PropertyGrid'
import { properties } from '../data/properties'
import usePageTitle from '../hooks/usePageTitle'
import '../components/SearchFilters.css'

const allCities = [...new Set(properties.map((p) => p.city))]

export default function PropertiesPage() {
  usePageTitle('Imóveis à venda e para alugar | Lopes & Moura')

  const [filters, setFilters] = useState({
    query: '',
    status: 'todos',
    type: 'todos',
    city: 'Todas as cidades',
    beds: 'any',
    priceIndex: 0,
    allCities,
  })

  const filtered = useMemo(() => {
    let list = [...properties]
    const { query, status, type, city, beds, priceIndex } = filters

    if (status !== 'todos') {
      list = list.filter((p) => p.status === status)
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter((p) =>
        `${p.title} ${p.city} ${p.type} ${p.description}`.toLowerCase().includes(q)
      )
    }
    if (type !== 'todos') {
      list = list.filter((p) => p.type === type)
    }
    if (city !== 'Todas as cidades') {
      list = list.filter((p) => p.city === city)
    }
    if (beds !== 'any') {
      const min = Number(beds)
      list = list.filter((p) => p.beds >= min)
    }
    if (priceIndex > 0) {
      const ranges =
        status === 'Locação'
          ? [
              { min: 0, max: 2000 },
              { min: 2000, max: 4000 },
              { min: 4000, max: 6500 },
              { min: 6500, max: Infinity },
            ]
          : [
              { min: 0, max: 850000 },
              { min: 850000, max: 1500000 },
              { min: 1500000, max: 2500000 },
              { min: 2500000, max: Infinity },
            ]
      const range = ranges[priceIndex - 1]
      list = list.filter((p) => p.price >= range.min && p.price < range.max)
    }

    return list
  }, [filters])

  return (
    <div className="page">
      <div className="page__header">
        <p className="section-eyebrow">Catálogo completo</p>
        <h1 className="section-title">Nossos imóveis</h1>
        <p className="section-subtitle">
          Use os filtros para encontrar a oportunidade ideal para você.
        </p>
      </div>

      <div className="page__inner">
        <SearchFilters filters={filters} onChange={setFilters} />

        <p className="results-count">
          <strong>{filtered.length}</strong>{' '}
          {filtered.length === 1
            ? 'imóvel encontrado'
            : 'imóveis encontrados'}
        </p>

        {filtered.length ? (
          <PropertyGrid items={filtered} />
        ) : (
          <div className="empty">
            <h3>Nenhum imóvel encontrado</h3>
            <p>Que tal ampliar os filtros ou falar com a gente no WhatsApp?</p>
          </div>
        )}
      </div>
    </div>
  )
}