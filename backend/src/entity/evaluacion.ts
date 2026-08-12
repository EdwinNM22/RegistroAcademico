export type TipoEvaluacion = 'parcial' | 'actividad'

export type Evaluacion = {
  id: number
  periodo_id: number
  orden: number
  nombre: string
  tipo: TipoEvaluacion
  peso: number
  valor: number
  created_at: Date
}
