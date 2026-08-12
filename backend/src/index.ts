import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import fjwt from '@fastify/jwt'
import { checkDatabase } from './db.js'
import { authRoutes } from './routes/auth.js'
import { usuariosRoutes } from './routes/usuarios.js'

const app = Fastify({ logger: true })

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) {
  throw new Error('Falta JWT_SECRET en el archivo .env')
}

await app.register(cors, {
  origin: true,
})

await app.register(fjwt, {
  secret: jwtSecret,
  sign: {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '8h',
  },
})

app.get('/health', async () => {
  const databaseUp = await checkDatabase()
  return {
    ok: true,
    database: databaseUp ? 'up' : 'down',
  }
})

await app.register(authRoutes)
await app.register(usuariosRoutes)

const port = Number(process.env.PORT) || 3000

try {
  await app.listen({ port, host: '0.0.0.0' })
} catch (err) {
  app.log.error(err)
  process.exit(1)
}
