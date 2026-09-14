import { Card, DashboardLayout } from '../components'

export function DashboardProfesor() {
  return (
    <DashboardLayout titulo="Espacio del profesor">
      <Card as="section">
        <h2 className="card__title card__title--left">Mis herramientas</h2>
        <p>
          Vista propia del docente: operar sobre grupos y evaluaciones, no
          matrícula personal.
        </p>
        <ul>
          <li>Grupos / materias asignadas</li>
          <li>Carga y edición de notas</li>
          <li>Registro de asistencias</li>
          <li>Listado de alumnos por materia</li>
        </ul>
      </Card>
    </DashboardLayout>
  )
}
