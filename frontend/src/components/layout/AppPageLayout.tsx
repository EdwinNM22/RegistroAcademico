import { type ReactNode } from 'react'
import { AppNavbar } from './AppNavbar'
import { PageBackdrop } from './PageBackdrop'
import './app-page-layout.css'

type AppPageLayoutProps = {
  navbarActions?: ReactNode
  hero?: ReactNode
  children: ReactNode
  backdropGradient?: 'left' | 'subtle' | 'none'
}

export function AppPageLayout({
  navbarActions,
  hero,
  children,
  backdropGradient = 'left',
}: AppPageLayoutProps) {
  return (
    <div className="app-page-layout">
      <AppNavbar actions={navbarActions} />
      <div className="app-page-layout__body">
        <PageBackdrop gradient={backdropGradient} />
        {hero ? <aside className="app-page-layout__hero">{hero}</aside> : null}
        <main className="app-page-layout__main">{children}</main>
      </div>
    </div>
  )
}
