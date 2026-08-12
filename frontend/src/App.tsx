import { Navigate, Route, Routes } from 'react-router-dom'
import { DashboardAlumno } from './pages/DashboardAlumno'
import { DashboardJefe } from './pages/DashboardJefe'
import { DashboardProfesor } from './pages/DashboardProfesor'
import { Login } from './pages/Login'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/alumno" element={<DashboardAlumno />} />
      <Route path="/dashboard/profesor" element={<DashboardProfesor />} />
      <Route path="/dashboard/jefe" element={<DashboardJefe />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
