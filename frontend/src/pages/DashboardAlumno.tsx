import { Card, DashboardLayout } from '../components'

export function DashboardAlumno() {
  return (
    <DashboardLayout titulo="Espacio del estudiante">
      <Card as="section">
        <h2 className="card__title card__title--left">Mis herramientas</h2>
        <p>
          Vista propia del alumno: consulta académica personal, no gestión de
          terceros.
        </p>
      </Card>
    </DashboardLayout>
  )
}
