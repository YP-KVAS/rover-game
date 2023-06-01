import React from 'react'
import styles from './Header.module.scss'
import { FC } from 'react'
import { MENU } from '../../utils/const-variables/menu'
import { NavLink } from 'react-router-dom'

export const Header: FC = () => {
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
    </header>
  )
}
