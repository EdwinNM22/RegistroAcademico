import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { cerrarSesion, obtenerUsuario } from '../../auth/storage'
import { AppNavbar } from './AppNavbar'
import { DashboardSidebar, type SidebarNavItem } from './DashboardSidebar'
import { NavbarUserActions } from './NavbarUserActions'
import { PageBackdrop } from './PageBackdrop'
import './app-page-layout.css'
import './dashboard-layout.css'

type DashboardLayoutProps = {
  titulo?: string
  children: ReactNode
  sidebarItems?: SidebarNavItem[]
  fotoUrl?: string | null
}

export function DashboardLayout({
  titulo,
  children,
  sidebarItems,
  fotoUrl,
}: DashboardLayoutProps) {
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
          usuario ? <NavbarUserActions usuario={usuario} onLogout={salir} /> : null
        }
      />
      <div className="dashboard-layout__body">
        <PageBackdrop gradient="subtle" />
        <div className="dashboard-layout__content">
          {usuario ? (
            <DashboardSidebar
              usuario={usuario}
              items={sidebarItems}
              fotoUrl={fotoUrl}
            />
          ) : null}
          <main
            className={`dashboard-layout__main${titulo ? '' : ' dashboard-layout__main--compact'}`}
          >
            {titulo ? (
              <header className="dashboard-layout__header">
                <h1>{titulo}</h1>
              </header>
            ) : null}
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
