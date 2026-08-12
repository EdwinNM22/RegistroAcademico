import type { FastifyReply, FastifyRequest } from 'fastify'
import type { RolUsuario } from '../entity/usuario.js'

export type JwtUser = {
  id: number
  email: string
  nombre: string
  rol: RolUsuario
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JwtUser
    user: JwtUser
  }
}

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify()
  } catch {
    return reply.status(401).send({ error: 'No autorizado' })
  }
}

export function requireRoles(...roles: RolUsuario[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    await authenticate(request, reply)
    if (reply.sent) return

    if (!roles.includes(request.user.rol)) {
      return reply.status(403).send({ error: 'No tienes permiso' })
    }
  }
}
