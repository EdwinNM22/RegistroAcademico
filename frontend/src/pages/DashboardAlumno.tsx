import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { DashboardLayout } from '../components'
import { ALUMNO_MENU_ITEMS } from '../constants/alumnoMenu'
import { AlumnoPanel } from './alumno/AlumnoPanel'
import { AlumnoSection } from './alumno/AlumnoSection'

const SECTION_TITLES: Record<string, string> = {
  inscripcion: 'Inscripción',
  preinscripcion: 'Preinscripción',
  notas: 'Notas',
  expediente: 'Expediente',
  pensum: 'Pensum',
  horarios: 'Horarios',
  tramites: 'Trámites',
  pagos: 'Pagos',
}

function useAlumnoTitulo(): string | undefined {
  const { pathname } = useLocation()
  const section = pathname.split('/').pop() ?? ''

  if (section === 'alumno') {
    return undefined
  }

  return SECTION_TITLES[section]
}

export function DashboardAlumno() {
  const titulo = useAlumnoTitulo()

  return (
    <DashboardLayout titulo={titulo} sidebarItems={ALUMNO_MENU_ITEMS}>
      <Routes>
        <Route index element={<AlumnoPanel />} />
        <Route
          path="inscripcion"
          element={<AlumnoSection titulo="Inscripción" />}
        />
        <Route
          path="preinscripcion"
          element={<AlumnoSection titulo="Preinscripción" />}
        />
        <Route path="notas" element={<AlumnoSection titulo="Notas" />} />
        <Route
          path="expediente"
          element={<AlumnoSection titulo="Expediente" />}
        />
        <Route path="pensum" element={<AlumnoSection titulo="Pensum" />} />
        <Route path="horarios" element={<AlumnoSection titulo="Horarios" />} />
        <Route path="tramites" element={<AlumnoSection titulo="Trámites" />} />
        <Route path="pagos" element={<AlumnoSection titulo="Pagos" />} />
        <Route path="*" element={<Navigate to="/dashboard/alumno" replace />} />
      </Routes>
    </DashboardLayout>
  )
}
