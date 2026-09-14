import './page-backdrop.css'

type PageBackdropProps = {
  gradient?: 'left' | 'subtle' | 'none'
}

export function PageBackdrop({ gradient = 'left' }: PageBackdropProps) {
  const className =
    gradient === 'none'
      ? 'page-backdrop'
      : `page-backdrop page-backdrop--gradient-${gradient}`

  return <div className={className} aria-hidden="true" />
}
