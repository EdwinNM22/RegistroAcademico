export type EstadoAsistencia = 'presente' | 'ausente' | 'tarde' | 'justificada'

export type Asistencia = {
  id: number
  inscripcion_id: number
  fecha: Date
  estado: EstadoAsistencia
  created_at: Date
}
