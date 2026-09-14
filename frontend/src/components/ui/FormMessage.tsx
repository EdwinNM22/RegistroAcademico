import './form-message.css'

type FormMessageProps = {
  variant?: 'error'
  children?: string
}

export function FormMessage({ variant = 'error', children }: FormMessageProps) {
  if (!children) return null

  return <p className={`form-message form-message--${variant}`}>{children}</p>
}
