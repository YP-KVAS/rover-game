import React from 'react'
import styles from './Header.module.scss'
import { FC, useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { MENU } from '../../utils/const-variables/menu'
import { NavLink } from 'react-router-dom'

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
        <label>
          <input
            type="checkbox"
            className={styles.toggle_input}
            defaultChecked={themeName === 'dark'}
            onChange={changeTheme}
          />
          <div className={styles.toggle_state}>
            <div className={styles.toggle_control}>
              <div className={styles.toggle_inner}></div>
            </div>
          </div>
        </label>
        <svg className={styles.svg_icon}>
          <use xlinkHref="./images/icons-sprite.svg#moon"></use>
        </svg>
      </div>
    </header>
  )
}
