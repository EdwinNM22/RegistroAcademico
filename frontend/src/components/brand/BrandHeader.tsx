import { ASSETS } from '../../constants/assets'
import './brand-header.css'

type BrandHeaderProps = {
  sede?: string
}

export function BrandHeader({ sede = 'Santa Ana' }: BrandHeaderProps) {
  return (
    <div className="brand-header">
      <img
        src={ASSETS.logoSeal}
        alt="UNICAES"
        className="brand-header__logo"
      />
      <div className="brand-header__text">
        <p className="brand-header__title">Registro Académico</p>
        <p className="brand-header__institution">
          Universidad Católica de El Salvador
        </p>
        {sede ? <p className="brand-header__sede">Sede: {sede}</p> : null}
      </div>
    </div>
  )
}
