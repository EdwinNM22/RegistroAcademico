import { type ReactNode } from 'react'
import { ASSETS } from '../../constants/assets'
import './app-navbar.css'

type AppNavbarProps = {
  actions?: ReactNode
}

export function AppNavbar({ actions }: AppNavbarProps) {
  return (
    <header className="app-navbar">
      <img
        src={ASSETS.logoNavbar}
        alt="Universidad Católica de El Salvador"
        className="app-navbar__logo"
      />
      {actions ? <div className="app-navbar__actions">{actions}</div> : null}
    </header>
  )
}
