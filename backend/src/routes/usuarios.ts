import type { FastifyInstance } from 'fastify'
import bcrypt from 'bcryptjs'
import { pool } from '../db.js'
import type { RolUsuario } from '../entity/usuario.js'
import { requireRoles } from '../auth/guards.js'

type CrearUsuarioBody = {
  email?: string
  password?: string
  nombre?: string
  rol?: RolUsuario
}

const rolesPermitidos: RolUsuario[] = ['alumno', 'profesor', 'jefe']

export async function usuariosRoutes(app: FastifyInstance) {
  app.post<{ Body: CrearUsuarioBody }>(
    '/usuarios',
    { preHandler: requireRoles('jefe', 'admin') },
    async (request, reply) => {
      const email = request.body.email?.trim().toLowerCase()
      const password = request.body.password
      const nombre = request.body.nombre?.trim()
      const rol = request.body.rol

      if (!email || !password || !nombre || !rol) {
        return reply.status(400).send({
          error: 'nombre, email, password y rol son requeridos',
        })
      }

      if (!rolesPermitidos.includes(rol)) {
        return reply.status(400).send({
          error: 'Rol inválido. Usa alumno, profesor o jefe',
        })
      }

      if (password.length < 6) {
        return reply
          .status(400)
          .send({ error: 'La contraseña debe tener al menos 6 caracteres' })
      }

      const password_hash = await bcrypt.hash(password, 10)

      try {
        const result = await pool.query<{
          id: number
          email: string
          nombre: string
          rol: RolUsuario
          created_at: Date
        }>(
          `INSERT INTO usuarios (email, password_hash, nombre, rol)
           VALUES ($1, $2, $3, $4)
           RETURNING id, email, nombre, rol, created_at`,
          [email, password_hash, nombre, rol],
        )

        return reply.status(201).send({ usuario: result.rows[0] })
      } catch (err: unknown) {
        const code =
          typeof err === 'object' && err && 'code' in err
            ? String((err as { code: unknown }).code)
            : ''
        if (code === '23505') {
          return reply.status(409).send({ error: 'Ese email ya está registrado' })
        }
        throw err
      }
    },
  )
}
