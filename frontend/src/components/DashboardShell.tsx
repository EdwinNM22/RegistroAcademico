import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import './dashboard-shell.css'

type Props = {
  titulo: string
  children: ReactNode
}

export function DashboardShell({ titulo, children }: Props) {
  const navigate = useNavigate()

  return (
    <div className="dash-page">
      <header className="dash-header">
        <div>
          <p className="dash-brand">Registro Académico</p>
          <h1>{titulo}</h1>
        </div>
        <div className="dash-user">
          <button type="button" onClick={() => navigate('/login')}>
            Ir al login
          </button>
        </div>
      </header>
      <main className="dash-main">{children}</main>
    </div>
  )
}
