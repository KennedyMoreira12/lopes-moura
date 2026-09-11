import { properties, formatPrice } from '../src/data/properties.js'

const WHATSAPP = '(38) 99308-3859'

function getModel() {
  return process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini'
}

function buildSystemPrompt() {
  const listing = properties
    .map(
      (p) =>
        `- ${p.title} | ${p.status} | ${p.type} | ${p.city} | ${formatPrice(p)} | Área: ${p.area} m² | Quartos: ${p.beds} | Banheiros: ${p.baths} | Vagas: ${p.garage} | ${p.description}`
    )
    .join('\n')

  return `Você é o atendente virtual oficial do "Grupo LOPES & MOURA Empreendimentos e Imobiliária".

Seu trabalho é conversar com visitantes do site, apresentar os imóveis do catálogo, tirar dúvidas sobre compra, venda e locação, e gerar interesse para agendar visitas.

CATÁLOGO DE IMÓVEIS DISPONÍVEIS:
${listing}

REGRAS DE ATENDIMENTO:
- Responda SEMPRE em português do Brasil, tom simpático e profissional.
- Quando o cliente pedir imóveis por tipo (venda/locação), cidade ou preço, filtre o catálogo acima e apresente as opções com preço e principais características.
- Combine com a faixa de preço: imóvel popular, médio ou alto padrão.
- Quando o cliente demonstrar interesse real ou quiser visitar um imóvel, diga que o WhatsApp da imobiliária é ${WHATSAPP} e peça o nome e o melhor horário para o corretor entrar em contato.
- Se não houver imóvel adequado, sugira o mais próximo e ofereça anotar a procura para avisar quando surgir algo.
- Se o cliente quiser vender/alugar o próprio imóvel, convide a falar no WhatsApp para avaliação gratuita (${WHATSAPP}) e diga que existe uma página "Venda seu imóvel" no site.
- Nunca invente imóveis, preços, cidades ou dados fora do catálogo.
- Prefira respostas curtas (3 a 6 frases), com no máximo 3 imóveis por resposta para não cansar o leitor.`
}

export async function getChatReply(messages) {
  const apiKey = process.env.OPENROUTER_API_KEY

  const cleanMessages = (Array.isArray(messages) ? messages : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.content)
    .slice(-12)
    .map((m) => ({
      role: m.role,
      content: String(m.content).slice(0, 2000),
    }))

  if (!cleanMessages.length || !cleanMessages[cleanMessages.length - 1].content.trim()) {
    throw new Error('Mensagem vazia')
  }
  if (!apiKey) {
    throw new Error('KEY_NAO_CONFIGURADA')
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: getModel(),
      temperature: 0.6,
      messages: [{ role: 'system', content: buildSystemPrompt() }, ...cleanMessages],
    }),
  })

  const data = await response.json()
  if (!response.ok) {
    console.error('OpenRouter error:', JSON.stringify(data))
    throw new Error('Falha ao consultar a IA')
  }

  const reply = data?.choices?.[0]?.message?.content
  if (!reply) {
    throw new Error('Resposta vazia da IA')
  }
  return reply
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { messages = [] } = req.body || {}

  try {
    const reply = await getChatReply(messages)
    return res.json({ reply })
  } catch (err) {
    const code = err.message === 'KEY_NAO_CONFIGURADA' ? 500 : 502
    return res.status(code).json({ error: err.message })
  }
}