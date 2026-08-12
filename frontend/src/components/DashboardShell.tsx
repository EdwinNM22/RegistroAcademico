import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { cerrarSesion, obtenerUsuario } from '../auth/storage'
import './dashboard-shell.css'

type Props = {
  titulo: string
  children: ReactNode
}

export function DashboardShell({ titulo, children }: Props) {
  const navigate = useNavigate()
  const usuario = obtenerUsuario()

  function salir() {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <div className="dash-page">
      <header className="dash-header">
        <div>
          <p className="dash-brand">Registro Académico</p>
          <h1>{titulo}</h1>
        </div>
        <div className="dash-user">
          {usuario ? (
            <div>
              <strong>{usuario.nombre}</strong>
              <span>{usuario.email}</span>
              <span className="dash-rol">{usuario.rol}</span>
            </div>
          ) : null}
          <button type="button" onClick={salir}>
            Cerrar sesión
          </button>
        </div>
      </header>
      <main className="dash-main">{children}</main>
    </div>
  )
}
