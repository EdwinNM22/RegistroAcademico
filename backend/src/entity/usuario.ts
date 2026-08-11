export type RolUsuario = 'alumno' | 'profesor' | 'jefe' | 'admin'

export type Usuario = {
  id: number
  email: string
  password_hash: string
  nombre: string
  rol: RolUsuario
  created_at: Date
}
