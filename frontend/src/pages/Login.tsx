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
import {
  AppPageLayout,
  BrandHeader,
  Button,
  Card,
  FormField,
  FormMessage,
  FormStack,
  PageHero,
  PasswordInput,
  SelectInput,
  TextInput,
} from '../components'

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
    <AppPageLayout
      hero={
        <PageHero
          eyebrow="Universidad Católica de El Salvador"
          title="Registro Académico"
          description="Accede a tu información académica, gestiona evaluaciones y administra el proceso formativo de la comunidad UNICAES."
          quote="«La Ciencia sin Moral es Vana»"
          items={[
            'Consulta de notas y promedios',
            'Registro de asistencias',
            'Gestión de inscripciones',
          ]}
        />
      }
    >
      <Card variant="narrow">
        <BrandHeader />
        <h1 className="card__title">Iniciar sesión</h1>

        <form onSubmit={onSubmit}>
          <FormStack>
            <FormField label="Correo">
              <TextInput
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@universidad.edu"
              />
            </FormField>

            <FormField label="Contraseña">
              <PasswordInput
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </FormField>

            <FormMessage>{error}</FormMessage>

            <Button type="submit" variant="primary" block disabled={loading}>
              {loading ? 'Entrando…' : 'Entrar'}
            </Button>

            {import.meta.env.DEV ? (
              <div>
                {!devAbierto ? (
                  <Button
                    type="button"
                    variant="ghost"
                    block
                    onClick={() => setDevAbierto(true)}
                  >
                    Cuenta de prueba
                  </Button>
                ) : (
                  <FormField label="Cuenta de prueba">
                    <SelectInput
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
                    </SelectInput>
                  </FormField>
                )}
              </div>
            ) : null}
          </FormStack>
        </form>
      </Card>
    </AppPageLayout>
  )
}
