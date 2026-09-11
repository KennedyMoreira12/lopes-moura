import { useMemo, useState } from 'react'
import { calcFinancing, formatBRL } from '../utils'
import './FinancingCalculator.css'

export default function FinancingCalculator({ price, compact }) {
  const [down, setDown] = useState(Math.round((price * 20) / 100))
  const [years, setYears] = useState(20)
  const [annualRate, setAnnualRate] = useState(10)

  const months = years * 12
  const res = useMemo(
    () => calcFinancing({ price, downPayment: down, months, annualRate }),
    [price, down, months, annualRate]
  )

  return (
    <div className={`calc ${compact ? 'calc--compact' : ''}`}>
      <h3 className="calc__title">Simule seu financiamento</h3>
      <p className="calc__hint">
        Estimativa com tabela Price. As condições finais dependem da análise do banco.
      </p>

      <div className="calc__grid">
        <label className="calc__field">
          <span>Valor do imóvel</span>
          <strong>{formatBRL(price)}</strong>
        </label>

        <label className="calc__field">
          <span>Entrada: {formatBRL(down)}</span>
          <input
            type="range"
            min={0}
            max={price}
            step={10000}
            value={down}
            onChange={(e) => setDown(Number(e.target.value))}
          />
        </label>

        <label className="calc__field">
          <span>Prazo: {years} anos</span>
          <input
            type="range"
            min={5}
            max={35}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </label>

        <label className="calc__field">
          <span>Taxa de juros anual: {annualRate}%</span>
          <input
            type="range"
            min={5}
            max={16}
            step={0.5}
            value={annualRate}
            onChange={(e) => setAnnualRate(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="calc__result">
        <div className="calc__result-item">
          <span>Valor financiado</span>
          <strong>{formatBRL(res.financed)}</strong>
        </div>
        <div className="calc__result-item calc__result-item--highlight">
          <span>Parcela mensal estimada</span>
          <strong>{formatBRL(res.installment)}</strong>
        </div>
        <div className="calc__result-item">
          <span>Total pago no prazo</span>
          <strong>{formatBRL(res.total)}</strong>
        </div>
        <div className="calc__result-item">
          <span>Juros totais</span>
          <strong>{formatBRL(res.totalInterest)}</strong>
        </div>
      </div>
    </div>
  )
}