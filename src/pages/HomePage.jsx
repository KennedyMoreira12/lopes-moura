import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import PropertyGrid from '../components/PropertyGrid'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import FinancingCalculator from '../components/FinancingCalculator'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import { properties } from '../data/properties'
import usePageTitle from '../hooks/usePageTitle'

export default function HomePage() {
  usePageTitle('Lopes & Moura | Empreendimentos e Imobiliária')
  const featured = properties.filter((p) => p.featured)

  return (
    <>
      <Hero />

      <section className="properties" id="imoveis">
        <div className="section-header">
          <p className="section-eyebrow">Imóveis em destaque</p>
          <h2 className="section-title">As melhores oportunidades</h2>
          <p className="section-subtitle">
            Uma seleção especial preparada para você. Agende uma visita ou fale
            com nosso atendimento.
          </p>
        </div>

        <PropertyGrid items={featured} />

        <div className="cta-center">
          <Link to="/imoveis" className="btn btn--primary">
            Ver todos os imóveis
          </Link>
          <Link to="/venda" className="btn btn--ghost btn--darkghost">
            Vender meu imóvel
          </Link>
        </div>
      </section>

      <About />
      <Testimonials />

      <section className="simulator" id="simulador">
        <div className="simulator__inner">
          <div className="section-header">
            <p className="section-eyebrow">Financiamento</p>
            <h2 className="section-title">Simule seu financiamento</h2>
            <p className="section-subtitle">
              Estime a parcela mensal com entrada, prazo e taxa. Depois é só
              falar com a gente para encontrar as melhores condições.
            </p>
          </div>
          <FinancingCalculator price={1000000} compact />
        </div>
      </section>

      <FAQ />
      <Contact />
    </>
  )
}