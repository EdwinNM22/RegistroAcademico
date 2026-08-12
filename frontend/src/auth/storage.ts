const TOKEN_KEY = 'registro_token'
const USER_KEY = 'registro_usuario'

export type RolUsuario = 'alumno' | 'profesor' | 'jefe' | 'admin'

export type AuthUsuario = {
  id: number
  email: string
  nombre: string
  rol: RolUsuario
}

export function guardarAuth(token: string, usuario: AuthUsuario): void {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(usuario))
}

export function obtenerToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function obtenerUsuario(): AuthUsuario | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthUsuario
  } catch {
    return null
  }
}

export function cerrarSesion(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function rutaDashboardPorRol(rol: RolUsuario): string {
  switch (rol) {
    case 'alumno':
      return '/dashboard/alumno'
    case 'profesor':
      return '/dashboard/profesor'
    case 'jefe':
    case 'admin':
      return '/dashboard/jefe'
  }
}
