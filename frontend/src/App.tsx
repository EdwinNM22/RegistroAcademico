import { Navigate, Route, Routes } from 'react-router-dom'
import { RequireAuth } from './auth/RequireAuth'
import { DashboardAlumno } from './pages/DashboardAlumno'
import { DashboardJefe } from './pages/DashboardJefe'
import { DashboardProfesor } from './pages/DashboardProfesor'
import { Login } from './pages/Login'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard/alumno"
        element={
          <RequireAuth roles={['alumno']}>
            <DashboardAlumno />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/profesor"
        element={
          <RequireAuth roles={['profesor']}>
            <DashboardProfesor />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard/jefe"
        element={
          <RequireAuth roles={['jefe', 'admin']}>
            <DashboardJefe />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
