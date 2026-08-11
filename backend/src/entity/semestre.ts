export type CicloSemestre = 'I' | 'II'

export type Semestre = {
  id: number
  anio: number
  ciclo: CicloSemestre
  fecha_inicio: Date | null
  fecha_fin: Date | null
}
