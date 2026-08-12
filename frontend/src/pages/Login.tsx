import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ApiError, apiFetch } from '../auth/api'
import {
  guardarAuth,
  obtenerToken,
  obtenerUsuario,
  rutaDashboardPorRol,
  type AuthUsuario,
} from '../auth/storage'
import './Login.css'

type LoginResponse = {
  token: string
  usuario: AuthUsuario
}

export function Login() {
  const navigate = useNavigate()
  const token = obtenerToken()
  const usuario = obtenerUsuario()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (token && usuario) {
    return <Navigate to={rutaDashboardPorRol(usuario.rol)} replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await apiFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: { email, password },
        auth: false,
      })
      guardarAuth(data.token, data.usuario)
      navigate(rutaDashboardPorRol(data.usuario.rol))
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-backdrop" aria-hidden="true" />
      <main className="login-panel">
        <p className="login-brand">Registro Académico</p>
        <h1>Iniciar sesión</h1>
        <p className="login-sub">
          Ingresa con la cuenta que te asignó jefatura.
        </p>

        <form className="login-form" onSubmit={onSubmit}>
          <label>
            Correo
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@universidad.edu"
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          {error ? <p className="login-error">{error}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </main>
    </div>
  )
}
