import React, { FC, useContext } from 'react'
import styles from './ColorTheme.module.scss'
import { ThemeContext } from '../../contexts/ThemeContext'
import { Button } from '../Button/Button'
import { themes } from '../../utils/const-variables/theme'

export const ColorTheme: FC = () => {
  const { changeTheme } = useContext(ThemeContext)

  return (
    <div>
      <h2 className={styles.title}>Выберите тему</h2>
      <ul className={styles.themes_list}>
        {themes.map(item => (
          <li key={item.name} className={styles.themes_list_item}>
            <Button
              type="primary"
              htmlType="button"
              clickHandler={() => changeTheme(item.name)}
              style={item.buttonStyle}>
              {item.label}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
