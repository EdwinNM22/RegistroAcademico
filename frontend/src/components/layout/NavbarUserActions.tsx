import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown, LogOut } from 'lucide-react'
import type { AuthUsuario } from '../../auth/storage'
import './navbar-user-actions.css'

type NavbarUserActionsProps = {
  usuario: AuthUsuario
  onLogout: () => void
}

export function NavbarUserActions({ usuario, onLogout }: NavbarUserActionsProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="navbar-user-menu__trigger">
        <span className="navbar-user-menu__name">{usuario.nombre}</span>
        <ChevronDown className="navbar-user-menu__chevron" size={16} aria-hidden />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="navbar-user-menu__panel"
          sideOffset={8}
          align="end"
        >
          <div className="navbar-user-menu__header">
            <p className="navbar-user-menu__header-name">{usuario.nombre}</p>
            <p className="navbar-user-menu__header-email">{usuario.email}</p>
          </div>

          <DropdownMenu.Item
            className="navbar-user-menu__logout"
            onSelect={onLogout}
          >
            <LogOut size={16} aria-hidden />
            Cerrar sesión
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
