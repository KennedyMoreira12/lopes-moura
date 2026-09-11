import { useEffect, useRef, useState } from 'react'
import './ChatWidget.css'

const GREETING =
  'Olá! Eu sou a assistente virtual do Grupo Lopes & Moura. Posso te ajudar a encontrar o imóvel ideal — sobre compra, venda ou locação. O que você procura?'

const QUICK_REPLIES = [
  'Quais imóveis estão à venda?',
  'Quais imóveis para alugar?',
  'Quero agendar uma visita',
  'Quero vender meu imóvel',
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ role: 'assistant', content: GREETING }])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, loading, open])

  const send = async (text) => {
    const content = (text ?? input).trim()
    if (!content || loading) return

    setInput('')
    setError('')

    const history = [...messages, { role: 'user', content }]
    setMessages(history)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Erro ao responder')
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch (e) {
      setError(
        e.message === 'KEY_NAO_CONFIGURADA'
          ? 'O atendimento automático ainda não foi configurado. Fale com a gente no WhatsApp (38) 99308-3859.'
          : 'Não consegui responder agora. Tente novamente ou fale no WhatsApp (38) 99308-3859.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    send()
  }

  return (
    <>
      <button
        className={`chat__toggle ${open ? 'chat__toggle--hidden' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Abrir atendimento por IA"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z" />
          <path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" />
        </svg>
        <span className="chat__toggle-badge">IA</span>
      </button>

      {open && (
        <div className="chat">
          <div className="chat__header">
            <div className="chat__avatar">LM</div>
            <div className="chat__title">
              <strong>Assistente Lopes &amp; Moura</strong>
              <span>
                <i className="chat__dot" /> Online agora
              </span>
            </div>
            <button className="chat__close" onClick={() => setOpen(false)} aria-label="Fechar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="chat__body">
            {messages.map((m, i) => (
              <div key={i} className={`chat__msg chat__msg--${m.role}`}>
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="chat__msg chat__msg--assistant chat__typing">
                <span /><span /><span />
              </div>
            )}

            {error && <div className="chat__error">{error}</div>}
            <div ref={endRef} />
          </div>

          {messages.length <= 1 && (
            <div className="chat__quick">
              {QUICK_REPLIES.map((q) => (
                <button key={q} onClick={() => send(q)} disabled={loading}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <form className="chat__footer" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva sua mensagem..."
              aria-label="Mensagem"
            />
            <button type="submit" disabled={loading || !input.trim()} aria-label="Enviar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}