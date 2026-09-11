import './SearchFilters.css'

const STATUS_OPTIONS = [
  { value: 'todos', label: 'Venda e Locação' },
  { value: 'Venda', label: 'Venda' },
  { value: 'Locação', label: 'Locação' },
]

const TYPE_OPTIONS = [
  'Apartamento',
  'Casa',
  'Cobertura',
  'Sala Comercial',
  'Terreno',
  'Chácara',
]

const BED_OPTIONS = [
  { value: 'any', label: 'Qualquer quantidade' },
  { value: '1', label: '1+ quartos' },
  { value: '2', label: '2+ quartos' },
  { value: '3', label: '3+ quartos' },
  { value: '4', label: '4+ quartos' },
]

const PRICE_RANGES = {
  Venda: [
    { label: 'Qualquer valor', min: 0, max: Infinity },
    { label: 'Até R$ 850 mil', min: 0, max: 850000 },
    { label: 'R$ 850 mil a R$ 1,5 mi', min: 850000, max: 1500000 },
    { label: 'R$ 1,5 mi a R$ 2,5 mi', min: 1500000, max: 2500000 },
    { label: 'Acima de R$ 2,5 mi', min: 2500000, max: Infinity },
  ],
  Locação: [
    { label: 'Qualquer valor', min: 0, max: Infinity },
    { label: 'Até R$ 2.000', min: 0, max: 2000 },
    { label: 'R$ 2.000 a R$ 4.000', min: 2000, max: 4000 },
    { label: 'R$ 4.000 a R$ 6.500', min: 4000, max: 6500 },
    { label: 'Acima de R$ 6.500', min: 6500, max: Infinity },
  ],
}

export default function SearchFilters({ filters, onChange }) {
  const cityOptions = ['Todos os bairros e cidades']
  filters.allCities.forEach((c) => {
    if (!cityOptions.includes(c)) cityOptions.push(c)
  })

  const priceRange =
    filters.status === 'Locação'
      ? PRICE_RANGES.Locação
      : PRICE_RANGES.Venda

  const update = (field, value) => onChange({ ...filters, [field]: value })

  const reset = () =>
    onChange({
      query: '',
      status: 'todos',
      type: 'todos',
      city: 'Todas as cidades',
      beds: 'any',
      priceIndex: 0,
      allCities: filters.allCities,
    })

  return (
    <div className="filters">
      <div className="filters__search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          placeholder="Buscar por nome, bairro ou cidade..."
          value={filters.query}
          onChange={(e) => update('query', e.target.value)}
        />
      </div>

      <div className="filters__grid">
        <label className="filter">
          <span>Finalidade</span>
          <select value={filters.status} onChange={(e) => update('status', e.target.value)}>
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <label className="filter">
          <span>Tipo de imóvel</span>
          <select value={filters.type} onChange={(e) => update('type', e.target.value)}>
            <option value="todos">Todos os tipos</option>
            {TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="filter">
          <span>Cidade</span>
          <select value={filters.city} onChange={(e) => update('city', e.target.value)}>
            {cityOptions.map((c) => (
              <option key={c} value={c}>
                {c === 'Todos os bairros e cidades' ? 'Todas as cidades' : c}
              </option>
            ))}
          </select>
        </label>

        <label className="filter">
          <span>Quartos</span>
          <select value={filters.beds} onChange={(e) => update('beds', e.target.value)}>
            {BED_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <label className="filter">
          <span>Faixa de preço</span>
          <select
            value={filters.priceIndex}
            onChange={(e) => update('priceIndex', Number(e.target.value))}
          >
            {priceRange.map((r, i) => (
              <option key={r.label} value={i}>
                {r.label}
              </option>
            ))}
          </select>
        </label>

        <button className="filters__reset" onClick={reset} type="button">
          Limpar filtros
        </button>
      </div>
    </div>
  )
}