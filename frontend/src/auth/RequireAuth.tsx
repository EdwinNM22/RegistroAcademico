import { type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import {
  obtenerToken,
  obtenerUsuario,
  rutaDashboardPorRol,
  type RolUsuario,
} from './storage'

type Props = {
  roles: RolUsuario[]
  children: ReactNode
}

export function RequireAuth({ roles, children }: Props) {
  const location = useLocation()
  const token = obtenerToken()
  const usuario = obtenerUsuario()

  if (!token || !usuario) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (!roles.includes(usuario.rol)) {
    return <Navigate to={rutaDashboardPorRol(usuario.rol)} replace />
  }

  return children
}
