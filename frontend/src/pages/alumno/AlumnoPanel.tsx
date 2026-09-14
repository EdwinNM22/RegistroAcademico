import { NavLink } from 'react-router-dom'
import { ALUMNO_MENU_ITEMS } from '../../constants/alumnoMenu'
import { AlumnoCalendarWidget, AlumnoNotasWidget } from './AlumnoPanelWidgets'
import './alumno-panel.css'

export function AlumnoPanel() {
  return (
    <div className="alumno-panel-page">
      <div className="alumno-panel-page__left">
        <section className="alumno-panel" aria-label="Mis herramientas">
          <h2 className="alumno-panel__heading">Mis herramientas</h2>
          <ul className="alumno-panel__grid">
            {ALUMNO_MENU_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `alumno-panel__item${isActive ? ' alumno-panel__item--active' : ''}`
                    }
                  >
                    <span className="alumno-panel__icon-wrap" aria-hidden>
                      <Icon className="alumno-panel__icon" size={22} strokeWidth={1.75} />
                    </span>
                    <span className="alumno-panel__label">{item.label}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </section>

        <AlumnoNotasWidget />
      </div>

      <div className="alumno-panel-page__calendar">
        <AlumnoCalendarWidget />
      </div>
    </div>
  )
}
