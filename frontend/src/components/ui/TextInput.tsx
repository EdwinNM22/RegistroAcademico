import { type InputHTMLAttributes } from 'react'
import './form-field.css'

type TextInputProps = InputHTMLAttributes<HTMLInputElement>

export function TextInput({ className = '', ...props }: TextInputProps) {
  return <input className={`form-input ${className}`.trim()} {...props} />
}
