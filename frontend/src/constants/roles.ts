import type { RolUsuario } from '../auth/storage'

export const ROL_LABELS: Record<RolUsuario, string> = {
  alumno: 'Alumno',
  profesor: 'Profesor',
  jefe: 'Jefe',
  admin: 'Administrador',
}

export function etiquetaRol(rol: RolUsuario): string {
  return ROL_LABELS[rol]
}
