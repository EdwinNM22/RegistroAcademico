import { type HTMLAttributes, type ReactNode } from 'react'
import './card.css'

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'section' | 'article'
  variant?: 'narrow' | 'default'
  children: ReactNode
}

export function Card({
  as = 'div',
  variant = 'default',
  className = '',
  children,
  ...props
}: CardProps) {
  const Tag = as
  const classes = ['card', `card--${variant}`, className].filter(Boolean).join(' ')

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  )
}
