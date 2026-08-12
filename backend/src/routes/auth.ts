import type { FastifyInstance } from 'fastify'
import bcrypt from 'bcryptjs'
import { pool } from '../db.js'
import type { RolUsuario } from '../entity/usuario.js'
import { authenticate } from '../auth/guards.js'

type LoginBody = {
  email?: string
  password?: string
}

export async function authRoutes(app: FastifyInstance) {
  app.post<{ Body: LoginBody }>('/auth/login', async (request, reply) => {
    const email = request.body.email?.trim().toLowerCase()
    const password = request.body.password

    if (!email || !password) {
      return reply.status(400).send({ error: 'Email y contraseña son requeridos' })
    }

    const result = await pool.query<{
      id: number
      email: string
      nombre: string
      rol: RolUsuario
      password_hash: string
    }>(
      `SELECT id, email, nombre, rol, password_hash
       FROM usuarios
       WHERE email = $1`,
      [email],
    )

    const usuario = result.rows[0]
    if (!usuario) {
      return reply.status(401).send({ error: 'Credenciales inválidas' })
    }

    const ok = await bcrypt.compare(password, usuario.password_hash)
    if (!ok) {
      return reply.status(401).send({ error: 'Credenciales inválidas' })
    }

    const payload = {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      rol: usuario.rol,
    }

    const token = await reply.jwtSign(payload)

    return { token, usuario: payload }
  })

  app.get('/auth/me', { preHandler: authenticate }, async (request) => {
    return { usuario: request.user }
  })
}
