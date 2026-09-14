import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import './alumno-month-calendar.css'

export type CalendarioEvento = {
  id: string
  fecha: string
  tipo: 'clase' | 'pago'
  titulo: string
  detalle?: string
}

const MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

type DiaCalendario = {
  fecha: string
  dia: number
  esMesActual: boolean
}

function formatearFecha(year: number, month: number, day: number) {
  const mes = String(month + 1).padStart(2, '0')
  const dia = String(day).padStart(2, '0')
  return `${year}-${mes}-${dia}`
}

function crearDiasMes(year: number, month: number): DiaCalendario[] {
  const primerDia = new Date(year, month, 1)
  const ultimoDia = new Date(year, month + 1, 0)
  const inicioSemana = (primerDia.getDay() + 6) % 7
  const dias: DiaCalendario[] = []

  for (let i = inicioSemana - 1; i >= 0; i -= 1) {
    const fecha = new Date(year, month, -i)
    dias.push({
      fecha: formatearFecha(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()),
      dia: fecha.getDate(),
      esMesActual: false,
    })
  }

  for (let dia = 1; dia <= ultimoDia.getDate(); dia += 1) {
    dias.push({
      fecha: formatearFecha(year, month, dia),
      dia,
      esMesActual: true,
    })
  }

  let diaSiguiente = 1
  while (dias.length % 7 !== 0) {
    const fecha = new Date(year, month + 1, diaSiguiente)
    dias.push({
      fecha: formatearFecha(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()),
      dia: fecha.getDate(),
      esMesActual: false,
    })
    diaSiguiente += 1
  }

  return dias
}

type AlumnoMonthCalendarProps = {
  eventos: CalendarioEvento[]
}

export function AlumnoMonthCalendar({ eventos }: AlumnoMonthCalendarProps) {
  const hoy = new Date()
  const [mesVisible, setMesVisible] = useState({
    year: hoy.getFullYear(),
    month: hoy.getMonth(),
  })
  const [diaSeleccionado, setDiaSeleccionado] = useState(
    formatearFecha(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()),
  )

  const dias = useMemo(
    () => crearDiasMes(mesVisible.year, mesVisible.month),
    [mesVisible.year, mesVisible.month],
  )

  const eventosPorFecha = useMemo(() => {
    const mapa = new Map<string, CalendarioEvento[]>()
    for (const evento of eventos) {
      const lista = mapa.get(evento.fecha) ?? []
      lista.push(evento)
      mapa.set(evento.fecha, lista)
    }
    return mapa
  }, [eventos])

  const eventosDia = eventosPorFecha.get(diaSeleccionado) ?? []
  const fechaHoy = formatearFecha(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())

  function cambiarMes(delta: number) {
    const fecha = new Date(mesVisible.year, mesVisible.month + delta, 1)
    setMesVisible({ year: fecha.getFullYear(), month: fecha.getMonth() })
  }

  return (
    <div className="alumno-cal">
      <div className="alumno-cal__toolbar">
        <button
          type="button"
          className="alumno-cal__nav"
          onClick={() => cambiarMes(-1)}
          aria-label="Mes anterior"
        >
          <ChevronLeft size={18} />
        </button>
        <p className="alumno-cal__month">
          {MESES[mesVisible.month]} {mesVisible.year}
        </p>
        <button
          type="button"
          className="alumno-cal__nav"
          onClick={() => cambiarMes(1)}
          aria-label="Mes siguiente"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="alumno-cal__weekdays" aria-hidden>
        {DIAS_SEMANA.map((dia) => (
          <span key={dia} className="alumno-cal__weekday">{dia}</span>
        ))}
      </div>

      <div className="alumno-cal__grid" role="grid" aria-label="Calendario mensual">
        {dias.map((dia) => {
          const eventosDiaCal = eventosPorFecha.get(dia.fecha) ?? []
          const tieneClase = eventosDiaCal.some((e) => e.tipo === 'clase')
          const tienePago = eventosDiaCal.some((e) => e.tipo === 'pago')
          const esHoy = dia.fecha === fechaHoy
          const esSeleccionado = dia.fecha === diaSeleccionado

          return (
            <button
              key={dia.fecha}
              type="button"
              role="gridcell"
              className={[
                'alumno-cal__day',
                !dia.esMesActual && 'alumno-cal__day--outside',
                esHoy && 'alumno-cal__day--today',
                esSeleccionado && 'alumno-cal__day--selected',
                tieneClase && 'alumno-cal__day--clase',
                tienePago && 'alumno-cal__day--pago',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setDiaSeleccionado(dia.fecha)}
              aria-label={`${dia.dia} de ${MESES[mesVisible.month]}`}
              aria-pressed={esSeleccionado}
            >
              <span className="alumno-cal__day-num">{dia.dia}</span>
              {(tieneClase || tienePago) && (
                <span className="alumno-cal__marks" aria-hidden>
                  {tieneClase && <span className="alumno-cal__mark alumno-cal__mark--clase" />}
                  {tienePago && <span className="alumno-cal__mark alumno-cal__mark--pago" />}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="alumno-cal__legend" aria-hidden>
        <span className="alumno-cal__legend-item">
          <span className="alumno-cal__mark alumno-cal__mark--clase" />
          Clase
        </span>
        <span className="alumno-cal__legend-item">
          <span className="alumno-cal__mark alumno-cal__mark--pago" />
          Pago
        </span>
      </div>

      <div className="alumno-cal__events">
        <p className="alumno-cal__events-title">
          {eventosDia.length > 0
            ? `Actividades del ${new Date(`${diaSeleccionado}T12:00:00`).getDate()} de ${MESES[new Date(`${diaSeleccionado}T12:00:00`).getMonth()]}`
            : 'Sin actividades este día'}
        </p>
        {eventosDia.length > 0 && (
          <ul className="alumno-cal__events-list">
            {eventosDia.map((evento) => (
              <li
                key={evento.id}
                className={`alumno-cal__event alumno-cal__event--${evento.tipo}`}
              >
                <span className="alumno-cal__event-type">
                  {evento.tipo === 'clase' ? 'Clase' : 'Pago'}
                </span>
                <div className="alumno-cal__event-body">
                  <span className="alumno-cal__event-title">{evento.titulo}</span>
                  {evento.detalle && (
                    <span className="alumno-cal__event-detail">{evento.detalle}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
