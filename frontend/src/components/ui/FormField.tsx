import { type ReactNode } from 'react'
import './form-field.css'

type FormFieldProps = {
  label: string
  children: ReactNode
}

export function FormField({ label, children }: FormFieldProps) {
  return (
    <label className="form-field">
      {label}
      {children}
    </label>
  )
}

export function FormStack({ children }: { children: ReactNode }) {
  return <div className="form-stack">{children}</div>
}
