import { NavLink } from 'react-router-dom'
import { Card } from '../../components'
import { AlumnoMonthCalendar, type CalendarioEvento } from './AlumnoMonthCalendar'
import './alumno-panel-widgets.css'

const EVENTOS_CALENDARIO: CalendarioEvento[] = [
  {
    id: 'c1',
    fecha: '2026-09-14',
    tipo: 'clase',
    titulo: 'Cálculo I',
    detalle: '08:00',
  },
  {
    id: 'c2',
    fecha: '2026-09-14',
    tipo: 'clase',
    titulo: 'Programación II',
    detalle: '10:00',
  },
  {
    id: 'c3',
    fecha: '2026-09-15',
    tipo: 'clase',
    titulo: 'Ética profesional',
    detalle: '14:00',
  },
  {
    id: 'c4',
    fecha: '2026-09-17',
    tipo: 'clase',
    titulo: 'Cálculo I',
    detalle: '08:00',
  },
  {
    id: 'c5',
    fecha: '2026-09-22',
    tipo: 'clase',
    titulo: 'Programación II',
    detalle: '10:00',
  },
  {
    id: 'p1',
    fecha: '2026-09-15',
    tipo: 'pago',
    titulo: 'Mensualidad octubre',
    detalle: '$150.00',
  },
  {
    id: 'p2',
    fecha: '2026-09-22',
    tipo: 'pago',
    titulo: 'Laboratorio programación',
    detalle: '$35.00',
  },
  {
    id: 'p3',
    fecha: '2026-09-30',
    tipo: 'pago',
    titulo: 'Mensualidad noviembre',
    detalle: '$150.00',
  },
]

const NOTAS_SEMESTRE = [
  {
    id: '1',
    materia: 'Cálculo I',
    periodo1: '8.5',
    periodo2: '9.0',
    periodo3: '—',
    complementario: '—',
    notaFinal: '8.8',
    asistencia: '94%',
  },
  {
    id: '2',
    materia: 'Programación II',
    periodo1: '9.0',
    periodo2: '8.8',
    periodo3: '—',
    complementario: '—',
    notaFinal: '8.9',
    asistencia: '100%',
  },
  {
    id: '3',
    materia: 'Ética profesional',
    periodo1: '7.5',
    periodo2: '8.0',
    periodo3: '—',
    complementario: '8.2',
    notaFinal: '7.8',
    asistencia: '88%',
  },
  {
    id: '4',
    materia: 'Bases de datos',
    periodo1: '8.2',
    periodo2: '—',
    periodo3: '—',
    complementario: '—',
    notaFinal: '—',
    asistencia: '91%',
  },
]

export function AlumnoCalendarWidget() {
  return (
    <Card as="section" className="alumno-widget alumno-widget--calendar">
      <header className="alumno-widget__header">
        <h2 className="alumno-widget__title">Calendario</h2>
        <div className="alumno-widget__links">
          <NavLink to="/dashboard/alumno/horarios" className="alumno-widget__link">
            Horarios
          </NavLink>
          <NavLink to="/dashboard/alumno/pagos" className="alumno-widget__link">
            Pagos
          </NavLink>
        </div>
      </header>
      <AlumnoMonthCalendar eventos={EVENTOS_CALENDARIO} />
    </Card>
  )
}

export function AlumnoNotasWidget() {
  return (
    <Card as="section" className="alumno-widget alumno-widget--notas">
      <header className="alumno-widget__header">
        <h2 className="alumno-widget__title">Notas del semestre</h2>
        <NavLink to="/dashboard/alumno/notas" className="alumno-widget__link">
          Ver todas
        </NavLink>
      </header>
      <div className="alumno-notas-table-wrap">
        <table className="alumno-notas-table">
          <thead>
            <tr>
              <th scope="col">Materia</th>
              <th scope="col">P. 1</th>
              <th scope="col">P. 2</th>
              <th scope="col">P. 3</th>
              <th scope="col">Comple</th>
              <th scope="col">Final</th>
              <th scope="col">Asist.</th>
            </tr>
          </thead>
          <tbody>
            {NOTAS_SEMESTRE.map((fila) => (
              <tr key={fila.id}>
                <th scope="row">{fila.materia}</th>
                <td>{fila.periodo1}</td>
                <td>{fila.periodo2}</td>
                <td>{fila.periodo3}</td>
                <td>{fila.complementario}</td>
                <td>{fila.notaFinal}</td>
                <td>{fila.asistencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
