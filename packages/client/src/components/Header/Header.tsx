import React from 'react'
import styles from './Header.module.scss'
import { FC, useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { MENU } from '../../utils/const-variables/menu'
import { NavLink } from 'react-router-dom'
import { ToggleCheckbox } from '../ToggleCheckbox/ToggleCheckbox'

export const Header: FC = () => {
  const { themeName, changeTheme } = useContext(ThemeContext)

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.nav_list}>
          {MENU.map(i => (
            <li key={i.label}>
              <NavLink
                to={i.route}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }>
                {i.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.theme}>
        <svg className={styles.svg_icon}>
          <use xlinkHref="./images/icons-sprite.svg#sun"></use>
        </svg>
        <ToggleCheckbox
          defaultChecked={themeName === 'dark'}
          toggleChange={changeTheme}
        />
        <svg className={styles.svg_icon}>
          <use xlinkHref="./images/icons-sprite.svg#moon"></use>
        </svg>
      </div>
    </header>
  )
}
