import { User } from 'lucide-react'
import './user-avatar.css'

type UserAvatarProps = {
  nombre: string
  fotoUrl?: string | null
  size?: 'lg' | 'md'
}

function inicialesDeNombre(nombre: string): string {
  const partes = nombre.trim().split(/\s+/).filter(Boolean)
  if (partes.length === 0) return '?'
  if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase()
  return `${partes[0][0]}${partes[1][0]}`.toUpperCase()
}

export function UserAvatar({ nombre, fotoUrl, size = 'lg' }: UserAvatarProps) {
  const className = `user-avatar user-avatar--${size}`

  if (fotoUrl) {
    return (
      <img
        src={fotoUrl}
        alt={nombre}
        className={`${className} user-avatar--image`}
      />
    )
  }

  const iniciales = inicialesDeNombre(nombre)

  if (iniciales === '?') {
    return (
      <div className={className} aria-label={nombre}>
        <User className="user-avatar__icon" aria-hidden />
      </div>
    )
  }

  return (
    <div className={className} aria-label={nombre}>
      <span className="user-avatar__initials">{iniciales}</span>
    </div>
  )
}
