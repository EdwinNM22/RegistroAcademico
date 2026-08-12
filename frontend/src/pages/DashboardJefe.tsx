import { DashboardShell } from '../components/DashboardShell'

export function DashboardJefe() {
  return (
    <DashboardShell titulo="Espacio de jefatura">
      <section className="dash-section">
        <h2>Herramientas de supervisión</h2>
        <p>
          Vista de jefatura: panorama del área, no el día a día de un solo grupo
          o de un alumno.
        </p>
        <ul className="dash-list">
          <li>Materias y docentes del área</li>
          <li>Indicadores del semestre</li>
          <li>Revisión de carga académica</li>
          <li>Reportes y seguimiento</li>
        </ul>
      </section>
    </DashboardShell>
  )
}
