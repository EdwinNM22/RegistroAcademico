import { type FormEvent, useState } from 'react'
import { ApiError, apiFetch } from '../auth/api'
import type { RolUsuario } from '../auth/storage'
import { DashboardShell } from '../components/DashboardShell'
import './DashboardJefe.css'

type CrearUsuarioResponse = {
  usuario: {
    id: number
    email: string
    nombre: string
    rol: RolUsuario
  }
}

const rolesCreables: { value: Exclude<RolUsuario, 'admin'>; label: string }[] = [
  { value: 'alumno', label: 'Alumno' },
  { value: 'profesor', label: 'Profesor' },
  { value: 'jefe', label: 'Jefe' },
]

export function DashboardJefe() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState<Exclude<RolUsuario, 'admin'>>('alumno')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setMensaje('')
    setError('')
    setLoading(true)

    try {
      const data = await apiFetch<CrearUsuarioResponse>('/usuarios', {
        method: 'POST',
        body: { nombre, email, password, rol },
      })
      setMensaje(
        `Usuario creado: ${data.usuario.nombre} (${data.usuario.rol}) — ${data.usuario.email}`,
      )
      setNombre('')
      setEmail('')
      setPassword('')
      setRol('alumno')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'No se pudo crear el usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardShell titulo="Espacio de jefatura">
      <section className="dash-section">
        <h2>Crear usuario</h2>
        <p>
          Solo jefatura puede dar de alta alumnos, profesores u otros jefes.
        </p>

        <form className="jefe-form" onSubmit={onSubmit}>
          <label>
            Nombre
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>

          <label>
            Correo
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Contraseña temporal
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label>
            Rol
            <select
              value={rol}
              onChange={(e) =>
                setRol(e.target.value as Exclude<RolUsuario, 'admin'>)
              }
            >
              {rolesCreables.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>

          {error ? <p className="jefe-error">{error}</p> : null}
          {mensaje ? <p className="jefe-ok">{mensaje}</p> : null}

          <button type="submit" disabled={loading}>
            {loading ? 'Creando…' : 'Crear usuario'}
          </button>
        </form>
      </section>
    </DashboardShell>
  )
}
