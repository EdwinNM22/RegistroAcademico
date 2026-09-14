import { type SelectHTMLAttributes } from 'react'
import './form-field.css'

type SelectInputProps = SelectHTMLAttributes<HTMLSelectElement>

export function SelectInput({ className = '', ...props }: SelectInputProps) {
  return <select className={`form-input ${className}`.trim()} {...props} />
}
