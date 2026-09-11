import { useState } from 'react'
import { faqs } from '../data/faq'
import './FAQ.css'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="faq" id="faq">
      <div className="section-header">
        <p className="section-eyebrow">Perguntas frequentes</p>
        <h2 className="section-title">Dúvidas comuns</h2>
        <p className="section-subtitle">
          Separamos as respostas para facilitar sua decisão.
        </p>
      </div>

      <div className="faq__list">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div className={`faq__item ${isOpen ? 'faq__item--open' : ''}`} key={item.question}>
              <button
                className="faq__question"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div className="faq__answer">
                <p>{item.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}