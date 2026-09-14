import { Card } from '../../components'

type AlumnoSectionProps = {
  titulo: string
}

export function AlumnoSection({ titulo }: AlumnoSectionProps) {
  return (
    <Card as="section">
      <h2 className="card__title card__title--left">{titulo}</h2>
      <p>Contenido en desarrollo.</p>
    </Card>
  )
}
