import { DashboardShell } from '../components/DashboardShell'

export function DashboardAlumno() {
  return (
    <DashboardShell titulo="Espacio del estudiante">
      <section className="dash-section">
        <h2>Mis herramientas</h2>
        <p>
          Vista propia del alumno: consulta académica personal, no gestión de
          terceros.
        </p>
        <ul className="dash-list">
          <li>Inscripción a materias</li>
          <li>Consulta de notas y promedio</li>
          <li>Asistencias</li>
          <li>Estado de pagos</li>
          <li>Horario del semestre</li>
        </ul>
      </section>
    </DashboardShell>
  )
}
