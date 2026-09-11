import './About.css'

const VALUES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5v4.5l3 2" />
      </svg>
    ),
    title: 'Transparência',
    text: 'Negociações claras, contratos seguros e acompanhamento completo em cada fase.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" />
        <path d="M9.5 12l1.8 1.8 3.2-3.6" />
      </svg>
    ),
    title: 'Segurança jurídica',
    text: 'Análise documental completa para você comprar, vender ou alugar sem preocupações.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    title: 'Atendimento personalizado',
    text: 'Especialistas que ouvem suas necessidades e encontram o imóvel ideal para você.',
  },
]

export default function About() {
  return (
    <section className="about" id="sobre">
      <div className="about__container">
        <div className="section-header">
          <p className="section-eyebrow">Quem somos</p>
          <h2 className="section-title">O Grupo Lopes &amp; Moura</h2>
        </div>

        <div className="about__grid">
          <div className="about__text">
            <h3 className="about__heading">
              Empreendimentos e imobiliária com uma única missão: realizar o seu.
            </h3>
            <p>
              Há mais de 15 anos, unimos quem busca um imóvel a quem deseja
              realizar bons negócios. Somos especializados em compra, venda e
              locação de imóveis residenciais e comerciais, além de novos
              empreendimentos.
            </p>
            <p>
              Atuamos com inteligência de mercado e capricho em cada detalhe —
              da avaliação do imóvel à entrega das chaves. Aqui, você encontra
              confiança para investir e tranquilidade para escolher.
            </p>
            <div className="about__features">
              <span>Empreendimentos</span>
              <span>Compra e venda</span>
              <span>Locação</span>
              <span>Avaliação</span>
              <span>Administração</span>
              <span>Consultoria</span>
            </div>
          </div>

          <div className="about__values">
            {VALUES.map((v) => (
              <div className="value" key={v.title}>
                <span className="value__icon">{v.icon}</span>
                <div>
                  <h4>{v.title}</h4>
                  <p>{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}