import 'dotenv/config'
import Fastify from 'fastify'
import { checkDatabase } from './db.js'

const app = Fastify({ logger: true })

app.get('/health', async () => {
  const databaseUp = await checkDatabase()
  return {
    ok: true,
    database: databaseUp ? 'up' : 'down',
  }
})

const port = Number(process.env.PORT) || 3000

try {
  await app.listen({ port, host: '0.0.0.0' })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
