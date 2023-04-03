import styles from './App.module.css'
import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Theme, ThemeContext } from './contexts/ThemeContext'
import { LS_THEME, ThemeColors, THEMES } from './utils/const-variables/theme'

function App() {
  const getDefaultTheme = (): Theme => {
    const lsTheme = localStorage.getItem(LS_THEME) as Theme
    const browserDefault = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    return lsTheme || browserDefault
  }

  const [currentThemeName, setCurrentThemeName] = useState<Theme>(
    getDefaultTheme()
  )

  useEffect(() => {
    const theme = THEMES[currentThemeName]
    Object.keys(theme).forEach(key =>
      document.documentElement.style.setProperty(
        `${key.replaceAll('_', '-')}`,
        theme[key as keyof ThemeColors]
      )
    )
    localStorage.setItem(LS_THEME, currentThemeName)
  }, [currentThemeName])

  const changeTheme = () =>
    setCurrentThemeName(prevState => (prevState === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ themeName: currentThemeName, changeTheme }}>
      <div className={styles.app}>
        <RouterProvider router={router} />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
