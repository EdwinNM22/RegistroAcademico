import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  ClipboardPen,
  CreditCard,
  FolderOpen,
  NotebookText,
  Stamp,
} from 'lucide-react'

export type AlumnoMenuItem = {
  id: string
  label: string
  icon: LucideIcon
  to: string
}

export const ALUMNO_MENU_ITEMS: AlumnoMenuItem[] = [
  {
    id: 'inscripcion',
    label: 'Inscripción',
    icon: ClipboardList,
    to: '/dashboard/alumno/inscripcion',
  },
  {
    id: 'preinscripcion',
    label: 'Preinscripción',
    icon: ClipboardPen,
    to: '/dashboard/alumno/preinscripcion',
  },
  {
    id: 'notas',
    label: 'Notas',
    icon: NotebookText,
    to: '/dashboard/alumno/notas',
  },
  {
    id: 'expediente',
    label: 'Expediente',
    icon: FolderOpen,
    to: '/dashboard/alumno/expediente',
  },
  {
    id: 'pensum',
    label: 'Pensum',
    icon: BookOpen,
    to: '/dashboard/alumno/pensum',
  },
  {
    id: 'horarios',
    label: 'Horarios',
    icon: CalendarDays,
    to: '/dashboard/alumno/horarios',
  },
  {
    id: 'tramites',
    label: 'Trámites',
    icon: Stamp,
    to: '/dashboard/alumno/tramites',
  },
  {
    id: 'pagos',
    label: 'Pagos',
    icon: CreditCard,
    to: '/dashboard/alumno/pagos',
  },
]
