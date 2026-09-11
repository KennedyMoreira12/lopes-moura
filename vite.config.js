import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { getChatReply } from './api/chat.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.OPENROUTER_API_KEY =
    process.env.OPENROUTER_API_KEY || env.OPENROUTER_API_KEY
  process.env.OPENROUTER_MODEL =
    process.env.OPENROUTER_MODEL || env.OPENROUTER_MODEL

  return {
    base: './',
    plugins: [
      react(),
      {
        name: 'local-chat-api',
        configureServer(server) {
          server.middlewares.use('/api/chat', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Método não permitido' }))
              return
            }

            let body = ''
            req.on('data', (chunk) => {
              body += chunk
            })
            req.on('end', async () => {
              try {
                const { messages } = JSON.parse(body || '{}')
                const reply = await getChatReply(messages)
                const payload = JSON.stringify({ reply })
                res.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) })
                res.end(payload)
              } catch (err) {
                console.error('[/api/chat dev] error:', err.message)
                const status = err.message === 'KEY_NAO_CONFIGURADA' ? 500 : 502
                const payload = JSON.stringify({ error: err.message })
                res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) })
                res.end(payload)
              }
            })
          })
        },
      },
    ],
  }
})
