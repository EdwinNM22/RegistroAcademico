import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { cerrarSesion, obtenerUsuario } from '../../auth/storage'
import { AppNavbar } from './AppNavbar'
import { PageBackdrop } from './PageBackdrop'
import { Button } from '../ui/Button'
import './app-page-layout.css'
import './dashboard-layout.css'

type DashboardLayoutProps = {
  titulo: string
  children: ReactNode
}

export function DashboardLayout({ titulo, children }: DashboardLayoutProps) {
  const navigate = useNavigate()
  const usuario = obtenerUsuario()

  function salir() {
    cerrarSesion()
    navigate('/login')
  }

  return (
    <div className="app-page-layout">
      <AppNavbar
        actions={
          <div className="dashboard-layout__user">
            {usuario ? (
              <div className="dashboard-layout__user-info">
                <strong>{usuario.nombre}</strong>
                <span>{usuario.email}</span>
                <span className="dashboard-layout__rol">{usuario.rol}</span>
              </div>
            ) : null}
            <Button variant="secondary" size="sm" onClick={salir}>
              Cerrar sesión
            </Button>
          </div>
        }
      />
      <div className="dashboard-layout__body">
        <PageBackdrop gradient="subtle" />
        <main className="dashboard-layout__main">
          <header className="dashboard-layout__header">
            <h1>{titulo}</h1>
          </header>
          {children}
        </main>
      </div>
    </div>
  )
}
