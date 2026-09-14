import type { RolUsuario } from './storage'

export type DevUsuario = {
  rol: RolUsuario
  label: string
  email: string
  password: string
}

export const DEV_USUARIOS: DevUsuario[] = [
  {
    rol: 'alumno',
    label: 'Alumno',
    email: 'alumno@registro.local',
    password: 'alumno123',
  },
  {
    rol: 'profesor',
    label: 'Profesor',
    email: 'profesor@registro.local',
    password: 'profesor123',
  },
  {
    rol: 'jefe',
    label: 'Jefe',
    email: 'jefe@registro.local',
    password: 'jefe123',
  },
  {
    rol: 'admin',
    label: 'Admin',
    email: 'admin@registro.local',
    password: 'admin123',
  },
]

export const DEV_USUARIO_INICIAL = DEV_USUARIOS.find((u) => u.rol === 'jefe')!
