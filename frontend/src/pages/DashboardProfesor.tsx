import { DashboardShell } from '../components/DashboardShell'

export function DashboardProfesor() {
  return (
    <DashboardShell titulo="Espacio del profesor">
      <section className="dash-section">
        <h2>Mis herramientas</h2>
        <p>
          Vista propia del docente: operar sobre grupos y evaluaciones, no
          matrícula personal.
        </p>
        <ul className="dash-list">
          <li>Grupos / materias asignadas</li>
          <li>Carga y edición de notas</li>
          <li>Registro de asistencias</li>
          <li>Listado de alumnos por materia</li>
        </ul>
      </section>
    </DashboardShell>
  )
}
