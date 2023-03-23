import React from 'react'
import { FC, useContext } from 'react'
import { Theme, ThemeContext } from '../../contexts/ThemeContext'
import { THEMES } from '../../utils/const-variables/theme'

// TODO: move theme change to user profile settings
export const Header: FC = () => {
  const { themeName, setThemeName } = useContext(ThemeContext)

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setThemeName(event.target.value as Theme)

  return (
    <div>
      <select name="themeName" value={themeName} onChange={handleThemeChange}>
        {Object.keys(THEMES).map(themeName => (
          <option key={themeName} value={themeName}>
            {themeName} theme
          </option>
        ))}
      </select>
    </div>
  )
}
