import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import type { AuthUsuario } from '../../auth/storage'
import { ASSETS } from '../../constants/assets'
import { UserAvatar } from '../ui/UserAvatar'
import './dashboard-sidebar.css'

export type SidebarNavItem = {
  id: string
  label: string
  icon: LucideIcon
  to?: string
  onClick?: () => void
}

type DashboardSidebarProps = {
  usuario: AuthUsuario
  items?: SidebarNavItem[]
  fotoUrl?: string | null
}

export function DashboardSidebar({
  usuario,
  items = [],
  fotoUrl,
}: DashboardSidebarProps) {
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar__brand">
        <img
          src={ASSETS.logoSeal}
          alt="UNICAES"
          className="dashboard-sidebar__logo"
        />
      </div>

      <div className="dashboard-sidebar__profile">
        <UserAvatar nombre={usuario.nombre} fotoUrl={fotoUrl} size="lg" />
        <p className="dashboard-sidebar__name">{usuario.nombre}</p>
      </div>

      <nav className="dashboard-sidebar__nav" aria-label="Menú del panel">
        {items.length > 0 ? (
          <ul className="dashboard-sidebar__list">
            {items.map((item) => {
              const Icon = item.icon
              const content = (
                <>
                  <Icon size={16} aria-hidden />
                  <span className="dashboard-sidebar__label">{item.label}</span>
                </>
              )

              return (
                <li key={item.id}>
                  {item.to ? (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `dashboard-sidebar__item${isActive ? ' dashboard-sidebar__item--active' : ''}`
                      }
                      onClick={item.onClick}
                    >
                      {content}
                    </NavLink>
                  ) : (
                    <button
                      type="button"
                      className="dashboard-sidebar__item"
                      onClick={item.onClick}
                    >
                      {content}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="dashboard-sidebar__placeholder">
            Más opciones próximamente
          </p>
        )}
      </nav>
    </aside>
  )
}
