import { type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

export function Login() {
  function onSubmit(e: FormEvent) {
    e.preventDefault()
    // La autenticación con JWT se hará en la siguiente etapa
  }

  return (
    <div className="login-page">
      <div className="login-backdrop" aria-hidden="true" />
      <main className="login-panel">
        <p className="login-brand">Registro Académico</p>
        <h1>Iniciar sesión</h1>
        <p className="login-sub">
          Formulario de acceso. El inicio de sesión real con JWT se conectará en
          la siguiente etapa.
        </p>

        <form className="login-form" onSubmit={onSubmit}>
          <label>
            Correo
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="correo@universidad.edu"
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </label>

          <button type="submit">Entrar</button>
        </form>

        <nav className="login-preview" aria-label="Vistas de dashboard">
          <p>Vista previa (sin auth):</p>
          <Link to="/dashboard/alumno">Alumno</Link>
          <Link to="/dashboard/profesor">Profesor</Link>
          <Link to="/dashboard/jefe">Jefe</Link>
        </nav>
      </main>
    </div>
  )
}
