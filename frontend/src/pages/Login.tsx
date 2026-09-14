import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { apiFetch, ApiError } from '../auth/api'
import { DEV_USUARIOS } from '../auth/devUsers'
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
  const [devAbierto, setDevAbierto] = useState(false)
  const [mostrarPassword, setMostrarPassword] = useState(false)

  if (token && usuario) {
    return <Navigate to={rutaDashboardPorRol(usuario.rol)} replace />
  }

  function rellenarUsuario(devEmail: string, devPassword: string) {
    setEmail(devEmail)
    setPassword(devPassword)
    setError('')
  }

  function onDevSelect(rol: string) {
    const devUsuario = DEV_USUARIOS.find((u) => u.rol === rol)
    if (!devUsuario) return

    rellenarUsuario(devUsuario.email, devUsuario.password)
    setDevAbierto(false)
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
      <header className="login-navbar">
        <img
          src="/images/logo-unicaes.png"
          alt="Universidad Católica de El Salvador"
          className="login-navbar-logo"
        />
      </header>

      <div className="login-body">
        <div className="login-backdrop" aria-hidden="true" />

        <aside className="login-hero">
          <p className="login-hero-eyebrow">Universidad Católica de El Salvador</p>
          <h2 className="login-hero-title">Registro Académico</h2>
          <p className="login-hero-text">
            Accede a tu información académica, gestiona evaluaciones y
            administra el proceso formativo de la comunidad UNICAES.
          </p>
          <blockquote className="login-hero-quote">
            «La Ciencia sin Moral es Vana»
          </blockquote>
          <ul className="login-hero-list">
            <li>Consulta de notas y promedios</li>
            <li>Registro de asistencias</li>
            <li>Gestión de inscripciones</li>
          </ul>
        </aside>

        <main className="login-panel">
          <div className="login-panel-brand">
            <img
              src="/images/unicaes-logo.png"
              alt="UNICAES"
              className="login-panel-logo"
            />
            <div className="login-panel-brand-text">
              <p className="login-brand">Registro Académico</p>
              <p className="login-brand-institution">
                Universidad Católica de El Salvador
              </p>
              <p className="login-brand-sede">Sede: Santa Ana</p>
            </div>
          </div>
          <h1>Iniciar sesión</h1>

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
            <div className="login-password-field">
              <input
                type={mostrarPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="login-password-input"
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setMostrarPassword((visible) => !visible)}
                aria-label={
                  mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                }
              >
                {mostrarPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <path d="M1 1l22 22" />
                    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {error ? <p className="login-error">{error}</p> : null}

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>

          {import.meta.env.DEV ? (
            <div className="login-dev">
              {!devAbierto ? (
                <button
                  type="button"
                  className="login-dev-toggle"
                  onClick={() => setDevAbierto(true)}
                >
                  Cuenta de prueba
                </button>
              ) : (
                <label className="login-dev-select">
                  <span>Cuenta de prueba</span>
                  <select
                    autoFocus
                    defaultValue=""
                    onChange={(e) => onDevSelect(e.target.value)}
                    onBlur={() => setDevAbierto(false)}
                  >
                    <option value="" disabled>
                      Elegir rol…
                    </option>
                    {DEV_USUARIOS.map((devUsuario) => (
                      <option key={devUsuario.rol} value={devUsuario.rol}>
                        {devUsuario.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
          ) : null}
          </form>
        </main>
      </div>
    </div>
  )
}
